# flight-proxy-server

Simple Node proxy server with getting the address on each request through callback `getServer`.

## Install

```sh
npm i flight-proxy-server
```

## Usage

```javascript
const { proxy } = require('../index');

const getServer = async (req) => {
  console.log(req.url);
  // ... here check which server to forward the request to
  const result = {
    url: 'http://localhost:3000',
  };
  return result;
};

proxy({
  port: 3003,
  getServer,
});
```

## Examples

[examples/index.js](./examples/index.js)
