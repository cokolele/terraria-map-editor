const secrets = require("../secrets.js");

module.exports = {
    port: 3000,
    domain: "terraria-map-editor.eu",
    cwd: "/var/express/", //directory of an api files
    content: "/var/express/content/", //directory for saving user content
    db: {
        host: "localhost",
        user: "root",
        password: secrets.dbRootPass,
        database: "twe",
        port: 3306
    }
};