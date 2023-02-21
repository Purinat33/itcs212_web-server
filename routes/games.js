const express = require('express');
const routes = express.Router();
const {
    getGame,
    postGame,
    putGame,
    deleteGame
} = require('./../controllers/games');


//Routes

module.exports = routes;