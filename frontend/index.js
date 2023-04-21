//IMPORTANT HEADER
/**
 * //ASYNC AWAIT
//Async-await is a way to handle asynchronous functions in JavaScript, allowing code to be executed in a synchronous manner without blocking the main thread. Async-await works by allowing a function to be marked as "async" and using the "await" keyword to pause the function execution until a Promise is resolved. This allows for cleaner and more readable code that avoids "callback hell" and makes error handling easier.

//PROMISES
//A Promise is a built-in JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises are used to handle asynchronous operations and can be chained together to perform a series of tasks in a specific order. Promises have three states: "pending" (when the Promise is created and not yet settled), "fulfilled" (when the Promise is settled successfully), and "rejected" (when the Promise is settled with an error).
 */


/**
HTTP headers are additional pieces of information that are sent alongside an HTTP request or response. They provide important information about the request or response, such as the content type, caching directives, or authentication credentials.

HTTP headers are divided into two categories: request headers and response headers. Request headers are sent by the client to the server and provide information about the request, such as the user agent, the content type of the request body, or the preferred language of the user. Response headers, on the other hand, are sent by the server to the client and provide information about the response, such as the content type of the response body, the status code, or the caching directives.

Each header consists of a name and a value, separated by a colon. For example, the "User-Agent" header in a request might have the value "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3", indicating that the client is running the Chrome browser on a Windows 10 machine.

HTTP headers can be used for a variety of purposes, such as content negotiation, authentication, caching, or security. Web developers often use custom headers to pass additional information between the client and server, such as API keys or session IDs. However, care should be taken when adding custom headers, as they may be blocked by firewalls or proxies, or cause compatibility issues with other clients or servers.
 */

/**
The `fetch()` method in JavaScript is used to send HTTP requests from a web page or application to a backend server and retrieve data or resources. It is commonly used in front-end development to communicate with a backend API and retrieve data in a format such as JSON, HTML, or text.

The `fetch()` method takes one mandatory parameter, the URL of the resource being requested, and an optional parameter that specifies additional options for the request, such as headers or the HTTP method to use (GET, POST, etc.).

When a `fetch()` request is made, it returns a `Promise` that resolves to a `Response` object. The `Response` object contains the status of the response, headers, and the body of the response. 

To retrieve the data from the response, the `json()`, `text()`, or `blob()` methods can be called on the `Response` object. The `json()` method returns a JSON object, while the `text()` method returns a string containing the response text. The `blob()` method returns a `Blob` object, which represents raw binary data.

Here is an example of using `fetch()` to send a GET request to retrieve data from a backend API:

```javascript
fetch('https://example.com/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

In this example, `fetch()` sends a GET request to the URL `https://example.com/api/data` and returns a `Promise`. When the promise resolves, the `json()` method is called on the `Response` object to extract the JSON data. The extracted data is then logged to the console.

It's important to note that `fetch()` is a relatively low-level API and does not handle network errors or HTTP errors in a user-friendly manner. It's recommended to wrap `fetch()` in a custom function or library that provides error handling and abstraction for common use cases.
 */

//Index.js for front-end module
//Overview
/*
This is an index.js file for a front-end module. The file sets up a Node.js web application using the Express framework and defines several middleware functions to parse requests, serve static files, and handle cookies.

The express module is imported and assigned to the express constant.
The express.Router() method is used to create a new router object, which is assigned to the route constant.
An instance of the express module is created and assigned to the app constant.
The ejs module is imported and assigned to the ejs constant.
The path module is imported and assigned to the path constant.
The axios module is imported and assigned to the axios constant.
The morgan module is imported and assigned to the morgan constant.
The jsonwebtoken module is imported and assigned to the jwt constant.
The dotenv module is used to load environment variables from the .env file.
The checkToken middleware is imported from the ./controller/cookie module.
The express.static() method is used to serve static files from the public directory.
The app.set() method is used to set the view engine to EJS and the directory for EJS views.
The express.json() method is used to parse JSON requests.
The morgan() method is used to log HTTP requests.
The express.urlencoded() method is used to parse URL-encoded requests.
The cookie-parser module is used to parse cookies.
The parseJSONResponse() function is defined to parse JSON responses.
*/

