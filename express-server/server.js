const config = require("./configs/profiles/config.js");
const { dbInit } = require("./configs/db.js");
const server = require("./configs/app.js");

async function init() {
    let db;

    try {
        db = await dbInit(config);
    } catch(e) {}

    server.create(config, db);
    server.start();
}

init();