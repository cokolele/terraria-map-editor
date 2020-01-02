const secrets = require("../secrets.js");

module.exports = {
    port: 3000,
    domain: "localhost",
    cwd: "E:/wamp/www/terraria-web-editor/express-server/",
    db: {
        host: "localhost",
        user: "root",
        password: secrets.dbRootPass,
        database: "twe"
    }
};