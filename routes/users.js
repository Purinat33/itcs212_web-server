const express = require('express');
const routes = express.Router();
const {
    getGame
} = require('../controllers/games');


//Routes
//GET (Only user can view)
routes.get('/', getGame); //Return catalogue
routes.get('/:id', getGame); //Return 1 specific game

module.exports = routes;