//Importing required dependencies
const express = require('express'); //Import the Express framework
const route = express.Router(); //Create a new router object
const app = express(); //Create an instance of Express
const ejs = require('ejs'); //Import EJS view engine
const path = require('path'); //Import the Path module
const axios = require('axios'); //Import Axios for making HTTP requests
const morgan = require('morgan'); //Import Morgan for logging HTTP requests
const jwt = require('jsonwebtoken'); //Import JSON web token
require('dotenv').config(); //Load environment variables from .env file
const checkToken = require('./controller/cookie'); //Import the checkToken middleware

//Serve static files from the public directory
app.use(express.static('public'));

//Set the view engine to EJS
app.set('view engine', 'ejs');

//Set the directory for EJS views
app.set('views', path.join(__dirname, 'views'));

//Parse JSON requests
app.use(express.json());

//Use Morgan for HTTP request logging
app.use(morgan('dev'));

//Parse URL-encoded requests
app.use(express.urlencoded({extended:false}));

//Parse cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Define a function to parse JSON responses (We don't actually use this one and it doesn't work)
const parseJSONResponse = async (response) => {
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

// app.use((req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return next();
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = {role: decoded.isAdmin};
//     // req.user = decoded;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

//This line adds a middleware function 'checkToken' to the middleware stack of the Express application
app.use(checkToken);

//This function gets the value of a cookie with a specified name from the cookies sent in a request
function getCookie(req,name) {
  const cookie = req.cookies[name];
  return cookie ? cookie : null;
}

//This route handles GET requests to the root URL
app.get('/', (req,res)=>{
    //This line is commented out, but it appears to log the cookies sent in the request to the console
    // console.log(req.cookies);

    //This line sends a response with status code 200 and renders the 'index' view, passing in variables for the user's cookies, token, and jwt
    res.status(200).render('index', {user: req.cookies, token:req.cookies.token, jwt:jwt});
})

//This route handles GET requests to the '/about' URL
//It sends the contents of the 'about.html' file located in the 'public' directory as the response
app.get('/about', (req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'about.html'));
})

//This route handles GET requests to the '/register' URL
//It sends the contents of the 'register.html' file located in the 'public/auth' directory as the response
route.get('/register', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'public', 'auth', 'register.html'));
});


//Define a POST route for user registration
route.post('/register', async (req, res) => {
  const username = req.body.username.trim(); //Get username from request body and remove whitespace
  const password = req.body.password; //Get password from request body

  //Send registration request to backend API
  const response = await fetch('http://localhost:80/auth/register', {
    method: 'POST', //Use HTTP POST method
    headers: {
      'Content-Type': 'application/json' //Set content type of request to JSON
    },
    body: JSON.stringify({ username, password }) //Convert username and password to JSON string and set as request body
  });

  if (response.ok) {
    const data = await response.json(); //Parse the JSON response received from the API
    // handle successful registration
    console.log(data); //Print the response to console
    res.status(200).redirect('/auth/login'); //Redirect to login page with HTTP status 200
  } else {
    const errorData = await response.json(); //Parse the JSON error response received from the API
    // handle registration error
    res.status(404).render('error', {message: errorData}) //Render error page with the error message received from the API
  }
});

//Define a GET route for user login
route.get('/login', (req,res)=>{
    res.status(200).render('login', {messages: req.query.message}); //Render login page with any query messages passed in the URL
})

// Handle login form submission
route.post('/login', async (req, res) => {
  const { username, password } = req.body; //Destructure username and password from request body

  // Send login request to backend API
  const response = await fetch('http://localhost:80/auth/login', {
    method: 'POST', //Use HTTP POST method
    headers: {
      'Content-Type': 'application/json' //Set content type of request to JSON
    },
    body: JSON.stringify({ username, password }) //Convert username and password to JSON string and set as request body
  });

  // Handle response from backend API
  const { status, message, token } = await response.json(); //Parse the JSON response received from the API
  if (status === 'success') {
    // If authentication successful, set token in cookie and redirect to homepage
    res.cookie('token', token, {
        secure: true, //Set cookie as secure
        sameSite: 'lax', //Set cookie as same-site
        maxAge: 7200000 //Set cookie expiry time
    });

    res.status(200).render('success', {message: "Successfully logged in", token: token}); //Render success page with message and token
  } else {
    // If authentication failed, redirect to login page with error message
    res.status(401).render('login', {messages:[message]}); //Render login page with error message received from the API
  }
});

