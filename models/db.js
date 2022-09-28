const mysql = require("mysql");
const dbConfig = require("../config/db.config");

var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    port: 3360,
    database: dbConfig.DB,
});

module.exports = connection;