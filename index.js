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
 * @type {Server[]}
 */
let servers = [];

/**
 *
 * @param {{
 *  getServers: (headers?: express.Request) => Promise<Server[]>;
 *  port: number;
 * }} args
 */
async function loadBalancer(args) {
  const { getServers, port } = args;
  servers = await getServers();
  if (servers.length !== 2) {
    // eslint-disable-next-line no-console
    console.warn(
      new Date(),
      'Servers length is not 2, with a different value, unexpected operation is possible'
    );
  }
  /**
   * @type {Handler}
   */
  const handler = async (req, res) => {
    let url = '';
    servers = await getServers(req);
    for (let i = 0; servers[i]; i++) {
      const serv = servers[i];
      if (serv.active) {
        url = serv.url;
      }
    }
    if (url === '') {
      const message = 'Load balancer can not get url';
      // eslint-disable-next-line no-console
      console.warn(new Date(), message, servers);
      res.status(500).json({
        message,
      });
      return;
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
