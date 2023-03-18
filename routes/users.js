const express = require('express');
const routes = express.Router();
const {
    search,
    getGame
} = require('../controllers/games');


//Routes
//GET (Only user can view)
routes.get('/browse', getGame); //Return catalogue
routes.get('/browse/:id', getGame); //Return 1 specific game

//Search
routes.get('/search', search);

module.exports = routes;