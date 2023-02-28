const express = require('express');
const routes = express.Router();
const {
    login,
    register
} = require('./../controllers/auth')

routes.get('/login', login);
//Getting the register page
routes.get('/register', register);

//Put, for registration
//

module.exports = routes;