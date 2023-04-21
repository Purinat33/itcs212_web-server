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

const {db} = require('../index'); //Import the db object from ../index file
const bcrypt = require('bcrypt'); //Import the bcrypt library for password hashing
const path = require('path'); //Import the path module
const fs = require('fs'); //Import the fs module for file system operations

const getAllUsers = async () => {
  const query = 'SELECT * FROM users'; //Select all users from users table
  const [rows,fields] = await db.promise().query(query); //Execute the query and get the results in rows and fields
  return rows; //Return the rows of users
};

const getAllProducts = async () => {
  const game = 'SELECT * FROM product'; //Select all products from product table
  // console.log(game); //Print the query string to the console
  const [rows,fields] = await db.promise().query(game); //Execute the query and get the results in rows and fields
  console.log(rows); //Print the rows of products to the console
  return rows; //Return the rows of products
};

const dashboard = async (req, res, next) => {
  try {
    const game = 'SELECT * FROM product'; //Select all products from product table
    const product = await db.query(game); //Execute the query and get the results in product

    const query = 'SELECT * FROM users'; //Select all users from users table
    const users = await db.query(query); //Execute the query and get the results in users

    // Send JSON response with user data and product data
    console.log(users, product); //Print the users and products to the console
    res.status(200).json({ users, product }); //Send JSON response with users and products data
  } catch (error) {
    console.error(error.message); //Print the error message to the console
    next(error); //Call the error handler middleware
  }
};

//User section
const createUser = (req,res,next)=>{
    
    //Post to user DB
    const saltRounds = 10; //Define the number of salt rounds for bcrypt hashing
    const username = req.body.username.trim(); //Get the username from the request body and trim leading/trailing whitespaces
    const password = req.body.password; //Get the password from the request body
    var isAdmin  = (req.body.role === 'Admin'); //Check if the role in the request body is admin and store in isAdmin

    // check if username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err); //Print the error to the console
      return res.status(500).send('Server error'); //Send a 500 status response with a message
    }

    if (results.length > 0 || username.toLowerCase() === 'admin') { //Check if the username already exists in the database or if it is 'admin'
      console.log('Username already exists or is invalid'); //Print a message to the console
      return res.status(409).json({message: 'Username already exists or is invalid'}); //Send a 409 status response with a message
    }

    // hash the password with bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => { //Hash the password with bcrypt
      if (err) {
        console.error(err); //Print the error to the console
        return res.status(500).json({message:'Server error'}); //Send a 500 status response with a message
      }

      // insert new user into the database
      db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', [username, hashedPassword, isAdmin], (err, result) => {
        if (err) {
          console.error(err);//Print the error to the console
          return res.status(500).send('Server error'); //Send a 500 status response with a message
        }

        res.status(201).json({message: "User created successfully", token: req.cookies.token});//This line of code sends a JSON response to the client with a status code of 201 (created). It contains an object with two properties: message and token. The message property is a string that indicates that the user has been created successfully. The token property is obtained from the req.cookies object, which contains any cookies sent by the client in the request.
      });
    });
  });
}

const editUser = async (req, res, next) => {
  try {
      const newPassword = req.body.password; // Get the new password from the request body
      const userId = req.params.id; // Get the user ID from the request parameters
      const saltRounds = 10; // Set the number of salt rounds for bcrypt
      const salt = await bcrypt.genSalt(saltRounds); // Generate a salt using bcrypt
      const hashedPassword = await bcrypt.hash(newPassword, salt); // Hash the new password using bcrypt
      const isAdmin = req.body.role === "Admin"; // Get the value of the role radio button from the request body and set isAdmin to true if it is "Admin", false otherwise
      await db
        .promise()
        .query(
          "UPDATE users SET password = ?, isAdmin = ? WHERE id = ?",
          [hashedPassword, isAdmin, userId]
        ); // Update the user's password and isAdmin status in the database
      const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]); // Query the database to get the updated user data
      if (rows && rows.length) { // Check if the query returned any rows
        const user = rows[0]; // Get the first row from the query result
        return res.status(200).json({ message: "User's data successfully updated", user }); // Return a success response with the updated user data
      } else {
        return res.status(404).json({ message: "User not found" }); // Return an error response if no rows were returned
      }
  } catch (error) {
    // Handle errors here
    console.error(error); // Log the error to the console
    res.status(500).json({message: "Internal server error"}); // Return an error response
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id; // Get the user ID from the request parameters

  // Use the user ID to delete the corresponding cart records from the database
  try{
    await db.promise().query('START TRANSACTION'); // Start a database transaction
    try {
      console.log(`Deleting cart records for user ${userId}`);
      await db.promise().query('DELETE FROM cart WHERE uid = ?', [userId]); // Delete cart records for the user from the database
    } catch (error) {
      console.log(error); // Log the error to the console
      await db.promise().query('ROLLBACK'); // Roll back the transaction
      res.status(500).json({message: 'Internal server error'}); // Return an error response
      return;
    }

    // Use the user ID to delete the corresponding user from the database
    try {
      console.log(`Deleting user ${userId}`);
      await db.promise().query('DELETE FROM users WHERE id = ?', [userId]); // Delete the user from the database
      await db.promise().query('COMMIT') // Commit the transaction
      res.status(200).json({message: "Successfully delete user from the database", token: req.cookies.token}); // Return a success response
    } catch (error) {
      console.log(error); // Log the error to the console
      await db.promise().query('ROLLBACK'); // Roll back the transaction
      res.status(500).json({message: 'Internal server error'}); // Return an error response
      return;
    }

  }catch(err){
    console.log(err); // Log the error to the console
    await db.promise().query('ROLLBACK'); // Roll back the transaction
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