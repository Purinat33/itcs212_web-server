//To do stuff with backend like routing, querying
const express = require('express');
const app = express(); 
const sql = require('mysql2'); //To connect to my sql db
const path = require('path'); //For file pathing
const morgan = require('morgan'); //For logging
require('dotenv').config(); //Used to call variables such as DEV, DB credential, PORT no
const bcrypt = require('bcrypt'); //For hashing/salting

//Establish connection with MySQL server
//Pool allows createConnection in multiple pool
const db = sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
})

    //DB on connect
db.on('connection', (connection)=>{
    console.log('Connection established');
})

//Connect to the DB
db.getConnection((err, connection)=>{
if (err) {
    console.error('Error getting connection from pool:', err);
    return;
}
console.log('Connection retrieved from pool:', connection.threadId);
})

module.exports = {db}; //Exporting db pool to allow other files to join and query DB

//Add an admin everytime the server starts (if there is already an admin then we delete it)
const adminPassword = process.env.ADMIN_PASSWORD;

//Encrypting the password before we insert it into the DB
bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  db.query('DELETE FROM users WHERE username = ?', ['admin'], (err, result) => {
    if (err) {
      console.error('Error deleting admin user:', err);
      return;
    }
    console.log('Deleted existing admin user');
    
    const user = {
      username: 'admin',
      password: hashedPassword,
      isAdmin: true,
    };

    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        console.error('Error creating admin user:', err);
        return;
      }
      console.log('Added new admin user');
    });
  });
});


//Games route
const games = require('./../routes/games');
//AUTH route
const auth = require('./../routes/auth');

//Define port for connection
//If we are using DEV variable then we use port 3000
//else we use port 8080
//The variable is declared inside .env file, which are not on VCS
const port = process.env.DEV === 'true' ? 3000:8080; //All the value inside .env are strings

//JSON stuff
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Assets folder to store images/data/assets
app.use(express.static(path.join(__dirname, 'public')));

//logging
app.use(morgan('tiny'))

//Routing
//Game routings
app.use('/item/games', games); //Relative to this file location (server/item/games)
//auth routing
app.use('/auth', auth);
//Make the HTML served by the server instead of static HTML
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    res.setHeader('Content-Type', 'text/html');
  }
  next();
});

app.get('/', (req,res)=>{
    //Specifically for index.html
    //index.html will already be opened when we go localhost:PORT
    //but we don't want the .html extension now do we?
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'index.html'));
}); //We dont really need to use this (since express.static serve index.html by default anyway)

//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'public' ,'404.html'));
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
});

//END OF MAIN