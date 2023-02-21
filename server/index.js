const express = require('express'); //To do stuff with backend like routing, querying
const app = express(); 
const sql = require('mysql2'); //To connect to my sql db
const path = require('path')

const {games} = require('./../routes/games');

//Define port for connection
//Mostly we use 80 and 403(?)
//But for dev purpose we're going hard code of 3000 for now
const port = 3000;

//Connect mysql DB
//const db = sql.createConnection();

//JSON contents
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Assets folder to store images/data/assets
app.use(express.static(path.join(__dirname, 'public')));
//Routing
app.use('/api/games', games);

//Demo for home page (/)
// app.get('/', (req,res)=>{
//     res.status(200).send(`
//         <h1>Hello world</h1>
//     `);
// })

//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.resolve(__dirname, 'public' ,'404.html'));
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
});