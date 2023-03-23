//User from DB
const {db} = require('../index');
const path = require('path');
const bcrypt = require('bcrypt'); //For encrypting + decrypting in a more secure way than crypto
//Connect to db and query all the users
//The pool is in index.js

// registration handler
const createUser = (req, res, next) => {
  const saltRounds = 10;
  const username = req.body.username.trim();
  const password = req.body.password;

  // check if username already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0 || username.toLowerCase() === 'admin') {
      console.log('Username already exists or is invalid');
      return res.status(409).render('error', {message: 'Username already exists or is invalid'});
    }

    // hash the password with bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }

      // insert new user into the database
      db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, false)', [username, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        console.log('Registration success');
        res.redirect('/');
      });
    });
  });
};

const login = (req, res) => {
  res.status(200).render('login', { messages: req.flash('error') });
}


const register = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', '..','frontend', 'public', 'auth', 'register.html'));
}

module.exports = {login, register, createUser};
