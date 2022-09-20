const loadBalancer = require('../index');

// Run four servers via three loadBalancers

const servers1 = [
  { url: 'http://localhost:3000', active: true },
  { url: 'http://localhost:3001', active: false },
];

function getServers1(req) {
  console.log('Server 1', req.url);
  return servers1;
}

// First LB with two servers
loadBalancer({ port: 3003, getServers: getServers1 });

const servers2 = [
  { url: 'http://localhost:3004', active: true },
  { url: 'http://localhost:3005', active: false },
];

function getServers2(req) {
  console.log('Server 2', req.url);
  return servers2;
}

// Second LB with two others server
loadBalancer({ port: 3006, getServers: getServers2 });

const loadBalancers = [
  { url: 'http://localhost:3003', active: true },
  { url: 'http://localhost:3006', active: false },
];

// Third LB with two other LB
function getLoadBalancers(req) {
  console.log('Load balancers load balancer', req.url);
  return loadBalancers;
}

loadBalancer({ port: 3006, getServers: getLoadBalancers });
