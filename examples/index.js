// @ts-check
// eslint-disable-next-line no-unused-vars
const { proxy, Callback, Server } = require('../index');

/**
 * @type {Callback}
 */
const getServer = async (req) => {
  console.log(req.url);
  // ... here check which server to forward the request to
  /**
   * @type {Server}
   */
  const result = {
    url: 'http://localhost:3000',
  };
  return result;
};

proxy({
  port: 3003,
  getServer,
});
