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

server.bundler.on('buildEnd', () => {
  console.log('Build completed!');
});

server.listen(80, () => {
  console.log('Parcel proxy server has started');
});