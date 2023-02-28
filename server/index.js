//To do stuff with backend like routing, querying
const express = require('express');
const app = express(); 
const {db} = require('./db'); //To connect to my sql db
const path = require('path'); //For file pathing
const morgan = require('morgan'); //For logging
require('dotenv').config(); //Used to call variables such as DEV, DB credential, PORT no

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
app.use('/item/games', games);
//auth routing
app.use('/login', auth);

//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.resolve(__dirname, 'public' ,'404.html'));
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
});

//END OF MAIN