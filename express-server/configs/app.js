const mysql = require("mysql");
const express = require("express");
const app = express();
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const { db } = require("./db.js");
const routes = require("../routes/routes.js");
const secrets = require("./secrets.js");

const create = (cfg) => {
    app.set("env", cfg.env);
    app.set("port", cfg.port);
    app.set("domain", cfg.domain);

    const sessionSettings = {
        cookie: {
            domain: app.get("domain"),
            httpOnly: true,
            maxAge: 2592000000,
        },
        name: "tweSessId",
        store: new MySQLStore({}, db),
        secret: secrets.sessionSecret,
        resave: false,
        saveUninitialized: false,
        rolling: true
    }

    if (app.get("env") == "production") {
        app.set("trust proxy", 1)
        sessionSettings.cookie.secret = true;
    }

    app.use(session(sessionSettings));
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(morgan("common", {
        stream: fs.createWriteStream( cfg.cwd + "logs/api-access.log", { flags: "a" })
    }));

    app.use(routes);

    app.use((req, res) => {
        res.status(404).send("twe api server");
    });
};

const start = () => {
    app.listen(app.get("port"), () => {
        console.log("Express server listening on: " + app.get("domain") + ":" + app.get("port"));
    });
};

module.exports = {
    create,
    start
};