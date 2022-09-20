# flight-proxy-server

Simple Node proxy server with getting the address on each request through callback `getServer`.

## Install

```sh
npm i flight-proxy-server
```

## Usage

```javascript
const proxy = require('flight-proxy-server);

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
```

## Examples

[examples/index.js](./examples/index.js)
