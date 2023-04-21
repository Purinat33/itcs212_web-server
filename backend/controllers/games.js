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

//GAME from DB
const {db} = require('../index'); //Import the 'db' object from the index.js file in the parent directory.
const path = require('path') //Import the 'path' module from Node.js to work with file paths.
const fs = require('fs'); //Import the 'fs' module from Node.js to work with file systems.
const multer = require('multer') //Import the 'multer' middleware to handle file uploads.

//Define an asynchronous function named 'search' which takes two parameters 'req' and 'res' representing the request and response objects, respectively.
const search = async (req, res) => {

    //Execute a SQL query to retrieve the necessary data from the 'product' table using the 'db' object and store the resulting rows in the 'rows' variable.
    const [rows] = await db.promise().query(`
      SELECT id, name, price, description, publisher, img,
        IF(singleplayer, 'Singleplayer', NULL) AS singleplayer,
        IF(multiplayer, 'Multiplayer', NULL) AS multiplayer,
        IF(open_world, 'Open World', NULL) AS open_world,
        IF(sandbox, 'Sandbox', NULL) AS sandbox,
        IF(simulator, 'Simulator', NULL) AS simulator,
        IF(team_based, 'Team-based', NULL) AS team_based,
        IF(fps, 'FPS', NULL) AS fps,
        IF(horror, 'Horror', NULL) AS horror,
        IF(puzzle, 'Puzzle', NULL) AS puzzle,
        IF(other, 'Other', NULL) AS other
      FROM product
    `);

    //Process the retrieved rows to create an array of product objects with only the necessary fields.
    const products = rows.map(row => {
        const { id, name, price, description, publisher, img, ...genres } = row;
        const filteredGenres = Object.entries(genres)
            .filter(([key, value]) => value !== null)
            .map(([key]) => key);
        return {
            id,
            name,
            price,
            description,
            publisher,
            img,
            genres: filteredGenres
        };
    });

    //Return a JSON response with the status code of 200 and the products array.
    return res.status(200).json({ product: products });
    
}


// Define an asynchronous function named 'getGame' that accepts two parameters, req and res, which represent the request and response objects respectively
const getGame = async (req, res) => {

  // Retrieve the value of 'id' from the 'params' object contained within the request object
  const { id } = req.params;

  // Check if an ID is not provided, if so, select all games from the database
  if (!id) {
    // Execute an SQL query using the promise-based database connection and return the result to 'rows'
    const [rows] = await db.promise().query(`
      SELECT id, name, price, description, publisher,
        IF(singleplayer, 'Singleplayer', NULL) AS singleplayer,
        IF(multiplayer, 'Multiplayer', NULL) AS multiplayer,
        IF(open_world, 'Open World', NULL) AS open_world,
        IF(sandbox, 'Sandbox', NULL) AS sandbox,
        IF(simulator, 'Simulator', NULL) AS simulator,
        IF(team_based, 'Team-based', NULL) AS team_based,
        IF(fps, 'FPS', NULL) AS fps,
        IF(horror, 'Horror', NULL) AS horror,
        IF(puzzle, 'Puzzle', NULL) AS puzzle,
        IF(other, 'Other', NULL) AS other
      FROM product
    `);

    // Extract the relevant fields from each row returned from the query and return it as a product object 
    const products = rows.map(row => {
        const { id, name, price, description, publisher, ...genres } = row;
        const filteredGenres = Object.entries(genres)
            .filter(([key, value]) => value !== null)
            .map(([key]) => key);
        return {
            id,
            name,
            price,
            description,
            publisher,
            genres: filteredGenres
        };
    });

    // Send a JSON response containing the array of products returned from the query
    return res.status(200).json(products);
  } else {
    // If an ID is provided, execute an SQL query with the specified ID
    const [rows] = await db.promise().query(`
      SELECT id, name, price, description, publisher,
        IF(singleplayer, 'Singleplayer', NULL) AS singleplayer,
        IF(multiplayer, 'Multiplayer', NULL) AS multiplayer,
        IF(open_world, 'Open World', NULL) AS open_world,
        IF(sandbox, 'Sandbox', NULL) AS sandbox,
        IF(simulator, 'Simulator', NULL) AS simulator,
        IF(team_based, 'Team-based', NULL) AS team_based,
        IF(fps, 'FPS', NULL) AS fps,
        IF(horror, 'Horror', NULL) AS horror,
        IF(puzzle, 'Puzzle', NULL) AS puzzle,
        IF(other, 'Other', NULL) AS other
      FROM product
      WHERE id = ?
    `, [id]);

    // Check if the query returns no rows. If so, send a 404 error response
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Extract the relevant fields from the returned row and return it as a product object
    const { name, price, description, publisher, ...genres } = rows[0]; 
    //Extracting properties name, price, description, publisher, and rest of the properties as genres from the first object in rows array

    const filteredGenres = Object.entries(genres) //Convert the object properties and values to an array of arrays with [key, value] pairs using Object.entries
      .filter(([key, value]) => value !== null && key !== 'id') //Filtering out properties with null value and property with key 'id'
      .map(([key]) => key); //Extracting only the keys from the remaining arrays

    const product = {
      id,
      name,
      price,
      description,
      publisher,
      genres: filteredGenres || [] //Creating a new object 'product' with extracted properties and filtered genres array or empty array if genres is undefined
    };

    res.status(200).json(product); //Send JSON response with 'product' object and HTTP status code 200

  }
};

