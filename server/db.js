const sql = require('mysql2');

//Establish connection with MySQL server
//Pool allows createConnection in multiple pool
const db = sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
})

module.export = db;