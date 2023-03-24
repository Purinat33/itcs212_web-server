const sql = require('mysql2'); //To connect to my sql db
require('dotenv').config(); //Used to call variables such as DEV, DB credential, PORT no

//Establish connection with MySQL server
//Pool allows createConnection in multiple pool
const db = sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

//Connect to the DB
db.getConnection((err, connection)=>{
  if (err) {
    console.error('Error getting connection from pool:', err);
    return;
  }
  console.log('Connection retrieved from pool:', connection.threadId);
  connection.release();
});

//DB on connect
if(db){
  db.on('connection', (connection)=>{
    console.log(`Connection established on connection ${connection}`);
  });
}else{
    console.log('Error');
}

module.exports = {db}; //Exporting db pool to allow other files to join and query DB
