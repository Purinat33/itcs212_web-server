//For all things admin from add user, delete user, add product, modify product
const {db} = require('./../server/index');
const path = require('path');
const bcrypt = require('bcrypt');


//User section
const createUser = (req,res,next)=>{
    //Post to user DB
    const saltRounds = 10;
    const username = req.body.username.trim();
    const password = req.body.password;
    var isAdmin  = (req.body.role === 'Admin');

    // check if username already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0 || username.toLowerCase() === 'admin') {
      console.log('Username already exists or is invalid');
      return res.status(409).send('Username already exists or is invalid');
    }

    // hash the password with bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }

      // insert new user into the database
      db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', [username, hashedPassword, isAdmin], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        console.log('Registration success');
        res.redirect('/admin/dashboard');
      });
    });
  });
}

const deleteUser = (req,res,next) =>{
    //Remove from user DB
}

//Product sessions
const createProduct = (req,res,next) =>{

}

const readProduct = (req,res,next)=>{

}

const updateProduct = (req,res,next)=>{

}

const deleteProduct = (req,res,next)=>{

}

module.exports = {createUser, deleteUser, createProduct, readProduct, updateProduct, deleteProduct}