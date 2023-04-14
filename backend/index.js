//To do stuff with backend like routing, querying
const express = require('express');
const session = require('express-session')
const methodOverride = require('method-override'); //Use to put DELETE PUT etc. in form action (default is only get/put)
const app = express(); 
const path = require('path'); //For file pathing
const morgan = require('morgan'); //For logging
require('dotenv').config(); //Used to call variables such as DEV, DB credential, PORT no
const bcrypt = require('bcrypt'); //For hashing/salting that offers more protection than normal SHA256
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const {checkUser} = require('./controllers/token')
const cors = require('cors')
//PREPROCESSING BEGIN (DB CONNECTION, CREATE AN ADMIN ETC.)

//Allow the frontend to connect to the backend
app.use(cors({origin: 'http://localhost:3000'}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const {db} = require('./model/database');
module.exports = {db}; //Exporting db pool to allow other files to join and query DB


const passport = require('./controllers/passport');

//Add an admin everytime the server starts (if there is already an admin then we delete it)
const adminPassword = process.env.ADMIN_PASSWORD;

//Encrypting the password before we insert it into the DB
bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  // check if admin user already exists
  db.query('SELECT * FROM users WHERE username = ?', ['admin'], (err, result) => {
    if (err) {
      console.error('Error checking admin user:', err);
      return;
    }
    if (result.length > 0) {
      console.log('Admin user already exists');
      return;
    }

    // add new admin user
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


//Games route
const user_route = require('./routes/users');
//AUTH route
const auth = require('./routes/auth');
//Admin route
const admin = require('./routes/admin');

const checkOut = require('./routes/checkout')

//Define port for connection
//If we are using DEV variable then we use port 3000
//else we use port 8080
//The variable is declared inside .env file, which are not on VCS
const port =80; //All the value inside .env are strings

//Required for req.flash()
app.use(flash());

//Allowing express to parse req.body
app.use(bodyParser.urlencoded({ extended: false }));
//Method ovveride for DELETE
app.use(methodOverride(req => req.body._method));

//Cookie
app.use(cookieParser())


//Using session-express
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}))

//Passport
app.use(passport.initialize())
app.use(passport.session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

//JSON stuff
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Assets folder to store images/data/assets
// app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

//logging
app.use(morgan('dev'))

//Set the view folder to where EJS will run at runtime
// app.set('views', path.join(__dirname,'..','frontend','view'))
// app.set('view engine', 'ejs');

//Routing
//Game routings
app.use('/store', user_route); //Relative to this file location (server/item/user_route)
//auth routing
app.use('/auth', auth);
//admin routing
app.use('/admin', admin);
//payment routing
app.use('/pay', checkOut)

app.get('/', (req,res)=>{
  res.send(`{
    "status":"running",
    "port":"80"
  }`)
})

app.use('/error',(err, req, res, next) => {
  console.error(err);
  const errorMessage = err.message || 'Internal Server Error';
  res.status(err.status || 500);
  res.json({ message : errorMessage });
});

// app.get('/', checkUser, (req,res)=>{
//     //We are going to change some texts based on being login or not
//     res.status(200).json({user: req.user});
// });

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
});

//END OF MAIN