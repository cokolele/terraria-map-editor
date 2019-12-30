const secrets = require("../secrets.js");

module.exports = {
    port: 3000,
    hostname: "www.terraria-map-editor.eu",
    cwd: "/var/server/",
    db: {
        host: "localhost",
        user: "root",
        password: secrets.dbRootPass,
        database: "twe"
    }
};