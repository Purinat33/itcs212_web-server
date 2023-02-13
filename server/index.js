const express = require('express'); //To do stuff with backend like routing, querying
const app = express(); 
const sql = require('mysql2'); //To connect to my sql db
const path = require('path')

//Define port for connection
//Mostly we use 80 and 403(?)
//But for dev purpose we're going hard code of 3500 for now
const port = 3000;

//Connect mysql DB
// const db = sql.createConnection();

//Assets folder to store images/data/assets
app.use(express.static(path.join(__dirname, 'public')));

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

});