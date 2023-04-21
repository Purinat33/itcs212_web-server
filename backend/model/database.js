const sql = require('mysql2'); // Import the mysql2 library to be able to connect to MySQL database
require('dotenv').config(); // Load environment variables from a .env file

// Create a connection pool to allow multiple connections to the database
const db = sql.createPool({
    host: process.env.DB_HOST, // Retrieve the host information from environment variables
    user: process.env.DB_USR, // Retrieve the database user information from environment variables
    password: process.env.DB_PWD, // Retrieve the database user's password from environment variables
    database: process.env.DB_NAME // Retrieve the database name from environment variables
});

// Connect to the database and retrieve a connection from the connection pool
db.getConnection((err, connection)=>{
  if (err) { // Check if there was an error retrieving the connection
    console.error('Error getting connection from pool:', err); // Log the error to the console
    return; // Exit the function
  }
  console.log('Connection retrieved from pool:', connection.threadId); // Log the thread ID of the connection retrieved
  connection.release(); // Release the connection back to the pool
});

// Listen for a connection event from the database
if(db){
  db.on('connection', (connection)=>{
    console.log(`Connection established on connection ${connection}`); // Log a message when a connection is established
  });
}else{
    console.log('Error'); // Log an error message if the connection could not be established
}

module.exports = {db}; // Export the database connection pool to allow other files to connect to and query the database
