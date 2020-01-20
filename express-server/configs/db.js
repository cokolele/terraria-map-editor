const mysql = require("mysql");

let db;

const dbInit = (config) => new Promise((resolve, reject) => {
    db = mysql.createConnection(config.db);
    db.connect(e => {
        if (e) {
            console.error("Error connecting to database: ", e);
            reject(e);
        } else {
            console.log("Connected to database as id: " + db.threadId);
            resolve(db);
        }
    });
});

const dbQuery = (queryString, paramArray) => new Promise((resolve, reject) => {
    const sql = mysql.format(queryString, paramArray);

    db.query(sql, (err, results) => {
        if(err) return reject(err);
        return resolve(results);
    });
});

module.exports = {
    dbInit,
    dbQuery
};