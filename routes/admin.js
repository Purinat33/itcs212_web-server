const express = require('express');
const route = express.Router();
const path = require('path')
const {
    createUser, deleteUser, createProduct, readProduct, updateProduct, deleteProduct
} = require('./../controllers/admin');

//TODO: Add cookie/JWT checker middleware to each routes

//For generic admin page
route.get('/dashboard', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'admin.html'));
}) 

//For add product
route.get('/addgame', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'addgame.html'));
})

//For add user
route.get('/adduser', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'adduser.html'));
})

route.post('/adduser', createUser);

module.exports = route;