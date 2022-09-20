/**
 * @type {any}
 */
const _cluster = require('cluster');
/**
 * @type {import('cluster').default}
 */
const cluster = _cluster;
const express = require('express');
const request = require('request');

/**
 * @typedef {{
 *    url: string;
 *    active: boolean;
 *  }} Server
 */

/**
 *
 * @param {{
 *  getServers: () => Server[];
 *  port: number;
 * }} args
 */
function loadBalancer(args) {
  console.log(cluster.isPrimary, 1);
  if (cluster.isPrimary) {
    cluster.fork();
  }
  const { getServers, port } = args;
  const servers = getServers();
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  const handler = (req, res) => {
    req.pipe(request({ url: servers[0].url + req.url })).pipe(res);
  };
  const server = express().get('*', handler).post('*', handler);
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(new Date(), 'Node load balancer listen on port:', port);
  });
}

module.exports = loadBalancer;
