//User from DB
const {db} = require('./../server/index');
const path = require('path');
const fs = require('fs')
const { dirname } = require('path');
const crypto = require('crypto'); //For encrypting + decrypting password to/from the DB
//Connect to db and query all the users
//The pool is in index.js

//Middleware to be used with the 
const authenticate = (req,res,next) =>{
    
    const username = req.body.username;
    const password = req.body.password;

    // get user with the matching username from the database
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      console.log('Invalid login or password');
      return res.status(401).send('Invalid username or password');
    }

    const user = results[0];

    // hash the password provided by the user
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    // compare the hashed password with the one stored in the database
    if (hashedPassword !== user.password) {
      console.log('Invalid login');  
      return res.status(401).send('Invalid username or password');
    }

    // authentication succeeded, store user in session
    console.log('Login success');
    next();
  });
}

const login = (req,res) =>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'auth', 'login.html'));
}

const register = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'auth', 'register.html'));
}

module.exports = {authenticate, login, register}