//Mount the routes on the app under the /auth subpath
app.use('/auth', route);

//Handle GET requests for the /error route
app.get('/error', (req, res) => {
  fetch('/error') //send a fetch request to the /error route
    .then(res => res.json()) //convert the response to JSON format
    .then(data => {
      res.render('error', { message: data.message }); //Render the error.ejs view with the JSON message
    })
    .catch(err => console.error(err)); //Log the error if any
});

//Handle GET requests for the /admin/dashboard route with a middleware function for checking the token
app.get('/admin/dashboard', checkToken, (req,res,next)=>{

    let token;

  if (req.cookies && req.cookies.token) { //Check if token is present in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { //Check if token is present in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) { //If token is not present
    return res.status(401).render('error', { message: 'Authorization header missing or invalid' }); //Render the error.ejs view with the error message
  }

  //Verify the token with the JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) { //If token is invalid
      return res.status(401).render('error',{ message: 'Invalid token' }); //Render the error.ejs view with the error message
    }

    if (!decodedToken.isAdmin) { //If user is not an admin
      return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //Render the error.ejs view with the error message
    }

    //Fetch user data from the /admin/users route with the token as an authorization header
        fetch('http://localhost:80/admin/users', {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.json()) //Convert the response to JSON format
        .then(data => {
        const users = data; //Assign the JSON response to users

        //Fetch product data from the /admin/product route with the token as an authorization header
        fetch('http://localhost:80/admin/product',{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.json()) //Convert the response to JSON format
        .then(data => {
        const product = data; //Assign the JSON response to product

        // Pass the users and product data to the user.ejs file for rendering
        res.render('user', { users, product }); //Render the user.ejs view with the users and product data
        })
        .catch(error => console.error(error)); //Log the error if any
        })
        .catch(error => console.error(error)); //Log the error if any
    })
})



app.get('/admin/adduser', checkToken, (req,res)=>{ //create a GET route with /admin/adduser path which requires authentication token to access it
    let token;
    if (req.cookies && req.cookies.token) { //check if token is present in cookies
        token = req.cookies.token; 
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { //check if token is present in headers
        token = req.headers.authorization.split(' ')[1]; 
    }

    if (!token) { //if token is not found in cookies or headers
        return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); //render an error message and send a 401 response status code
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { //verify the token using the JWT_SECRET
        if (err) {
            return res.status(401).render('error',{ message: 'Invalid token' }); //if token is not valid, render an error message and send a 401 response status code
        }

        if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
            return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
        }

        //Code here
        return res.status(200).sendFile(path.join(__dirname, 'public', 'admin', 'adduser.html')); //if token is valid and user is admin, send the HTML file for adding a new user
    })
});

app.get('/admin/dashboard/edit/:id', checkToken, async (req, res) => { //create a GET route with /admin/dashboard/edit/:id path which requires authentication token to access it
    try {
        const response = await fetch(`http://localhost:80/admin/users/${req.params.id}`, { //fetch the user details from server using the user id in the path
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.cookies.token}`, //send the token in the Authorization header
            },
            credentials: 'include', //include credentials (cookies)
        });

        if (!response.ok) { //if response status is not ok (200-299)
            const errorData = await response.json(); //parse the response body as JSON
            return res.status(response.status).render('error', { message: errorData.message }); //render an error message and send the response status code
        }

        const user = await response.json(); //parse the response body as JSON
        res.status(200).render('edit', { user }); //render the edit page with the user details
    } catch (err) {
        console.log('Error getting edit page');
        res.status(500).render('error', { message: 'Internal server error' }); //render an error message and send a 500 response status code
    }
});

app.post('/admin/dashboard/edit/:id', checkToken, (req,res)=>{
  let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here
      const data = {password: req.body.password, role: req.body.role}
      try {
        fetch(`http://localhost:80/admin/dashboard/edit/${req.params.id}`,{
          method: "PUT",
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify(data)
        }).then(response=>{
          if(response.ok){
            res.status(200).render('success', {message: "Successfully edit user", token: token});
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
          }
        }).catch(error =>{
          return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
        })


      } catch (error) {
        return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
      }

    });
})

