//User from DB
const passport = require('./passport')
const {db} = require('../index');
const path = require('path');
const bcrypt = require('bcrypt'); //For encrypting + decrypting in a more secure way than crypto
//Connect to db and query all the users
//The pool is in index.js
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ status: 'error', message: info});
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(401).json({ status: 'error', message: 'An error occurred during login.' });
      }
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.set('Authorization', `Bearer ${token}`);
      return res.json({ status: 'success', message: 'Authentication successful', token });
    });
  })(req, res, next);
};


// registration handler
// API endpoint for registration
const createUser = ((req, res, next) => {
  const saltRounds = 10;
  const username = req.body.username.trim();
  const password = req.body.password;

  // check if username already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0 || username.toLowerCase() === 'admin') {
      console.log('Username already exists or is invalid');
      return res.status(409).json({ message: 'Username already exists or is invalid' });
    }

    // hash the password with bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
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
