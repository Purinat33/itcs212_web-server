const express = require('express');
const route = express.Router();
const path = require('path')
const {
    dashboard, createUser, editUser, deleteUser, createProduct, readProduct, updateProduct, deleteProduct
} = require('./../controllers/admin');

//TODO: Add cookie/JWT checker middleware to each routes

//For generic admin page
route.get('/dashboard', dashboard); 

//For add product
route.get('/addgame', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'addgame.html'));
})

//For add user page
route.get('/adduser', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'adduser.html'));
})

//For edit user detail page
route.get('/dashboard/edit/:users', editUser);
route.post('/dashboard/edit/:users', editUser); //Same thing but we do the POST request instead
route.post('/adduser', createUser); //Adding user

//Delete is even more broken than POST so we are breaking the CRUD bone
route.post('/dashboard/delete/:id', deleteUser); //The name says it all (the :users is to specify which one to delete);


module.exports = route;