//PUT
const putGame = async (req,res)=>{ //declare an asynchronous function putGame that accepts req and res as parameters
    //Serve edit page
    try {
        if(req.method==='GET'){ //check if the request method is GET
            const [rows] = await db
            .promise()
            .query("SELECT * FROM product WHERE id = ?", [req.params.id]); //execute a query to select all columns of the row in the product table with the specified id in req.params.id
            if (rows && rows.length) { //check if the rows variable is not null or undefined, and if it has a length greater than 0
                const product = rows[0]; //assign the first row in the rows array to the product variable
                res.status(200).json({ product }); //send a JSON response with a success status code and the product object
            } else { //if there are no rows or rows.length is 0
            // Product not found, render an error page or redirect
            res.status(404).json({message: "Product not found"}); //send a JSON response with a 404 status code and an error message
            }
        }else if(req.method === 'PUT'){ //check if the request method is PUT
            const id = req.params.id; //assign the id parameter in the request to the id variable
            const {name, description, singleplayer, multiplayer, open_world, sandbox, simulator, team_based, fps, horror, puzzle, other, publisher, price } = req.body; //destructure the request body to get the values of name, description, and other properties

            try {
            await db.promise().query(
                `UPDATE product SET name=?, description=?, singleplayer=?, multiplayer=?, open_world=?, sandbox=?, simulator=?, team_based=?, fps=?, horror=?, puzzle=?, other=?, publisher=?, price=? WHERE id=?`,
                [name, description, !!singleplayer, !!multiplayer, !!open_world, !!sandbox, !!simulator, !!team_based, !!fps, !!horror, !!puzzle, !!other, publisher, price, id] //use the destructured values to update the product row with the specified id
            );
            res.status(200).json({message: 'Product successfully updated', token: req.cookies.token}); //send a JSON response with a success status code and a message
            } catch (error) { //catch any errors thrown in the try block
                console.log(error); //log the error to the console
                return res.status(500).json({ message: error }); //send a JSON response with a 500 status code and the error message
            } 
        }
    }catch(err){ //catch any errors thrown in the try block
        console.log(err); //log the error to the console  
        return res.status(500).json({message: err}); //send a JSON response with a 500 status code and the error message
    }
}


