const server = require("./configs/app.js");
const config = require("./configs/profiles/config.js");

server.create(config);

server.start();