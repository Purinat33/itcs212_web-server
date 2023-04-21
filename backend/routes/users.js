//Require Express library
const express = require('express');

//Create a new Router object
const routes = express.Router();

//Require controllers for games and cart
const {
    search,
    getGame
} = require('./../controllers/games');
const{
    getCart,
    putCart,
    deleteCart,
    addToCart
} = require('./../controllers/cart')

//Require the checkJWT function from the token controller
const {checkJWT} = require('./../controllers/token')

//Define routes

//GET routes for viewing catalogue and specific game
routes.get('/browse', getGame); //Return catalogue
routes.get('/browse/:id', getGame); //Return 1 specific game

//Search route
routes.get('/search', search);

//User cart routes

//GET route for viewing cart with authentication middleware checkJWT
routes.get('/cart', checkJWT, getCart)

//POST route for adding a game to cart with authentication middleware checkJWT
routes.post('/cart/:id', checkJWT, addToCart);

//PUT route for updating the quantity of a game in cart with authentication middleware checkJWT
routes.put('/cart/update/:id', checkJWT, putCart);

//DELETE route for deleting a game from cart with authentication middleware checkJWT
routes.delete('/cart/delete/:id', checkJWT, deleteCart);

//Export the router object
module.exports = routes;

/**
 * The above code is an implementation of routes in an Express.js web application. It sets up routes for handling user requests related to browsing games, searching, and managing the user's cart. It also uses a middleware function called checkJWT to ensure that the user is authenticated before they can access the cart.

The code requires the express library and sets up a new Router object using it. It also requires controller functions for games and cart from separate files. It further requires the checkJWT function from the token controller.

The routes defined in the code include GET routes for viewing catalogue and a specific game, a GET route for viewing the user's cart, and POST, PUT, and DELETE routes for adding, updating, and deleting a game from the user's cart, respectively. Each of these routes includes an authentication middleware function checkJWT. Finally, the router object is exported to be used in the main application file.
 */