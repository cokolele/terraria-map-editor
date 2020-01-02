const mysql = require("mysql");
const config = require("./profiles/config.js");

const db = mysql.createConnection(config.db);
db.connect(e => {
    if (e)
        console.error("Error connecting to database: " + e.stack);
    else
        console.log("Database connected as id: " + db.threadId);
});

const dbQuery = (queryString, paramArray) => new Promise((resolve, reject) => {
    const sql = mysql.format(queryString, paramArray);

    db.query(sql, (err, results) => {
        if(err) return reject(err);
        return resolve(results);
    });
});

module.exports = {
    db,
    dbQuery
};