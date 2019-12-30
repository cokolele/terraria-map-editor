const secrets = require("../secrets.js");

module.exports = {
    port: 3000,
    hostname: "localhost",
    cwd: "E:/wamp/www/terraria-web-editor/server/",
    db: {
        host: "localhost",
        user: "root",
        password: secrets.dbRootPass,
        database: "twe"
    }
};