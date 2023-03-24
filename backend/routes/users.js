const express = require('express');
const routes = express.Router();
const {
    search,
    getGame
} = require('./../controllers/games');
const{
    getCart,
    deleteCart,
    addToCart
} = require('./../controllers/cart')
const {checkJWT} = require('./../controllers/token')


//Routes
//GET (Only user can view)
routes.get('/browse', getGame); //Return catalogue
routes.get('/browse/:id', getGame); //Return 1 specific game

//Search
routes.get('/search', search);

//For user cart (We will use authentication middleware later)
routes.get('/cart', checkJWT, getCart)
//User adds to cart
routes.post('/cart/:id', checkJWT, addToCart);

//User delete from cart
routes.delete('/cart/:id', checkJWT, deleteCart);

module.exports = routes;