app.post('/admin/dashboard/delete/:id', checkToken, (req,res)=>{
  let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here
      try {
        fetch(`http://localhost:80/admin/dashboard/delete/${req.params.id}`,{
          method: "DELETE",
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          credentials: 'include'
        }).then(response=>{
          if(response.ok){
            res.status(200).render('success', {message: "Successfully delete user", token: token});
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
          }
        }).catch(error =>{
          return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
        })


      } catch (error) {
        return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
      }

    });
})

app.post('/admin/adduser', checkToken, (req,res)=>{
     let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here
      const data = {username: req.body.username, password: req.body.password, role: req.body.role}
      try {
        fetch('http://localhost:80/admin/adduser',{
          method: "POST",
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify(req.body)
        }).then(response=>{
          if(response.ok){
            res.status(200).render('success', {message: "Successfully added a new user", token: token});
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
          }
        }).catch(error =>{
          return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
        })


      } catch (error) {
        return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
      }

    });
})

app.get('/admin/addgame', checkToken, (req,res)=>{
     let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) {
      return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); // handle forbidden access
    }

    //Code here
    return res.status(200).sendFile(path.join(__dirname, 'public', 'admin', 'addgame.html'))

    })
})

app.post('/admin/addgame', checkToken, (req,res)=>{
   let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here
      const data = {
        name: req.body.name,
        description: req.body.description,
        singleplayer: req.body.singleplayer,
        multiplayer: req.body.multiplayer,
        open_world: req.body.open_world,
        sandbox: req.body.sandbox,
        simulator: req.body.simulator,
        team_based: req.body.team_based,
        fps: req.body.fps,
        horror: req.body.horror,
        puzzle: req.body.puzzle,
        other: req.body.other,
        publisher: req.body.publisher,
        price: req.body.price
      };

      console.log(data);

      fetch('http://localhost:80/admin/addgame', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Parse the response JSON
          }
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          console.log(data);
          res.status(200).render('success', { message: 'Product successfully added', token });
        })
        .catch((err) => console.error(err));
      });

})

//Put game
app.post('/admin/dashboard/game/edit/:id', checkToken, (req,res)=>{
   let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here
      
      try {
        fetch(`http://localhost:80/admin/dashboard/game/edit/${req.params.id}`,{
          method: "PUT",
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify(req.body)
        }).then(response=>{
          if(response.ok){
            res.status(200).render('success', {message: "Successfully Edit product", token: token});
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
          }
        }).catch(error =>{
          return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
        })
      } catch (error) {
        return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
      }

    });
})

//DELETE GAME
app.post('/admin/dashboard/game/delete/:id', checkToken, (req,res)=>{
   let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here
      
      try {
        fetch(`http://localhost:80/admin/dashboard/game/delete/${req.params.id}`,{
          method: "DELETE",
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          credentials: 'include'
        }).then(response=>{
          if(response.ok){
            res.status(200).render('success', {message: "Successfully Delete product", token: token});
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
          }
        }).catch(error =>{
          return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
        })
      } catch (error) {
        return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error
      }

    });
})


app.get('/store/browse', async (req,res)=>{
    const response = await fetch('http://localhost:80/store/browse');
    const data = await response.json();
    res.render('catalogue', {product: data})
})

app.get('/store/browse/:id', async (req,res)=>{
    
    const response = await fetch(`http://localhost:80/store/browse/${req.params.id}`,{
        headers:{
            'Content-Type': `application/json`
        }
    });
    const data = await response.json();
    res.render('product', {product: data})
})

