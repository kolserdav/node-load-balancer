const loadBalancer = require('../index');

const servers = [
  { url: 'http://localhost:3000', active: true },
  { url: 'http://localhost:3002', active: false },
];

function getServers() {
  return servers;
}

loadBalancer({ port: 3003, getServers });
