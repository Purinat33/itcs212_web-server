// Importing the necessary modules
const express = require('express'); // Importing Express module
const { authenticate, createUser } = require('./../controllers/auth'); // Importing the authenticate and createUser controllers from the auth module
const session = require('express-session'); // Importing the express-session module
const cookieParser = require('cookie-parser'); // Importing the cookie-parser module
const passport = require('./../controllers/passport'); // Importing the passport module
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken module

const routes = express.Router(); // Creating a new instance of an Express Router

routes.use(cookieParser()); // Adding cookie-parser middleware
routes.use(session({ // Adding session middleware
    secret: process.env.JWT_SECRET, // Secret key used to sign the session ID cookie
    resave: false, // Don't save the session if unmodified
    saveUninitialized: false // Don't create session until something stored
}))

// These routes are commented out, probably because they are not being used
// routes.get('/login', login);
// routes.get('/register', register);
// routes.post('/login', passport.authenticate('local', {
//   session: false,
//   failureRedirect: '/auth/login',
//   failureFlash: true
// }), (req, res) => {
//   const token = jwt.sign({ id: req.user.id, isAdmin: req.user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h'});
//   res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 7200000});
//   res.status(200).json({ message: 'Authentication successful', token: token });
// });

routes.post('/login', authenticate); // Adding a POST route for user authentication
routes.post('/register', createUser); // Adding a POST route for user registration

module.exports = routes; // Exporting the routes object