const deleteGame = async (req, res) => { //Create an asynchronous function named deleteGame that accepts request and response objects as parameters.

  const productID = req.params.id; //Retrieve the id of the product from the request parameters.

  try { //Use try-catch to handle any errors that may occur within the function.
    
    //Delete all product reference in the cart as well
    await db.promise().query('START TRANSACTION'); //Start a transaction to ensure data consistency.
    
    try { //Use try-catch to handle any errors that may occur within the transaction block.

      await db.promise().query('DELETE FROM cart where pid = ?', [productID]); //Delete all references of the product from the cart.
      
      console.log(`Deleted from cart where pid = ${productID}`); //Print a message on the console indicating the successful deletion from the cart.

    } catch (error) { //Handle any errors that may occur during the deletion from the cart.

      await db.promise().query('ROLLBACK'); //Rollback the transaction to undo any changes that were made to the database.

    }

    try { //Use try-catch to handle any errors that may occur within the transaction block.

      // Delete product from database
      await db.promise().query('DELETE FROM product WHERE id = ?', [productID]); //Delete the product from the database.
      await db.promise().query('COMMIT'); //Commit the transaction to save the changes to the database.

      res.status(200).json({ message: 'Product deleted successfully', token: req.cookies.token }); //Send a success message with a response status of 200, and a JSON object containing a success message and the user's token.

    } catch (error) { //Handle any errors that may occur during the deletion of the product.

      await db.promise().query('ROLLBACK'); //Rollback the transaction to undo any changes that were made to the database.
      
      res.status(404).json({ message: 'Product does not exist' }); //Send a response status of 404 with a JSON object containing an error message.

    }

  } catch (err) { //Handle any errors that may occur outside the transaction block.

    await db.promise().query('ROLLBACK'); //Rollback the transaction to undo any changes that were made to the database.

    res.status(500).json({ message: 'Internal server error' }); //Send a response status of 500 with a JSON object containing an error message.

  }

};

// Define an asynchronous function named postGame that takes in the request and response objects
const postGame = async (req, res) => {

  // Destructure the values of name, description, singleplayer, multiplayer, open_world, sandbox, simulator, team_based, fps, horror, puzzle, other, publisher, and price from the request body
  const { name, description, singleplayer, multiplayer, open_world, sandbox, simulator, team_based, fps, horror, puzzle, other, publisher, price } = req.body;

  // Declare an empty object named img
  const img = {};

  // Print out the request body to the console
  console.log(req.body);

  // Check if the name field is not empty or null, and if it is, return a response with a status code of 400 and a JSON object with a message property that states "Name is required"
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    // Insert a new row in the "product" table with values for name, description, singleplayer, multiplayer, open_world, sandbox, simulator, team_based, fps, horror, puzzle, other, publisher, price, and img
    const [result] = await db.promise().query('INSERT INTO product SET ?', {
      name,
      description,
      singleplayer: !!singleplayer,
      multiplayer: !!multiplayer,
      open_world: !!open_world,
      sandbox: !!sandbox,
      simulator: !!simulator,
      team_based: !!team_based,
      fps: !!fps,
      horror: !!horror,
      puzzle: !!puzzle,
      other: !!other,
      publisher,
      price,
      img: JSON.stringify({})
    });

    // Update the img column in the database with the newly created img object
    await db.promise().query('UPDATE product SET img = ? WHERE id = ?', [JSON.stringify(img), result.insertId]);

    // Return a response with a status code of 201 and a JSON object with a message property that states "Product created successfully" and a token property taken from the request cookies
    res.status(201).json({message: 'Product created successfully', token: req.cookies.token})
  } catch (err) {
    // If an error is thrown, print the error message to the console and return a response with a status code of 500 and a JSON object with a message property that states "An unexpected error occurred"
    console.error(err);
    console.log('Error caught!');
    return res.status(500).json({ message: 'An unexpected error occurred'});
  }
}

// Export an object with search, getGame, postGame, putGame, and deleteGame properties
module.exports = {
    search,
    getGame,
    postGame,
    putGame,
    deleteGame
}
