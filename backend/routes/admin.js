const express = require('express'); //import express library
const route = express.Router(); //create a router object from express module
const path = require('path'); //import path library to handle file paths
const fs = require('fs'); //import fs library to handle file operations
const {
    getAllProducts, //import function to get all products
    getAllUsers, //import function to get all users
    dashboard, //import function for the dashboard page
    createUser, //import function to create a user
    editUser, //import function to edit a user
    deleteUser //import function to delete a user
} = require('./../controllers/admin'); //import functions from the admin controller

const {
    getGame, //import function to get a game
    postGame, //import function to add a new game
    putGame, //import function to update a game
    deleteGame //import function to delete a game
} = require('./../controllers/games') //import functions from the games controller

const multer = require(`multer`); //import multer library to handle file uploads

const {db} = require('../index'); //import database object
const upload = multer(); //create an upload object

//import middleware functions to check JWT token and admin status
const {checkJWT, checkAdmin} = require('./../controllers/token')

route.use(express.json()); //use express middleware to parse JSON data

//TODO: Add cookie/JWT checker middleware to each routes

/**
 * //ASYNC AWAIT
//Async-await is a way to handle asynchronous functions in JavaScript, allowing code to be executed in a synchronous manner without blocking the main thread. Async-await works by allowing a function to be marked as "async" and using the "await" keyword to pause the function execution until a Promise is resolved. This allows for cleaner and more readable code that avoids "callback hell" and makes error handling easier.

//PROMISES
//A Promise is a built-in JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises are used to handle asynchronous operations and can be chained together to perform a series of tasks in a specific order. Promises have three states: "pending" (when the Promise is created and not yet settled), "fulfilled" (when the Promise is settled successfully), and "rejected" (when the Promise is settled with an error).
 */

//Endpoint for getting all users
route.get('/users', checkJWT, checkAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers(); //get all users
    return res.status(200).json(users); //send JSON response with all users
  } catch (error) {
    console.error(error.message); //log error message to console
    next(error); //pass error to error handling middleware
  }
});

//Endpoint for getting all products
route.get('/product', checkJWT, checkAdmin, async (req, res, next) => {
  try {
    const product = await getAllProducts(); //get all products
    console.log(product); //log product to console
    return res.status(200).json(product); //send JSON response with all products
  } catch (error) {
    console.error(error.message); //log error message to console
    next(error); //pass error to error handling middleware
  }
}); 

//Endpoint for getting a specific user by ID
route.get('/users/:id', checkJWT, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params; //get user ID from request parameters
    const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]); //query database for user with given ID
    if (rows.length === 0) { //if user not found
      return res.status(404).json({ message: 'User not found' }); //send 404 response with error message
    }
    const user = rows[0]; //get first user from result set
    return res.status(200).json(user); //send JSON response with user
  } catch (err) {
    console.error(err); //log error to console
    return res.status(500).json({ message: 'Internal server error' }); //send 500 response with error message
  }
});

route.get('/product/:id', checkJWT, checkAdmin, async (req, res) => { 
  //A route for GET request with URL pattern '/product/:id'. checkJWT and checkAdmin are middlewares, 
  //async function is defined to handle the request
  try {
    const { id } = req.params; //Get the value of the id parameter from the URL using destructuring
    const [rows] = await db.promise().query('SELECT * FROM product WHERE id = ?', [id]); //Get product data from the database based on the id
    if (rows.length === 0) { //If product data is not found
      return res.status(404).json({ message: 'Product not found' }); //return 404 status with a message
    }
    const product = rows[0]; //Get the product object from the rows array
    return res.status(200).json(product); //Return the product object with 200 status
  } catch (err) { //If there is an error while fetching data from the database
    console.error(err); //Log the error message to the console
    return res.status(500).json({ message: 'Internal server error' }); //Return 500 status with a message
  }
});

//USER MANAGEMENT
//For add user page
// route.get('/adduser', checkJWT, checkAdmin, getAddUser) //GET request for '/adduser' URL pattern, which invokes getAddUser function after middleware checks.

//For edit user detail page
// route.get('/dashboard/edit/:users', checkJWT, checkAdmin, editUser); //GET request for '/dashboard/edit/:users' URL pattern, which invokes editUser function after middleware checks.

route.put('/dashboard/edit/:id', checkJWT, checkAdmin, editUser); //PUT request for '/dashboard/edit/:id' URL pattern, which invokes editUser function after middleware checks.

route.post('/adduser', checkJWT, checkAdmin, createUser); //POST request for '/adduser' URL pattern, which invokes createUser function after middleware checks.

route.delete('/dashboard/delete/:id', checkJWT, checkAdmin, deleteUser); //DELETE request for '/dashboard/delete/:id' URL pattern, which invokes deleteUser function after middleware checks.

//PRODUCT MANAGEMENT
//For add product
// route.get('/addgame', checkJWT, checkAdmin, getAddGame); //GET request for '/addgame' URL pattern, which invokes getAddGame function after middleware checks.

route.post('/addgame', checkJWT, checkAdmin, postGame); //POST request for '/addgame' URL pattern, which invokes postGame function after middleware checks.
// route.post('/addgame', checkJWT, checkAdmin, upload.none(), postGame); //POST request for '/addgame' URL pattern, which invokes postGame function after middleware checks.

//Edit game
// route.get('/dashboard/game/edit/:id', checkJWT, checkAdmin, putGame); //GET request for '/dashboard/game/edit/:id' URL pattern, which invokes putGame function after middleware checks.

route.put('/dashboard/game/edit/:id', checkJWT, checkAdmin, putGame); //PUT request for '/dashboard/game/edit/:id' URL pattern, which invokes putGame function after middleware checks.

route.delete('/dashboard/game/delete/:id', checkJWT, checkAdmin, deleteGame); //DELETE request for '/dashboard/game/delete/:id' URL pattern, which invokes deleteGame function after middleware checks.

//For edit product page
//Admin have the power to CRUD products while users got R
// route.get()

module.exports = route; //Export the route object