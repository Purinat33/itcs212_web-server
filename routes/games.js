const express = require('express');
const routes = express.Router();
const {
    getGame,
    postGame,
    putGame,
    deleteGame
} = require('./../controllers/games');


//Routes
routes.get('/', getGame); //Return catalogue
routes.post('/', postGame);
routes.put('/:id', putGame);
routes.delete('/:id', deleteGame);


module.exports = routes;