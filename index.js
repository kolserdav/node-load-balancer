const express = require('express');
const request = require('request');

const server = express();

/**
 * @typedef {{
 *    url: string;
 *    active: boolean;
 *  }} Server
 *
 * @typedef {(req: express.Request, res: express.Response) => void} Handler
 */

/**
 *
 * @param {{
 *  getServers: () => Server[];
 *  port: number;
 * }} args
 */
function loadBalancer(args) {
  const { getServers, port } = args;
  const servers = getServers();
  /**
   * @type {Handler}
   */
  const handler = (req, res) => {
    let url = '';
    for (let i = 0; servers[i]; i++) {
      const serv = servers[i];
      if (serv.active) {
        url = serv.url;
      }
    }
    req.pipe(request({ url: url + req.url })).pipe(res);
  };
  server.all('*', handler);

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(new Date(), 'Node load balancer listen on port:', port);
  });
}

module.exports = loadBalancer;
