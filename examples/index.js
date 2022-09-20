// @ts-check
// eslint-disable-next-line no-unused-vars
const { proxy, ProxyTarget, ProxyCallback } = require('../index');

/**
 * @type {ProxyCallback}
 */
const getServer = async (req) => {
  console.log(req.url);
  // ... here check which server to forward the request to
  /**
   * @type {ProxyTarget}
   */
  const result = {
    url: 'http://localhost:3000',
    headers: {
      test: '1',
    },
  };
  return result;
};

proxy({
  port: 3003,
  getServer,
});
