# @kolserdav/load-balancer

Simple Node runtime script that making it easy to change server infrastructure without disrupting the user experience. This tool was created solely to implement the functionality of switching the active server in order to determine which server is currently active from two servers and the client needs to be redirected to it. The logic for determining the load is on the application side (not on the library side!), The choice of the active server is controlled through callback `getServers`.

## Why

## Install

```sh
npm i @kolserdav/load-balancer
```

## Examples

[examples/index.js](./examples/index.js)  
[examples/more-than-two.js](./examples/more-than-two.js)
