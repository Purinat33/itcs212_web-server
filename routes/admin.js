const express = require('express');
const route = express.Router();
const path = require('path');
const {
    dashboard, createUser, editUser, deleteUser
} = require('./../controllers/admin');

const {
    getGame,
    postGame,
    putGame,
    deleteGame
} = require('./../controllers/games')

//TODO: Add cookie/JWT checker middleware to each routes




//For generic admin page
route.get('/dashboard', dashboard); 

//USER MANAGEMENT
//For add user page
route.get('/adduser', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'adduser.html'));
})

//For edit user detail page
route.get('/dashboard/edit/:users', editUser); //Getting the user detail page
route.put('/dashboard/edit/:users', editUser); //Same thing but we do the PUT request instead

route.post('/adduser', createUser); //Adding user
route.delete('/dashboard/delete/:id', deleteUser); //The name says it all (the :users is to specify which one to delete);

//PRODUCT MANAGEMENT
//For add product
route.get('/addgame', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'admin', 'addgame.html'));
})

//Adding game
route.post('/addgame', postGame);

//


//For edit product page
//Admin have the power to CRUD products while users got R
// route.get()

module.exports = route;