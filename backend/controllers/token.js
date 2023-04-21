/**
 * Bcrypt is a popular library for hashing passwords in Node.js. Salting is a technique used in hashing to add an additional layer of security to passwords.

When a user creates a new password or updates their password, the password is hashed using a hash function, such as bcrypt. The hash function converts the password into an irreversible hash value, which is then stored in the database.

However, if an attacker gains access to the database, they can potentially retrieve the hashed passwords and attempt to crack them by using a brute force attack or a dictionary attack. This is where salting comes in.

Salting involves adding a random string of characters to the password before hashing it. This random string of characters is called a salt. The salt is unique for each password, so even if two users have the same password, their hashed passwords will be different because of the different salts.

By adding a salt to the password, the attacker can't use precomputed tables or rainbow tables to crack the password because they need to recalculate the hash value for each password and salt combination. This makes it much more difficult for attackers to crack hashed passwords.

Bcrypt handles the salt generation and storage automatically, so it's easy to use for developers. By default, bcrypt generates a salt internally and appends it to the hashed password. The salt is then stored as part of the hashed password so that it can be used for password verification later.
 * 
 */
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken package 


/*
In web development, a header is a part of an HTTP request or response that contains additional information about the request or response. 

In the code you provided, `req.headers` is an object that contains the headers of the incoming HTTP request. The `authorization` header is used to send authentication credentials in the request. The value of the `authorization` header is typically a token or a set of credentials that the server can use to authenticate the user. 

The `split(' ')[1]` method is used to extract the token from the `authorization` header. The `split` method splits a string into an array of substrings based on a specified separator, which in this case is a space character. The `[1]` index is used to get the second element of the resulting array, which should contain the token. 

If the `authorization` header is not present in the request, the code falls back to checking the `token` property of the `cookies` object, which is another way of sending the token in the request.
*/

const checkJWT = (req, res, next) => { // Defining a middleware function called checkJWT with three parameters req, res, next 
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token; // Extracting token from Authorization header or cookies 
  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' }); // Handling unauthorized access, returns JSON object with message and status code 
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { // Verifying token using the JWT_SECRET stored in the environment variable
    if (err) {
      return res.status(401).json({ message: 'Invalid token' }); // Handling unauthorized access, returns JSON object with message and status code
    }

    req.user = { id: decodedToken.id, isAdmin: decodedToken.isAdmin }; // Adding decoded user data to the request object
    next(); // Calling the next middleware function 
  });
};

function checkAdmin(req, res, next) { // Defining a middleware function called checkAdmin with three parameters req, res, next
  const user = req.user; // Extracting user data from the request object
  if (!user || !user.isAdmin) { // Checking if the user data exists or if the user is not an admin
    return res.status(401).json({message: "Unauthorized Access"}) // Handling unauthorized access, returns JSON object with message and status code
  }
  next(); // Calling the next middleware function 
}

function checkUser(req, res, next) { // Defining a middleware function called checkUser with three parameters req, res, next
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token; // Extracting token from Authorization header or cookies
  if (!token) { // Checking if the token exists
    req.user = { role: 'guest' }; // Setting user role as guest if the token is missing
    return next(); // Calling the next middleware function
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying token using the JWT_SECRET stored in the environment variable
    req.user = { id: decoded.id, role: decoded.isAdmin ? 'admin' : 'user' }; // Adding decoded user data to the request object
    next(); // Calling the next middleware function
  } catch (error) {
    req.user = { role: 'guest' }; // Setting user role as guest if there is an error while decoding the token
    return res.status(401).json({message: "Invalid token"}); // Handling unauthorized access, returns JSON object with message and status code
  }
}


module.exports = { checkJWT, checkAdmin, checkUser };
