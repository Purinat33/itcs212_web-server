const express = require('express');
const routes = express.Router();
const {
    getGame
} = require('../controllers/games');


//Routes
//GET (Only user can view)
routes.get('/browse', getGame); //Return catalogue
routes.get('/browse/:id', getGame); //Return 1 specific game

//About

module.exports = routes;