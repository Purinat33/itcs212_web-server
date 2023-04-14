//For all things admin from add user, delete user, add product, modify product
const {db} = require('../index');
const bcrypt = require('bcrypt');
const path = require('path')
const fs = require('fs');

const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const [rows,fields] = await db.promise().query(query);
  return rows;
};

const getAllProducts = async () => {
  const game = 'SELECT * FROM product';
  // console.log(game);
  const [rows,fields] = await db.promise().query(game);
  console.log(rows);
  return rows;
};


const dashboard = async (req, res, next) => {
  try {
    const game = 'SELECT * FROM product';
    const product = await db.query(game);

    const query = 'SELECT * FROM users';
    const users = await db.query(query);

    // Send JSON response with user data and product data
    console.log(users, product);
    res.status(200).json({ users, product });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

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
      return res.status(409).json({message: 'Username already exists or is invalid'});
    }

    // hash the password with bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({message:'Server error'});
      }

      // insert new user into the database
      db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', [username, hashedPassword, isAdmin], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        res.status(201).json({message: "User created successfully", token: req.cookies.token});
      });
    });
  });
}

const editUser = async (req, res, next) => {
  try {
    if (req.method === "GET") {
      const [rows] = await db
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [req.params.users]);
      if (rows && rows.length) {
        const user = rows[0];
        res.status(200).json({message: "User successfullt retrieved" }); // Pass the user object directly to the EJS template
      } else {
        // User not found, render an error page or redirect
        res.status(404).json({message: "User not found"});
      }
    } else if (req.method === "PUT") {
      const newPassword = req.body.password;
      const userId = req.params.users;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const isAdmin = req.body.role === "Admin"; // Retrieve the value of the role radio button and set isAdmin accordingly
      await db
        .promise()
        .query(
          "UPDATE users SET password = ?, isAdmin = ? WHERE id = ?",
          [hashedPassword, isAdmin, userId]
        );
      res.status(200).json({message: "User's data successfully updated", token: req.cookies.token});
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
};

//In Node.js, if a DELETE query is executed successfully without any error, the result parameter of the callback function in connection.query() method will contain a affectedRows property that indicates the number of rows deleted. If affectedRows is greater than zero, it means the DELETE query was executed successfully and the specified rows were deleted from the database.
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  // Use the user ID to delete the corresponding cart records from the database
  try{
    await db.promise().query('START TRANSACTION');
    try {
      console.log(`Deleting cart records for user ${userId}`);
      await db.promise().query('DELETE FROM cart WHERE uid = ?', [userId]);
    } catch (error) {
      console.log(error);
      await db.promise().query('ROLLBACK');
      res.status(500).json({message: 'Internal server error'});
      return;
    }

    // Use the user ID to delete the corresponding user from the database
    try {
      console.log(`Deleting user ${userId}`);
      await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);
      await db.promise().query('COMMIT')
      res.status(200).json({message: "Successfully delete user from the database", token: req.cookies.token});
    } catch (error) {
      console.log(error);
      await db.promise().query('ROLLBACK');
      res.status(500).json({message: 'Internal server error'});
      return;
    }

  }catch(err){
    console.log(err);
    await db.promise().query('ROLLBACK');
    res.status(500).json({message: 'Internal server error'});
    return;
  }
};


// const getAddUser = (req,res,next)=>{
//   res.status(200).sendFile(path.join(__dirname, '..', '..','frontend', 'public', 'admin', 'adduser.html'));
// }

// const getAddGame = (req,res,next) =>{
//   res.status(200).sendFile(path.join(__dirname, '..', '..','frontend', 'public', 'admin', 'addgame.html'));
// }

module.exports = {getAllUsers,getAllProducts,dashboard, createUser, editUser, deleteUser}