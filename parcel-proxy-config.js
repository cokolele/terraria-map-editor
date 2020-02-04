const ParcelProxyServer = require('parcel-proxy-server');

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: './src/index.html',
  proxies: {
    '/api': {
      target: 'http://localhost:3000'
    }
  }
});

server.listen(80, () => {});