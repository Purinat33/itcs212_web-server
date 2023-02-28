const express = require('express');
const routes = express.Router();
const {
    getGame,
    postGame,
    putGame,
    deleteGame
} = require('./../controllers/games');


//Routes
//GET
routes.get('/', getGame); //Return catalogue
routes.get('/:id', getGame); //Return 1 specific game

//POST
routes.post('/', postGame); //Create new catalogue

//PUT
routes.put('/:id', putGame); //Add a new game

//Delete
routes.delete('/:id', deleteGame); //Delete a game


module.exports = routes;