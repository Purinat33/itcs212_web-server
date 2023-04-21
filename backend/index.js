//Include the required modules for backend development
const express = require('express'); //Express.js is a popular Node.js web framework used for backend development
const session = require('express-session') //Express.js middleware for maintaining sessions
const methodOverride = require('method-override'); //Middleware for allowing HTTP methods other than GET and POST in HTML forms
const app = express(); //Create an instance of express application
const path = require('path'); //Node.js module for handling file paths
const morgan = require('morgan'); //HTTP request logger middleware for node.js
require('dotenv').config(); //Module for loading environment variables from a .env file
const bcrypt = require('bcrypt'); //Module for encrypting password and generating salted hashes
const flash = require('connect-flash'); //Module for displaying flash messages
const bodyParser = require('body-parser'); //Middleware for parsing incoming request bodies
const cookieParser = require('cookie-parser') //Middleware for parsing cookies in HTTP requests
const {checkUser} = require('./controllers/token') //Importing checkUser function from token.js module
const cors = require('cors') //Middleware for handling Cross-Origin Resource Sharing (CORS) 

//Allow the frontend to connect to the backend
app.use(cors({origin: 'http://localhost:3000'})); //Set the origin for CORS as http://localhost:3000

//Setting headers for CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //Set Access-Control-Allow-Origin header to allow any origin to access the resource
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); //Set Access-Control-Allow-Methods header to allow GET, POST, PUT and DELETE HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //Set Access-Control-Allow-Headers header to allow Origin, X-Requested-With, Content-Type and Accept headers
  next();
});

//Require the database connection module and export the database connection pool
const {db} = require('./model/database');
module.exports = {db};

//Require the passport.js authentication module
const passport = require('./controllers/passport');

//Add an admin user every time the server starts (if there is already an admin user then skip it)
const adminPassword = process.env.ADMIN_PASSWORD; //Get the admin password from the environment variables

//Encrypting the admin password before inserting into the database
bcrypt.hash(adminPassword, 10, (err, hashedPassword) => { //Hash the password with salt rounds of 10
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  // Check if admin user already exists in the database
  db.query('SELECT * FROM users WHERE username = ?', ['admin'], (err, result) => {
    if (err) {
      console.error('Error checking admin user:', err);
      return;
    }
    if (result.length > 0) {
      console.log('Admin user already exists');
      return;
    }

    // Add new admin user to the database
    const user = {
      username: 'admin',
      password: hashedPassword,
      isAdmin: true,
    };

    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        console.error('Error creating admin user:', err);
        return;
      }
      console.log('Added new admin user');
    });
  });
});
//END OF PREPROCESSING

// Importing the users routes
const user_route = require('./routes/users');
// Importing the authentication routes
const auth = require('./routes/auth');
// Importing the admin routes
const admin = require('./routes/admin');

// Importing the checkout routes
const checkOut = require('./routes/checkout')

// Defining the port for connection. 
// If the environment variable DEV is set to true, the port will be set to 3000. Otherwise, it will be set to 8080.
// The value of DEV is declared in the .env file, which is not tracked by the version control system.
const port = 80; // Note that all the values inside .env are strings.

// Required for req.flash()
app.use(flash());

// Allowing express to parse req.body
app.use(bodyParser.urlencoded({ extended: false }));

// Method override for DELETE
app.use(methodOverride(req => req.body._method));

// Cookie
app.use(cookieParser())

// Using express session middleware
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Passport
app.use(passport.initialize())

// Using passport session middleware
app.use(passport.session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// JSON stuff
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Static assets folder to store images/data/assets
// app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Logging
app.use(morgan('dev'))

//Set the view folder to where EJS will run at runtime
// app.set('views', path.join(__dirname,'..','frontend','view'))
// app.set('view engine', 'ejs');


//Routing
//Game routings
app.use('/store', user_route); //Use the user_route for '/store' path. 
//Relative to this file location

//auth routing
app.use('/auth', auth); //Use the auth route for '/auth' path.

//admin routing
app.use('/admin', admin); //Use the admin route for '/admin' path.

//payment routing
app.use('/pay', checkOut) //Use the checkOut route for '/pay' path.

/**
 * In the first line app.use('/store', user_route);, the '/store' argument is a base URL that is added to all routes defined inside user_route file. This means that when a client makes a request to '/store' endpoint, it will be routed to user_route file where the corresponding routes will be defined relative to this base URL.

So, when you define a route in user_route file like routes.get('/cart', checkJWT, getCart), it will be relative to the base URL '/store' and the full URL will become '/store/cart'. This is because the '/cart' argument is added to the '/store' base URL.

Therefore, when making the full request, you have to use '/store/cart' instead of just '/cart' because the server was configured to serve all the routes relative to the '/store' base URL.
 */

// Handle GET requests to the root path '/'
app.get('/', (req,res)=>{
  res.send(`{
    "status":"running",
    "port":"80"
  }`)
})

// Handle error routes
app.use('/error',(err, req, res, next) => {
  console.error(err); // Log error message to console
  const errorMessage = err.message || 'Internal Server Error';
  res.status(err.status || 500);
  res.json({ message : errorMessage }); // Send error message as response in JSON format
});

// Handle GET requests to the root path '/' with a middleware function
// app.get('/', checkUser, (req,res)=>{
//     //We are going to change some texts based on being login or not
//     res.status(200).json({user: req.user});
// });

// Listen to the port for incoming requests
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
});

//END OF MAIN
