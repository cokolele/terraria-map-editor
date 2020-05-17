const secrets = require("../secrets.js");

module.exports = {
    port: 3000,
    domain: "localhost",
    cwd: "E:/wamp/www/terraria-map-editor/express-server/", //directory of an api files
    content: "E:/wamp/www/terraria-map-editor/express-server/content/", //directory for saving user content
    db: {
        host: "localhost",
        user: "root",
        password: secrets.dbRootPass,
        database: "twe",
        port: 3306
    }
};