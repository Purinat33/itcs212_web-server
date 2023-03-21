const express = require('express');
const routes = express.Router();
const {
    search,
    getGame,
    getCart
} = require('./../controllers/games');
const {checkJWT} = require('./../controllers/token')


//Routes
//GET (Only user can view)
routes.get('/browse', getGame); //Return catalogue
routes.get('/browse/:id', getGame); //Return 1 specific game

//Search
routes.get('/search', search);

//For user cart (We will use authentication middleware later)
routes.get('/cart', checkJWT, getCart)

module.exports = routes;