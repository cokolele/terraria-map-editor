const mysql = require("mysql");
const express = require("express");
const app = express();
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const secrets = require("./secrets.js");

const create = (cfg) => {
    app.set("env", cfg.env);
    app.set("port", cfg.port);
    app.set("hostname", cfg.hostname);

    const connection = mysql.createConnection(cfg.db);
    connection.connect(e => {
        if (e)
            console.error("Error connecting to database: " + e.stack);
        else
            console.log("Database connected as id: " + connection.threadId);
    });

    const sessionSettings = {
        cookie: {
            domain: app.get("hostname"),
            maxAge: 15552000000, //6 months
        },
        store: new MySQLStore({}, connection),
        secret: secrets.sessionSecret,
        resave: false,
        saveUninitialized: false
    }

    if (app.get("env") == "production") {
        app.set("trust proxy", 1)
        sessionSettings.cookie.secret = true;
    }

    app.use(session(sessionSettings));
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(bodyParser.json());

    app.use(morgan("common", {
        stream: fs.createWriteStream( cfg.cwd + "logs/api-access.log", { flags: "a" })
    }));
};

const start = () => {
    app.listen(app.get("port"), () => {
        console.log("Express server listening on: " + app.get("hostname") + ":" + app.get("port"));
    });
};

module.exports = {
    create,
    start
};