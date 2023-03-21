const express = require('express');
const {
    login,
    register,
    authenticate,
    createUser
} = require('./../controllers/auth')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./../controllers/passport');
const jwt = require('jsonwebtoken')
const routes = express.Router();

routes.use(cookieParser());
routes.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}))

routes.get('/login', login);
//Getting the register page
routes.get('/register', register);

//login POST (logging in)
routes.post('/login', passport.authenticate('local', {
  session: false,
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  const token = jwt.sign({ id: req.user.id, isAdmin: req.user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7200000});
  res.status(200).render('success',{ message: 'Authentication successful', token: token });
});

//Register post (creating user)
routes.post('/register', createUser);

module.exports = routes;