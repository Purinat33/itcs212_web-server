const express = require('express');
const routes = express.Router();
const {
    login,
    register,
    authenticate,
    createUser
} = require('./../controllers/auth')

routes.get('/login', login);
//Getting the register page
routes.get('/register', register);

//login POST (logging in)
routes.post('/login', authenticate)
//Register post (creating user)
routes.post('/register', createUser);

module.exports = routes;