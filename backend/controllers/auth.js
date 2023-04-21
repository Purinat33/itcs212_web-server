/**
 * Bcrypt is a popular library for hashing passwords in Node.js. Salting is a technique used in hashing to add an additional layer of security to passwords.

When a user creates a new password or updates their password, the password is hashed using a hash function, such as bcrypt. The hash function converts the password into an irreversible hash value, which is then stored in the database.

However, if an attacker gains access to the database, they can potentially retrieve the hashed passwords and attempt to crack them by using a brute force attack or a dictionary attack. This is where salting comes in.

Salting involves adding a random string of characters to the password before hashing it. This random string of characters is called a salt. The salt is unique for each password, so even if two users have the same password, their hashed passwords will be different because of the different salts.

By adding a salt to the password, the attacker can't use precomputed tables or rainbow tables to crack the password because they need to recalculate the hash value for each password and salt combination. This makes it much more difficult for attackers to crack hashed passwords.

Bcrypt handles the salt generation and storage automatically, so it's easy to use for developers. By default, bcrypt generates a salt internally and appends it to the hashed password. The salt is then stored as part of the hashed password so that it can be used for password verification later.
 * 
 */

/**
 * //ASYNC AWAIT
//Async-await is a way to handle asynchronous functions in JavaScript, allowing code to be executed in a synchronous manner without blocking the main thread. Async-await works by allowing a function to be marked as "async" and using the "await" keyword to pause the function execution until a Promise is resolved. This allows for cleaner and more readable code that avoids "callback hell" and makes error handling easier.

//PROMISES
//A Promise is a built-in JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises are used to handle asynchronous operations and can be chained together to perform a series of tasks in a specific order. Promises have three states: "pending" (when the Promise is created and not yet settled), "fulfilled" (when the Promise is settled successfully), and "rejected" (when the Promise is settled with an error).
 */

const passport = require('./passport') //importing passport module
const {db} = require('../index'); //importing db object from index.js
const path = require('path'); //importing path module from Node.js
const bcrypt = require('bcrypt'); //importing bcrypt module for password encryption
const jwt = require('jsonwebtoken'); //importing jsonwebtoken module for token generation and authentication


// middleware function for authentication using passport
const authenticate = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin to access the resource
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods to access the resource
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the specified request headers to access the resource
  
  passport.authenticate('local', { session: false }, (err, user, info) => { //using local authentication strategy provided by passport
    if (err || !user) {
      return res.status(401).json({ status: 'error', message: info}); //if authentication fails, return error message
    }
    req.login(user, { session: false }, (err) => { //login user using passport's login function
      if (err) {
        return res.status(401).json({ status: 'error', message: 'An error occurred during login.' }); //if login fails, return error message
      }
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' }); //generate a token with user's id and isAdmin status and sign it using JWT_SECRET key
      res.header('Authorization', `Bearer ${token}`); //add token to Authorization header
      res.header('Access-Control-Expose-Headers', 'Authorization'); //allow Authorization header to be exposed
      return res.json({ status: 'success', message: 'Authentication successful', token }); //return success message with token
    });
  })(req, res, next); //pass request, response, and next function to middleware
};


// handler function for user registration
const createUser = ((req, res, next) => {
  const saltRounds = 10; //number of rounds for bcrypt salt
  const username = req.body.username.trim(); //get username from request body
  const password = req.body.password; //get password from request body

  // check if username already exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err); //if error occurs during database query, log the error
      return res.status(500).json({ message: 'Server error' }); //return server error message
    }

    if (results.length > 0 || username.toLowerCase() === 'admin') { //if username already exists in the database or is 'admin', return error message
      console.log('Username already exists or is invalid');
      return res.status(409).json({ message: 'Username already exists or is invalid' });
    }

    // hash the password with bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => { //hash password using bcrypt
      if (err) {
        console.error(err); //if error occurs during password hashing, log the error
        return res.status(500).json({ message: 'Server error' }); //return server error message
      }

      // insert new user into the database
      db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, false)', [username, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }

        console.log('Registration success');
        res.status(200).json({ message: 'Registration successful' });
      });
    });
  });
});


// const login = (req, res) => {
//   res.status(200).json({ messages: req.flash('error') });
// }

// const register = (req,res)=>{
//     res.status(200).sendFile(path.join(__dirname, '..', '..','frontend', 'public', 'auth', 'register.html'));
// }

module.exports = {authenticate,createUser};
