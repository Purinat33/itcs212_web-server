const express = require('express');
const route = express.Router();
const path = require('path')
//The EJS file for the USER
const {db} = require('./../server/index');
const {
    createUser, deleteUser, createProduct, readProduct, updateProduct, deleteProduct
} = require('./../controllers/admin');

//TODO: Add cookie/JWT checker middleware to each routes

//For generic admin page
route.get('/dashboard', (req,res)=>{
    //res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'admin.html'));
    const query = 'SELECT * FROM users';
    db.query(query, function(error, results) {
    if (error) throw error;
    const users = results;
    // Render admin dashboard page with user data
    res.render('user.ejs', { users: users });
  });
}) 

//For add product
route.get('/addgame', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'addgame.html'));
})

//For add user page
route.get('/adduser', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'adduser.html'));
})

route.post('/adduser', createUser); //Adding user
route.delete('/dashboard/:ID', deleteUser); //The name says it all (the :ID is to specify which one to delete);


module.exports = route;