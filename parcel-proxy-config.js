const ParcelProxyServer = require('parcel-proxy-server');

// configure the proxy server
const server = new ParcelProxyServer({
    entryPoint: "./src/index.html",
    proxies: {
        "/api": {
            target: "http://127.0.0.1:3000"
        },
        "/auth": {
            target: "http://127.0.0.1:3000"
        }
    }
});

server.listen(80, () => {});