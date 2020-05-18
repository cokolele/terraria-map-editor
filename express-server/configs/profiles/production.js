const secrets = require("../secrets.js");

module.exports = {
    port: 3000,
    domain: "terraria-map-editor.eu",
    cwd: "/var/express2/", //directory of an api files
    content: "/var/express2/content/", //directory for saving user content
    db: {
        host: "localhost",
        user: "root",
        password: secrets.dbRootPassProd,
        database: "twe",
        port: 3306
    }
};