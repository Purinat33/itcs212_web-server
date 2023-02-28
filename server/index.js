//To do stuff with backend like routing, querying
const express = require('express');
const app = express(); 
const sql = require('mysql2'); //To connect to my sql db
const path = require('path'); //For file pathing
const morgan = require('morgan'); //For logging
require('dotenv').config(); //Used to call variables such as DEV, DB credential, PORT no

//Establish connection with MySQL server
//Pool allows createConnection in multiple pool
const db = sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
})

module.exports = {db}; //Exporting db pool to allow other files to join and query DB

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

//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.resolve(__dirname, 'public' ,'404.html'));
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);

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
});

//END OF MAIN