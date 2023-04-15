const express = require('express');
const route = express.Router();
const path = require('path');
const fs = require('fs');
const {
    getAllProducts,
    getAllUsers,
    dashboard, createUser, editUser, deleteUser
} = require('./../controllers/admin');

const {
    getGame,
    postGame,
    putGame,
    deleteGame
} = require('./../controllers/games')
const multer = require(`multer`); //Used to insert files (especially images)

const {db} = require('../index');


//TODO: Add cookie/JWT checker middleware to each routes
const {checkJWT, checkAdmin} = require('./../controllers/token')

route.use(express.json())

//For generic admin page
// route.get('/dashboard', checkJWT, checkAdmin, dashboard);
// Backend routing
route.get('/users',checkJWT, checkAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

route.get('/product',checkJWT, checkAdmin, async (req, res, next) => {
  try {
    const product = await getAllProducts();
    console.log(product);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}); 

route.get('/users/:id', checkJWT, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = rows[0];
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//USER MANAGEMENT
//For add user page
// route.get('/adduser', checkJWT, checkAdmin, getAddUser)

//For edit user detail page
// route.get('/dashboard/edit/:users', checkJWT, checkAdmin, editUser); //Getting the user detail page
route.put('/dashboard/edit/:id', checkJWT, checkAdmin, editUser); //Same thing but we do the PUT request instead

route.post('/adduser', checkJWT, checkAdmin, createUser); //Adding user
route.delete('/dashboard/delete/:id', checkJWT, checkAdmin, deleteUser); //The name says it all (the :users is to specify which one to delete);

//PRODUCT MANAGEMENT
//For add product
// route.get('/addgame', checkJWT, checkAdmin, getAddGame);

route.post('/addgame', checkJWT, checkAdmin, postGame);



//Edit game
// route.get('/dashboard/game/edit/:id', checkJWT, checkAdmin, putGame);
route.put('/dashboard/game/edit/:id', checkJWT, checkAdmin, putGame);
route.delete('/dashboard/game/delete/:id', checkJWT, checkAdmin, deleteGame);

//For edit product page
//Admin have the power to CRUD products while users got R
// route.get()

module.exports = route;

