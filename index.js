const express = require('express');
const request = require('request');

const server = express();

/**
 * @typedef {{
 *    url: string;
 *  }} Server
 *
 * @typedef {(req: express.Request) => Promise<Server>} Callback
 * @typedef {(req: express.Request, res: express.Response) => void} Handler
 */

/**
 *
 * @param {{
 *  getServer: Callback;
 *  port: number;
 * }} args
 */
async function proxy(args) {
  const { getServer, port } = args;
  /**
   * @type {Handler}
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