app.get('/admin/dashboard/game/edit/:id', checkToken, async (req,res)=>{
    const response = await fetch(`http://localhost:80/admin/product/${req.params.id}`,{
        headers:{
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${req.cookies.token}`
        },
        credentials: 'include'
    })
    const data = await response.json();
    res.render('editGame', {product: data});
})

app.get('/store/search', async (req,res)=>{
    const response = await fetch('http://localhost:80/store/search',{
        headers:{
            "Content-type": `application/json`
        }
    })
    const data = await response.json();
    res.status(200).render('search', {product: data.product});
})

//From backend cart routes

//For user cart (We will use authentication middleware later)
// routes.get('/cart', checkJWT, getCart); //Retrieve cart via decoded user id
// routes.post('/cart/:id', checkJWT, addToCart); //Add item with specific id to cart
// routes.put('/cart/update/:id', checkJWT, putCart); //Change quantity of specific item in the cart
// routes.delete('/cart/delete/:id', checkJWT, deleteCart); //Delete product with ID from the cart

app.get('/store/cart', checkToken, async (req, res) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error', { message: 'Authorization header missing or invalid (401)' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error', { message: 'Invalid token' });
    }

    const userID = decodedToken.id;

    try {
      const response = await fetch(`http://localhost:80/store/cart?uid=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error retrieving cart');
      }

      const data = await response.json();
      const { cartItems, totalSum, user } = data;
      
      res.render('cart', { cartItems, totalSum, user, token });
      
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'Internal server error' });
    }
  });
});

/*



*/

app.post('/store/cart/:id', checkToken, async (req,res)=>{
  const data = { quantity: req.body.quantity };
  let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }
    const userID = decodedToken.id;

    //Code here
    
    fetch(`http://localhost:80/store/cart/${req.params.id}?uid=${userID}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  .then(response=>{
    if(response.ok){
      //Render
      res.status(200).render('success', {message: 'Successfully added to cart.', token: token});
    }
    else{
      res.status(404).render('error', {message :"No product error"})
    }
  })
  .catch(err=>{
    res.status(500).render('error', {message : "internal server error"})
  })

    })
})

app.post('/store/cart/update/:id', checkToken, async (req,res)=>{
  const data = { quantity: req.body.quantity };
  let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }
    
    const userID = decodedToken.id;

    //Code here
    
    fetch(`http://localhost:80/store/cart/update/${req.params.id}?uid=${userID}`,{
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  .then(response=>{
    if(response.ok){
      //Render
      res.status(200).render('success', {message: 'Successfully edit the cart.', token: token});
    }
    else{
      res.status(404).render('error', {message :"No product error"})
    }
  })
  .catch(err=>{
    res.status(500).render('error', {message : "internal server error"})
  })

    })
})

app.post('/store/cart/delete/:id', checkToken, async (req,res)=>{

  let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }
    
    const userID = decodedToken.id;

    //Code here
    
    fetch(`http://localhost:80/store/cart/delete/${req.params.id}`,{
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response=>{
    if(response.ok){
      //Render
      res.status(200).render('success', {message: 'Successfully delete from cart.', token: token});
    }
    else{
      res.status(404).render('error', {message :"No product to delete error"})
    }
  })
  .catch(err=>{
    res.status(500).render('error', {message : "internal server error"})
  })

    })
})


const getSuccess = (req,res,next)=>{
    res.status(200).render('successpay',{message: "Your process has been successfully ordered", token: req.cookies.token});
}

const getCancelled = (req,res,next) =>{
    res.status(400).render('cancel', {message: "Your process has been cancelled"});
}

const wipe = (req,res,next) =>{
    let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error', { message: 'Authorization header missing or invalid (401)' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error', { message: 'Invalid token' });
    }

    const userID = decodedToken.id;

    try {
      const response = await fetch(`http://localhost:80/pay?uid=${userID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      next();
      
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'Internal server error' });
    }
  });
}

app.get('/pay/success', checkToken, wipe, getSuccess)
app.get('/pay/cancel', getCancelled)


//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'public' ,'404.html'));
});

app.listen(3000, ()=>{
    console.log('Frontend is listening on port 3000');
})