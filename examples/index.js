// @ts-check
const proxy = require('../index');

proxy({
  port: 3003,
  getServer: async (req) => {
    console.log(req.url);
    // here check which server to forward the request to
    return {
      url: 'http://localhost:3000',
    };
  },
});
