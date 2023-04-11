//Index.js for front-end module
const express = require('express')
const route = express.Router();
const app = express()
const ejs = require('ejs')
const path = require('path')

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.listen(4000, ()=>{
    console.log('Frontend is listening on port 4000');
})