const loadBalancer = require('../index');

const servers = [
  { url: 'http://localhost:3000', active: true },
  { url: 'http://localhost:3001', active: false },
];

function getServers(req) {
  console.log(req.url);
  return servers;
}

loadBalancer({ port: 3003, getServers });
