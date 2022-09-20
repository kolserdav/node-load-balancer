const express = require('express');
const request = require('request');

const server = express();

/**
 * @typedef {{
 *    url: string;
 *  }} ProxyTarget
 *
 * @typedef {(req: express.Request) => Promise<ProxyTarget>} ProxyCallback
 */

/**
 *
 * @param {{
 *  getServer: ProxyCallback;
 *  port: number;
 * }} args
 */
async function proxy(args) {
  const { getServer, port } = args;
  /**
   * @type {(req: express.Request, res: express.Response) => Promise<void>}
   */
  const handler = async (req, res) => {
    const { url } = await getServer(req);
    req.pipe(request({ url: url + req.url })).pipe(res);
  };
  server.all('*', handler);

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(new Date(), 'Node proxy server listen on port:', port);
  });
}

module.exports = { proxy };
