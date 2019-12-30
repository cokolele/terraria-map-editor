var mysql = require('mysql');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var MySQLStore = require('express-mysql-session')(session);

const secretConfig = require("../secret-config.js");
const config = require("../config.js");
const env = app.get("env");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : secretConfig.dbRootPass,
    database : 'twe'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

var sessionStore = new MySQLStore({}, connection);

const sessionSettings = {
    cookie: {
        domain: env == "production" ? config.domain : "localhost",
        maxAge: 15552000000, //6 months
    },
    store: sessionStore,
    secret: secretConfig.sessionSecret,
    resave: false,
    saveUninitialized: false
}

console.log(app.get("env") + " api start");
if (env == "production") {
    app.set('trust proxy', 1)
    sessionSettings.cookie.secret = true;
}

app.use(session(sessionSettings));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.get('/api', function(req, res) {
    console.log("api get");
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        res.send('Please <a href="/login">login</a> to view this page');
    }
    res.end();
});

app.post('/api/auth', function(req, res) {
    console.log("auth get");
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password);
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/api');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password');
        res.end();
    }
});

app.listen(3000);