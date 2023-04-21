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

const {db} = require('./../index'); // Import the 'db' object from the './../index' file using destructuring assignment syntax

const session = require('express-session') // Import the 'express-session' module to manage user sessions
const cookieParser = require('cookie-parser') // Import the 'cookie-parser' module to parse cookies from the HTTP request
const passport = require('./../controllers/passport'); // Import the 'passport' module from the './../controllers/passport' file
const jwt = require('jsonwebtoken') // Import the 'jsonwebtoken' module to manage JSON web tokens (JWTs)
const {checkJWT} = require('./../controllers/token') // Import the 'checkJWT' function from the './../controllers/token' file using destructuring assignment syntax
require('dotenv').config(); // Load the environment variables from the '.env' file into the process.env object


// Define an asynchronous function named "getCart" that takes in request, response, and next parameters
const getCart = async (req, res, next) => {
  
  // Destructure the "uid" property from the "req.query" object
  const {uid} = req.query;
  
  // Perform a SELECT operation on "cart" and "product" tables and fetch data for "id", "name", "publisher", "price", "quantity" columns where the "uid" matches with the passed "uid"
  const items = await db.promise().query(`
    SELECT
      product.id,
      product.name,
      product.publisher,
      product.price,
      cart.quantity
    FROM 
      cart
      INNER JOIN product ON cart.pid = product.id
    WHERE
      cart.uid = ?
  `, [uid]);

  // Calculate the total sum by using reduce function on the fetched "items" array
  const totalSum = items[0].reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  // Send response with status code 200 and JSON object containing fetched cart items, totalSum, and user info from the request object
  res.status(200).json({ cartItems: items[0] , totalSum, user: req.user});
};

// Define an asynchronous function named "putCart" that takes in request, response, and next parameters
const putCart = async (req,res,next)=>{
    
    // Destructure the "id" property from the "req.params" object and "quantity" property from the "req.body" object
    const pid = req.params.id;
    const newQ = req.body.quantity;
    
    // Destructure the "uid" property from the "req.query" object
    const {uid} = req.query;

    try {
        // Start a transaction
        await db.promise().query('START TRANSACTION');
        
        try {
            // Check if the new quantity is less than or equal to zero
            if(newQ <= 0){
                // Delete the row from the "cart" table where the "uid" and "pid" match with the passed "uid" and "pid" respectively
                await db.promise().query('DELETE FROM CART WHERE uid = ? AND pid = ?', [uid, pid]);
                // Commit the transaction
                await db.promise().query('COMMIT');    
                // Send response with status code 200 and a JSON object containing a message "Deleted"
                return res.status(200).json({message: "Deleted"}); 
            }   
            else{
                // Update the quantity in the "cart" table where the "uid" and "pid" match with the passed "uid" and "pid" respectively
                await db.promise().query('UPDATE cart SET quantity = ? WHERE uid = ? AND pid = ?', [newQ, uid, pid]);
                // Commit the transaction
                await db.promise().query('COMMIT');    
                // Send response with status code 200 and a JSON object containing a message "Updated"
                return res.status(200).json({message: "Updated"}); 
            }   
        } catch (error) {
            console.log(error);
            // Rollback the transaction in case of error
            await db.promise().query('ROLLBACK');
            // Send response with status code 500 and a JSON object containing an error message
            res.status(500).json({message: "Internal server error"});
        }
    } catch (error) {
        console.log(error);
        // Rollback the transaction in case of error
        await db.promise().query('ROLLBACK');
        res.status(500).json({message: "Internal server error"});

    }
}


// For delete from cart actions
const deleteCart = async (req, res, next) => {
  // Validate pid
  const pid = req.params.id; // Get the product ID from the request parameters

  if (!pid) { // If product ID is missing, send 400 status and error message
    res.status(400).json({ message: "Invalid product ID" });
    return;
  }

  // Delete from cart
  try {
    await db.promise().query('START TRANSACTION'); // Start a transaction
    try {
      await db.promise().query('DELETE cart FROM cart INNER JOIN product ON cart.pid = product.id WHERE cart.pid = ?', [pid]); // Delete the product from the cart by joining the 'cart' and 'product' tables and using the product ID
      await db.promise().query('COMMIT'); // Commit the transaction
      res.status(200).json({ message: "Deleted successfully" }); // Send a success message
    } catch (err) { // If there is an error, log it and rollback the transaction
      console.log(err);
      await db.promise().query('ROLLBACK');
      res.status(500).json({ message: "Internal server error" }); // Send a server error message
    }
  } catch (error) { // If there is an error, log it and rollback the transaction
    await db.promise().query('ROLLBACK');
    res.status(500).json({ message: "Internal server error" }); // Send a server error message
  }
};

const addToCart = async (req, res, next) => {
  const { quantity } = req.body; // Get the product quantity from the request body
  // const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  // const userID = decoded.id;
  const { uid } = req.query; // Get the user ID from the query parameters

  try {
    await db.promise().query('START TRANSACTION'); // Start a transaction
    try {
      await db.promise().query('INSERT INTO cart (uid, pid, quantity) VALUES (?, ?, ?)', [uid, req.params.id, quantity]); // Add the product to the cart by inserting the user ID, product ID, and quantity
      await db.promise().query('COMMIT'); // Commit the transaction
      res.status(200).json({ message: "Product added", token: req.cookies.token }); // Send a success message and the token
    } catch (error) { // If there is an error, log it and rollback the transaction
      console.log(error);
      await db.promise().query('ROLLBACK');
      res.status(500).json({ message: "Internal server error" }); // Send a server error message
    }
  } catch (err) { // If there is an error, log it and rollback the transaction
    console.log(err);
    await db.promise().query('ROLLBACK');
    res.status(500).json({ message: "Internal server error" }); // Send a server error message
  }
};

module.exports = {getCart, putCart, deleteCart, addToCart};