const express = require('express');
const routes = express.Router();
const {
    login,
    register,
    authenticate,
    createUser,
    redirectHome
} = require('./../controllers/auth')

routes.get('/login', login);
//Getting the register page
routes.get('/register', register);

//login POST (logging in)
routes.post('/login', authenticate, login, (req,res)=>{
    console.log(res);
    res.redirect('/');
});
//Register post (creating user)
routes.post('/register', createUser,redirectHome);

module.exports = routes;