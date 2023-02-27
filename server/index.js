//To do stuff with backend like routing, querying
const express = require('express');
const app = express(); 
const sql = require('mysql2'); //To connect to my sql db
const path = require('path'); //For file pathing
const morgan = require('morgan'); //For logging

//Games route
const games = require('./../routes/games');
//AUTH route


//Define port for connection
//Mostly we use 80 and 403(?) for production
//But for dev purpose we're going hard code of 3000 for now
const port = 3000;

//Connect mysql DB
//const db = sql.createConnection();

//JSON stuff
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Assets folder to store images/data/assets
app.use(express.static(path.join(__dirname, 'public')));

//logging
app.use(morgan('tiny'))

//Routing
//Game routings
app.use('/api/games', games);
//auth routing

//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.resolve(__dirname, 'public' ,'404.html'));
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
});

//END OF MAIN