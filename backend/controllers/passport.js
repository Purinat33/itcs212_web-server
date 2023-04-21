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

// Require the Passport library and its dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Require the exported database connection from the index file
const {db} = require('../index'); // assuming we have a db.js file that exports the connection to the MySQL database

// Configure the LocalStrategy to authenticate users
passport.use(
  // Declare a new LocalStrategy instance with an async function that accepts a username, password, and callback function
  new LocalStrategy(async (username, password, done) => {
    try {
      // Use the exported database connection to execute a query to retrieve all the rows from the users table with a matching username
      const [rows] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
      // If no rows are returned, the user does not exist and authentication fails
      if (!rows.length) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // If a matching row is found, get the first user object from the returned rows
      const user = rows[0];
      // Use bcrypt to compare the given password with the user's hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the password does not match the hashed password, authentication fails
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // If authentication is successful, pass the user object to the done callback function
      return done(null, user);
    } catch (error) {
      // If an error occurs during the authentication process, pass the error object to the done callback function
      return done(error);
    }
  })
);

// Serializing the user object to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the user object from the session and retrieving the corresponding user from the database
passport.deserializeUser(async (id, done) => {
  try {
    // Execute a SQL query to retrieve the user with the provided id
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    // Check if a user with the provided id was found
    if (!rows.length) {
      // If no user was found, call done() with false as the second argument to indicate a failed authentication attempt
      return done(null, false);
    }

    // If a user was found, extract the first row from the result set
    const user = rows[0];

    // Call done() with the user object to indicate a successful authentication attempt
    return done(null, user);
  } catch (error) {
    // If an error occurred while executing the SQL query, call done() with the error object to indicate a failed authentication attempt
    return done(error);
  }
});

/**
 * This code appears to be using the Passport authentication middleware for Node.js. The serializeUser function is responsible for serializing the user object to store in the session, while the deserializeUser function is responsible for deserializing the user object from the session and retrieving the corresponding user from the database.

In serializeUser, the user object is passed as the first argument and a callback function done is passed as the second argument. The callback function is called with two arguments: null and the user's id. This indicates that the user object should be serialized using the user's id as the key.

In deserializeUser, a callback function is passed with two arguments: id and done. The function executes a SQL query to retrieve the user with the provided id. If a user is found, the user object is passed to the done function. If no user is found, done is called with false as the second argument to indicate a failed authentication attempt. If an error occurs during the execution of the SQL query, done is called with the error object to indicate a failed authentication attempt.
 */


module.exports = passport;
