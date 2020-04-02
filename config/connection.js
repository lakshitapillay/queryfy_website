const mysql = require('mysql');

//mysql connection
module.exports = {
    con: mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "test"
    })
}