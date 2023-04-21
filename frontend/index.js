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

//Callback function
/*
A callback function is a function that is passed as an argument to another function and is executed after the completion of that function. The primary purpose of a callback function is to enable asynchronous programming, where functions can run in the background without blocking other parts of the program.

Here's an example of a callback function:

```
function greet(name, callback) {
  console.log('Hello ' + name);
  callback();
}

function sayGoodbye() {
  console.log('Goodbye!');
}

greet('John', sayGoodbye);
```

In this example, we have two functions: `greet` and `sayGoodbye`. The `greet` function takes two arguments: a name and a callback function. It logs a message to the console and then calls the callback function.

The `sayGoodbye` function simply logs a message to the console.

When we call the `greet` function with the name 'John' and the `sayGoodbye` function as the callback, the `greet` function logs 'Hello John' to the console and then calls the `sayGoodbye` function. The `sayGoodbye` function then logs 'Goodbye!' to the console.

This example demonstrates how a callback function can be used to execute code after a specific task is completed. In this case, the `sayGoodbye` function is executed after the `greet` function has completed its task of logging a message to the console. 

In addition, callback functions are commonly used in asynchronous programming such as in JavaScript, where they can be used to handle responses from API calls, events, and other asynchronous operations. By passing a callback function as an argument to an asynchronous function, the callback can be executed when the asynchronous operation is completed.
*/

//Arrow function
/*
Arrow Function:
An arrow function is a concise way of writing a function in JavaScript. Arrow functions were introduced in ES6, and they offer a few advantages over traditional functions:

Shorter syntax: Arrow functions use a shorter syntax than traditional functions, which can make your code more readable and easier to write.

Implicit return: Arrow functions automatically return the value of the expression that follows the arrow (=>) symbol. This means you can omit the return keyword and the curly braces if your function only contains one expression.

No binding of 'this': Arrow functions do not bind their own 'this' value, which can make it easier to work with the 'this' keyword in JavaScript.

Here is an example of an arrow function:

```
const add = (a, b) => a + b;
console.log(add(2, 3)); // Output: 5
```
In this example, we define an arrow function called 'add' that takes two parameters, 'a' and 'b'. The function then returns the sum of 'a' and 'b'. We call the function and pass in the values 2 and 3, and the output is 5.
*/

//Arrow function + callback function
/*
```
app.get('/about', (req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'about.html'));
})
```

This code is an example of using a callback function and an arrow function in a web application built with Node.js and Express. 

The `app.get()` method sets up a route for the HTTP GET request method. In this case, the route is `/about`, which means that this code will handle GET requests for the `/about` route. 

The second argument passed to the `app.get()` method is an arrow function, which takes two arguments: `req` and `res`. The `req` argument represents the HTTP request sent by the client, and the `res` argument represents the HTTP response that the server will send back to the client.

Inside the arrow function, `res.status(200)` sets the HTTP response status code to `200`, which means that the request was successful. `sendFile()` is a method provided by the Express framework that sends a file as the response. In this case, `path.resolve(__dirname, 'public', 'about.html')` is the file path that will be sent. 

Overall, this code sets up a route for the `/about` URL and sends the `about.html` file when a GET request is made to that route. The arrow function serves as the callback function that handles the request and response.
*/

//---------------------------------------------------------------------------------------//
//IMPORTANT! : OVERVIEW OF WHAT FETCH() API IS (HEAVILY USED)
/*
`fetch()` is a JavaScript method that is used to send network requests to a server and receive responses from it. It is a part of the Web API specification and it is used to fetch resources and data from a network. The `fetch()` method returns a Promise object that resolves to the response of the request made. 

`fetch()` takes at least one parameter, which is the URL of the resource that you want to fetch. It can also take additional parameters, which are optional and can be used to configure the request. Here are some of the parameters that `fetch()` can take:

- `method`: This parameter is used to specify the HTTP method to be used for the request, such as GET, POST, PUT, DELETE, etc. The default method is GET if not specified.
- `headers`: This parameter is used to set the headers of the request. Headers are used to provide additional information about the request, such as the content type, authorization token, etc. The headers are defined as an object, where the keys are the header names and the values are the header values.
- `body`: This parameter is used to set the body of the request. The body contains the data that is being sent to the server. The body can be set to a string, a JSON object, or a FormData object.
- `credentials`: This parameter is used to indicate whether or not cookies, authorization headers, or TLS client certificates should be included with the request. It can be set to "omit" (default), "same-origin", or "include".

Here is an example of a simple case of communication between a frontend and a backend using `fetch()`:

Suppose we have a frontend application running on `http://localhost:3000`, and a backend API running on `http://localhost:80`. We want to send a GET request to the backend API to retrieve some data. We can use the following code in the frontend:

```
fetch('http://localhost:80/api/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  credentials: 'include'
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
```

In this example, we are using `fetch()` to send a GET request to `http://localhost:80/api/data`. We are specifying that we want to include cookies and authorization headers with the request, and that we are sending the request in JSON format. We are also attaching a token to the Authorization header. 

After sending the request, we are using the `then()` method to convert the response to JSON format, and then logging the data to the console. If there is an error, we are using the `catch()` method to log the error to the console. 

In summary, `fetch()` is a powerful method that can be used to communicate with a server and retrieve data. It takes a URL as a required parameter, and can take additional parameters to configure the request, such as method, headers, body, and credentials. When used properly, `fetch()` can greatly simplify the process of sending and receiving data over a network.
*/
//---------------------------------------------------------------------------------------//

//EJS file (The files in view folder we used with res.status(200).render(...)):
/*
EJS (Embedded JavaScript) is a templating language used to generate HTML markup dynamically. It is a popular view engine for Node.js that enables developers to write templates with embedded JavaScript code, making it easy to generate dynamic content. EJS allows developers to create reusable templates and fill them with data, which is passed from the server-side to the client-side.

In the context of web development, a view refers to the part of an application that is responsible for rendering the user interface. Views are typically constructed from templates, which define the structure of the page, and data, which is used to populate the page with content. View engines are responsible for rendering views by combining templates and data into HTML markup that can be sent to the client-side for rendering in a web browser.

The render() function is a method used to generate HTML markup from EJS templates. The render() function accepts two arguments, the name of the EJS template to be rendered and an object containing data to be passed to the template. The data object can contain any number of properties, each of which is used to pass a specific value to the template. The render() function returns the generated HTML markup, which can be sent to the client-side for rendering.

Here is an example of how to use EJS to render a template:

First, you need to install EJS using npm:

```
npm install ejs
```

Then, you can create a simple EJS template in a file called `hello.ejs`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello <%= name %>!</h1>
  </body>
</html>
```

In this example, `<%= name %>` is an EJS tag that will be replaced with the value of the `name` property in the data object.

Next, you can use the render() function to generate HTML markup from the `hello.ejs` template:

```javascript
const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    name: 'World'
  };
  res.render('hello', data);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

In this example, we set the view engine to EJS using `app.set('view engine', 'ejs')`. We then define a route for the root path and use the render() function to generate HTML markup from the `hello.ejs` template. The `data` object is passed to the template, and the value of the `name` property is set to `'World'`. The generated HTML markup is sent to the client-side for rendering.

EJS also provides a number of other tags, including conditionals, loops, and includes. These tags make it easy to generate complex HTML markup from simple templates. EJS is a powerful and flexible view engine that can be used to generate dynamic content for a wide range of web applications.
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
/**
This code is likely part of a Node.js application that handles user registration for a web application. Here is what this code is doing:

1. The code extracts the username and password from the request body received from the client. The `trim()` function is used to remove any extra whitespace from the username.

2. The code sends a registration request to the backend API using the `fetch()` method. The API endpoint that the request is being sent to is `http://localhost:80/auth/register`. The `method` parameter is set to `POST`, which means that the request is submitting data to the server.

3. The request header includes the `Content-Type` key-value pair with the value set to `application/json`. This indicates that the request body is in JSON format.

4. The `body` parameter includes the `username` and `password` as key-value pairs in JSON format. This means that the username and password will be sent in the request body as JSON data.

5. The `await` keyword is used to wait for the API response. If the response is `ok`, meaning that the server returned a successful response with a status code in the 200 range, the code parses the response JSON data using the `response.json()` method. The parsed data is then logged to the console using `console.log()`, and the client is redirected to the login page with a 200 status code.

6. If the API returns an error response, the code extracts the error message from the response JSON data using `response.json()`. The error message is then passed to the `render()` method to render an error page with the message. The response status code is set to 404, indicating that the requested resource was not found.

Overall, this code is sending a user registration request to the backend API, handling the response from the API, and responding to the client with appropriate status codes and messages.
*/
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
/*
This code is likely part of a Node.js application that handles user authentication for a web application. Here is what this code is doing:

1. The code extracts the `username` and `password` from the request body received from the client using object destructuring.

2. The code sends a login request to the backend API using the `fetch()` method. The API endpoint that the request is being sent to is `http://localhost:80/auth/login`. The `method` parameter is set to `POST`, which means that the request is submitting data to the server.

3. The request header includes the `Content-Type` key-value pair with the value set to `application/json`. This indicates that the request body is in JSON format.

4. The `body` parameter includes the `username` and `password` as key-value pairs in JSON format. This means that the username and password will be sent in the request body as JSON data.

5. The `await` keyword is used to wait for the API response. The response is expected to be in JSON format.

6. The response from the API is parsed using object destructuring to extract `status`, `message`, and `token`. If the `status` is `success`, then the code sets the token in a cookie and redirects the client to a success page with a 200 status code. If the `status` is not `success`, then the code redirects the client to the login page with an error message and a 401 status code.

7. If the authentication is successful, the code sets the token in a cookie using the `res.cookie()` method. The cookie is set as `secure`, which means that it can only be sent over HTTPS. The `sameSite` parameter is set to `lax`, which means that the cookie can be sent with cross-site requests that are initiated by a top-level navigation (such as clicking on a link), but not with requests that are initiated by a third-party website. The `maxAge` parameter sets the cookie expiry time to 7200000 milliseconds, which is 2 hours.

8. If the authentication is unsuccessful, the code renders the login page with an error message. The `messages` parameter is an array containing the error message received from the API, and it is passed to the `render()` method to display the error message on the login page.

Overall, this code is sending a user authentication request to the backend API, handling the response from the API, setting a token in a cookie if authentication is successful, and responding to the client with appropriate status codes and messages.
*/
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
/*
This code is responsible for handling a GET request to retrieve user and product data for display on an admin dashboard. Here's a breakdown of what it does:

1. It first checks if the JWT token is present in either the request cookies or headers. If it's not present, it renders an error view with a message indicating that the authorization header is missing or invalid.

2. If the token is present, it uses the `jwt.verify()` method to verify the token's authenticity with the secret key stored in the environment variables. If the token is invalid, it renders an error view with a message indicating that the token is invalid.

3. If the token is valid, it checks if the decoded token indicates that the user is an admin. If not, it renders an error view with a message indicating that the user is not authorized to access the admin dashboard.

4. If the user is an admin and the token is valid, it makes two API requests to retrieve user and product data. It sends the token as an authorization header for both requests to authenticate the admin user.

5. It converts the response data from both requests to JSON format using the `response.json()` method.

6. It then passes the retrieved user and product data to the `user.ejs` view for rendering using the `res.render()` method.

7. If there's any error during the API request or data retrieval process, it logs the error to the console using `console.error()`.
*/
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

/*
This code block is a server-side controller function that handles a PUT request to edit a user's details in the admin dashboard. 

The function first creates a `data` object that holds the updated password and role information received from the request body.

Then, it sends a PUT request to the server at the specified route (`/admin/dashboard/edit/:id`) with the `data` object as the request body. The request also includes an authorization header with a JWT token for authentication.

If the response from the server is `ok`, the function renders a `success` view with a message indicating that the user's details were successfully edited and a token. If there is an error, the function renders an `error` view with a message indicating an internal server error.

Overall, this function provides a way for authorized users to edit user details in the admin dashboard.
*/

app.post('/admin/dashboard/edit/:id', checkToken, (req,res)=>{ //Route to handle editing of user details. checkToken is middleware that verifies a user's token

  let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token; //Assign the token to a variable
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1]; //Assign the token to a variable
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { //Verify the token using the JWT_SECRET env variable
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) { //if decoded token isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here to handle editing of user details
      const data = {password: req.body.password, role: req.body.role} //Create a data object to hold user details
      try {
        fetch(`http://localhost:80/admin/dashboard/edit/${req.params.id}`,{
          method: "PUT", //Make a PUT request to the server
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}` //Set the authorization header
          },
          credentials: 'include',
          body: JSON.stringify(data) //Send the data object as JSON in the request body
        }).then(response=>{
          if(response.ok){ //If response is okay
            res.status(200).render('success', {message: "Successfully edit user", token: token}); //render a success message and send a 200 response status code
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

app.post('/admin/dashboard/delete/:id', checkToken, (req,res)=>{ //HTTP POST request made to '/admin/dashboard/delete/:id' route with checkToken middleware function
  let token; //Declare a variable named token

  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token; //If token is found in cookies, assign it to token variable
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1]; //If token is found in headers, assign it to token variable
  }

  if (!token) { //If token is not found
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); //Render an error message and send a 401 response status code
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { //Verify the token using the JWT_SECRET
    if (err) { //If there is an error in verification
      return res.status(401).render('error',{ message: 'Invalid token' }); //Render an error message and send a 401 response status code
    }

    if (!decodedToken.isAdmin) { //If decodedToken's isAdmin field is not true
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //Render an error message and send a 403 response status code
      }

      //Code here
      /*
      This code attempts to send a DELETE request to a specified URL to delete a user. It includes the authorization token in the request header and sets the Content-Type header to `application/json`. The `credentials` option is set to `include`, which allows cookies and authentication headers to be sent in cross-origin requests.
      If the response status code is ok (i.e., 200-299), the code renders a success message and sends a 200 response status code. Otherwise, it renders an error message and sends a 500 response status code. Any errors that occur during the fetch request are caught and handled by rendering an error message and sending a 500 response status code.
      */
      try { //Try to execute the following code
        fetch(`http://localhost:80/admin/dashboard/delete/${req.params.id}`,{ //Make a fetch request to the specified URL
          method: "DELETE", //Set the method to DELETE
          headers:{
            'Content-Type' : 'application/json', //Set the Content-Type header to application/json
            'Authorization' : `Bearer ${token}` //Set the Authorization header to the token
          },
          credentials: 'include' //Include credentials
        }).then(response=>{ //When response is received
          if(response.ok){ //If the response status is ok
            res.status(200).render('success', {message: "Successfully delete user", token: token}); //Render a success message with a 200 response status code
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); //Render an error message and send a 500 response status code
          }
        }).catch(error =>{ //If there is an error
          return res.status(500).render('error',{ message: 'Internal server erorr' }); //Render an error message and send a 500 response status code
        })


      } catch (error) { //If there is an error
        return res.status(500).render('error',{ message: 'Internal server erorr' }); //Render an error message and send a 500 response status code
      }

    });
})


app.post('/admin/adduser', checkToken, (req,res)=>{ //Declaring a POST route at endpoint '/admin/adduser', with checkToken middleware and callback function taking request and response objects

  let token; // Declaring a variable token to store token value

  if (req.cookies && req.cookies.token) { // Checking if token is available in the cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // Checking if token is available in the headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) { // If token is not available, then handle unauthorized access with 401 status code and render error page with a message
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { // Verify the token and decoding it
    if (err) { // If error, handle unauthorized access with 401 status code and render error page with a message
      return res.status(401).render('error',{ message: 'Invalid token' });
    }

    if (!decodedToken.isAdmin) { // Checking if the user is an admin or not, based on the decodedToken object
      return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); // Render an error message and send a 403 response status code
    }

    //Code here
    /*
    This is a JavaScript code snippet that makes a POST request to an endpoint `/admin/adduser` with fetch API. The request body is taken from the `req.body` object, which is stringified as a JSON object. The request headers include the `Content-Type` header set to `application/json` and the `Authorization` header with a token value. The `credentials` option is set to `include` to include cookies and credentials in the request. 
    If the response status code is 200, a success page is rendered with a success message and token. Otherwise, an error message is rendered with a 500 status code. If there's an error while making the request, an error message is rendered with a 500 status code.
    */
    const data = {username: req.body.username, password: req.body.password, role: req.body.role} // Creating an object to hold the user data from request body
    try {
      fetch('http://localhost:80/admin/adduser',{ // Making a POST request to the endpoint with fetch API
        method: "POST", // Request method is POST
        headers:{
          'Content-Type' : 'application/json', // Request header content type is JSON
          'Authorization' : `Bearer ${token}` // Authorization header value with token
        },
        credentials: 'include', // Request credentials is set to include
        body: JSON.stringify(req.body) // Request body as a JSON stringified version of the req.body object
      }).then(response=>{
        if(response.ok){ // If the response status code is 200, render success page with message and token
          res.status(200).render('success', {message: "Successfully added a new user", token: token});
        }
        else{ // If the response status code is not 200, handle the error with 500 status code and render error page with a message
          return res.status(500).render('error',{ message: 'Internal server error' });
        }
      }).catch(error =>{ // If there's an error while making the request, handle the error with 500 status code and render error page with a message
        return res.status(500).render('error',{ message: 'Internal server error' });
      })


    } catch (error) { // If there's an error, handle the error with 500 status code and render error page with a message
      return res.status(500).render('error',{ message: 'Internal server error' });
    }

  });
})

app.get('/admin/addgame', checkToken, (req,res)=>{ //define a route with endpoint /admin/addgame which accepts GET requests, and a middleware checkToken, and a callback function with request and response objects as parameters
    
  let token; //declare a variable to store token

  if (req.cookies && req.cookies.token) { //check if token exists in the cookies
    token = req.cookies.token; //if token exists, assign it to the token variable
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { //if token is not found in the cookies, check the authorization header for token
    token = req.headers.authorization.split(' ')[1]; //if token is found in the authorization header, split the header string and assign the token to the token variable
  }

  if (!token) { //if token is still undefined after checking both cookies and headers
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); //return a 401 status error with a message of Authorization header missing or invalid
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { //verify the token with jwt.verify
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); //if token is invalid, return a 401 status error with a message of Invalid token
    }

    if (!decodedToken.isAdmin) { //if decoded token is not admin
      return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //return a 403 status error with a message of Access denied. User is not an admin
    }

    //Code here - this is where the code to handle the route will be placed

    return res.status(200).sendFile(path.join(__dirname, 'public', 'admin', 'addgame.html')) //send the addgame.html file located in public/admin folder when there is a successful response

    })
})

app.post('/admin/addgame', checkToken, (req,res)=>{ //handles POST request to '/admin/addgame' route and requires checkToken middleware
   let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token; //if token is present, assign it to the token variable
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1]; //if token is present, assign it to the token variable
  }

  if (!token) {
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); //if token is not present, render an error message and send a 401 response status code
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { //verifies the token using the JWT_SECRET and decodedToken contains the decoded token
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); //if token is invalid, render an error message and send a 401 response status code
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
      }; //assigning the request data to data variable

      console.log(data); //logs the data to console
      /*
      This is a code snippet that is handling a POST request to add a new game to the server. The data for the new game is obtained from the `req.body` object and assigned to a `data` variable. 

      Then, a `fetch` request is sent to the server at the `/admin/addgame` route using the `POST` method. The request includes the `Content-Type` and `Authorization` headers, and the `credentials` option is set to `'include'`. The `body` of the request is set to the `data` variable stringified to JSON.

      The response is then checked to ensure that the status is ok, and the response JSON is parsed. If successful, a success message is rendered with a 200 response status code. If an error occurs, the error is logged to the console.
      */

      fetch('http://localhost:80/admin/addgame', { //send a fetch POST request to server at http://localhost:80/admin/addgame route
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
          console.log(data); //log the response data to console
          res.status(200).render('success', { message: 'Product successfully added', token }); //render a success message and send a 200 response status code
        })
        .catch((err) => console.error(err)); //if an error occurs, log the error to console
      });

})

//Put game
app.post('/admin/dashboard/game/edit/:id', checkToken, (req,res)=>{ // Handle POST request to edit a game with the given id

   let token;

  if (req.cookies && req.cookies.token) { // Check if token exists in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // Check if token exists in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) { // If no token is present
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // Render an error message and send a 401 response status code
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { // Verify the token using JWT and the secret key
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // Render an error message and send a 401 response status code if the token is invalid
    }

    if (!decodedToken.isAdmin) { // Check if the decoded token isAdmin field is false
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); // Render an error message and send a 403 response status code
      }

      //Code here
      /*
      This code sends a `PUT` request to the server at the specified URL with the given data in JSON format. It sets the headers with the `Content-Type` as `application/json` and the `Authorization` header with the token value. It also sets the credentials to `include`.
      If the response is successful (`response.ok` is true), it renders a success message with a 200 response status code. Otherwise, it renders an error message with a 500 response status code. If there is an error while making the request, it also renders an error message with a 500 response status code.
      */
      try {
        fetch(`http://localhost:80/admin/dashboard/game/edit/${req.params.id}`,{
          method: "PUT",
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}` // Set the Authorization header with the token value
          },
          credentials: 'include',
          body: JSON.stringify(req.body) // Set the request body with the given data in JSON format
        }).then(response=>{
          if(response.ok){
            res.status(200).render('success', {message: "Successfully Edit product", token: token}); // Render a success message and send a 200 response status code if the response is ok
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); // Render an error message and send a 500 response status code
          }
        }).catch(error =>{
          return res.status(500).render('error',{ message: 'Internal server erorr' }); // Render an error message and send a 500 response status code if there is an error
        })
      } catch (error) {
        return res.status(500).render('error',{ message: 'Internal server erorr' }); // Render an error message and send a 500 response status code if there is an error
      }

    });
})


//DELETE GAME
app.post('/admin/dashboard/game/delete/:id', checkToken, (req,res)=>{ //a POST request route that requires an id parameter and checkToken middleware function
   let token; //declare a variable token to hold token value
  
  if (req.cookies && req.cookies.token) { //check if cookies and token value exist
    token = req.cookies.token; //assign token value
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1]; //split the token value from the Authorization header
  }

  if (!token) { //if token is not present or undefined
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // render an error message and send a 401 response status code
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { //verify the token with JWT_SECRET
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // render an error message and send a 401 response status code if token is invalid
    }

    if (!decodedToken.isAdmin) { //check if decoded token isAdmin field is false
        return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); //render an error message and send a 403 response status code
      }

      //Code here
      /*
      This code sends an HTTP DELETE request to the server at the specified route (`http://localhost:80/admin/dashboard/game/delete/${req.params.id}`). It includes the token in the Authorization header and indicates that credentials should be included in the request (i.e., cookies and authorization headers). 
      If the response status code is OK (i.e., 200), it renders a success message with a 200 response status code and the token value. Otherwise, it handles the error and sends a 500 response status code.
      */
      
      try {
        fetch(`http://localhost:80/admin/dashboard/game/delete/${req.params.id}`,{
          method: "DELETE", //HTTP DELETE request method
          headers:{
            'Content-Type' : 'application/json', //specify that the request body is in JSON format
            'Authorization' : `Bearer ${token}` //set the Authorization header to the token value
          },
          credentials: 'include' //indicate that the request should include credentials such as cookies, authorization headers
        }).then(response=>{
          if(response.ok){ //if the response status is OK
            res.status(200).render('success', {message: "Successfully Delete product", token: token}); // render a success message with a 200 response status code and token value
          }
          else{
            return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error and send a 500 response status code
          }
        }).catch(error =>{
          return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error and send a 500 response status code
        })
      } catch (error) {
        return res.status(500).render('error',{ message: 'Internal server erorr' }); // handle error and send a 500 response status code
      }

    });
})



// Handles GET requests to the '/store/browse' endpoint
app.get('/store/browse', async (req,res)=>{
    // Send a GET request to the 'http://localhost:80/store/browse' endpoint
    const response = await fetch('http://localhost:80/store/browse');
    // Extract the JSON data from the response
    const data = await response.json();
    // Render the 'catalogue' view, passing in the 'data' as the 'product' variable
    res.render('catalogue', {product: data})
})

// Handles GET requests to the '/store/browse/:id' endpoint
app.get('/store/browse/:id', async (req,res)=>{
    // Send a GET request to the 'http://localhost:80/store/browse/:id' endpoint
    // (where :id is a parameter in the URL path)
    const response = await fetch(`http://localhost:80/store/browse/${req.params.id}`,{
        headers:{
            'Content-Type': `application/json`
        }
    });
    // Extract the JSON data from the response
    const data = await response.json();
    // Render the 'product' view, passing in the 'data' as the 'product' variable
    res.render('product', {product: data})
})

// Handles GET requests to the '/admin/dashboard/game/edit/:id' endpoint
app.get('/admin/dashboard/game/edit/:id', checkToken, async (req,res)=>{
    // Send a GET request to the 'http://localhost:80/admin/product/:id' endpoint
    // (where :id is a parameter in the URL path)
    const response = await fetch(`http://localhost:80/admin/product/${req.params.id}`,{
        headers:{
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${req.cookies.token}`
        },
        credentials: 'include'
    })
    // Extract the JSON data from the response
    const data = await response.json();
    // Render the 'editGame' view, passing in the 'data' as the 'product' variable
    res.render('editGame', {product: data});
})

// Handles GET requests to the '/store/search' endpoint
app.get('/store/search', async (req,res)=>{
    // Send a GET request to the 'http://localhost:80/store/search' endpoint
    const response = await fetch('http://localhost:80/store/search',{
        headers:{
            "Content-type": `application/json`
        }
    })
    // Extract the JSON data from the response
    const data = await response.json();
    // Render the 'search' view, passing in the 'data.product' as the 'product' variable
    res.status(200).render('search', {product: data.product});
})


//From backend cart routes

//For user cart (We will use authentication middleware later)
// routes.get('/cart', checkJWT, getCart); //Retrieve cart via decoded user id
// routes.post('/cart/:id', checkJWT, addToCart); //Add item with specific id to cart
// routes.put('/cart/update/:id', checkJWT, putCart); //Change quantity of specific item in the cart
// routes.delete('/cart/delete/:id', checkJWT, deleteCart); //Delete product with ID from the cart

// This code handles GET requests for the '/store/cart' endpoint, after checking for a valid JWT token.
app.get('/store/cart', checkToken, async (req, res) => {
  let token;

  // Check if the token is present in cookies.
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // If token is not present in cookies, check for it in the 'Authorization' header of the request.
    token = req.headers.authorization.split(' ')[1];
  }

  // If token is still not present, return an error response.
  if (!token) {
    return res.status(401).render('error', { message: 'Authorization header missing or invalid (401)' });
  }

  // Verify the JWT token using the JWT_SECRET specified in the environment variables.
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    // If the token is invalid or expired, return an error response.
    if (err) {
      return res.status(401).render('error', { message: 'Invalid token' });
    }

    // Extract the user ID from the decoded token.
    const userID = decodedToken.id;

    try {
      // Fetch the user's cart from the store API.
      const response = await fetch(`http://localhost:80/store/cart?uid=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // If the response is not OK, throw an error.
      if (!response.ok) {
        throw new Error('Error retrieving cart');
      }

      // Parse the response data.
      const data = await response.json();
      const { cartItems, totalSum, user } = data;
      
      // Render the 'cart' view with the cart data and the JWT token.
      res.render('cart', { cartItems, totalSum, user, token });
      
    } catch (error) {
      // If there is an error, log it and return an error response.
      console.error(error);
      res.status(500).render('error', { message: 'Internal server error' });
    }
  });
});


/*



*/

app.post('/store/cart/:id', checkToken, async (req,res)=>{ //post request to add item to cart
  const data = { quantity: req.body.quantity }; //extracting quantity from request body
  let token;

  if (req.cookies && req.cookies.token) { // check if token is present in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check if token is present in authorization headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) { //if token is not present
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); // return unauthorized access error
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { //verify the token
    if (err) { //if token is invalid
      return res.status(401).render('error',{ message: 'Invalid token' }); // return unauthorized access error
    }
    const userID = decodedToken.id; //get user ID from decoded token

    //Code here (what does this code block do? It's not clear from the provided code.)

    //Send POST request to add item to cart
    fetch(`http://localhost:80/store/cart/${req.params.id}?uid=${userID}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` //set authorization header
    },
    body: JSON.stringify(data) //set request body
  })
  .then(response=>{
    if(response.ok){ //if request is successful
      res.status(200).render('success', {message: 'Successfully added to cart.', token: token}); //return success message with token
    }
    else{ //if request is not successful
      res.status(404).render('error', {message :"No product error"}) //return error message
    }
  })
  .catch(err=>{
    res.status(500).render('error', {message : "internal server error"}) //return error message if an error occurs while fetching
  })

    })
})


app.post('/store/cart/update/:id', checkToken, async (req,res)=>{ // Define a route for updating the cart with a given id, that requires authentication and authorization using JWT token
  const data = { quantity: req.body.quantity }; // Define a variable that holds the quantity of the cart items received from the request body
  let token;
  if (req.cookies && req.cookies.token) { // Check if the token is present in cookies
    token = req.cookies.token; 
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // Check if the token is present in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) { // If token is not present, return an error message with status code 401
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' }); 
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { // Verify the token using JWT_SECRET
    if (err) { // If token is not valid, return an error message with status code 401
      return res.status(401).render('error',{ message: 'Invalid token' }); 
    }
    
    const userID = decodedToken.id; // Extract the user ID from the decoded token

    //Code here
    // The code here should contain the logic to update the cart for a given user ID and product ID

    fetch(`http://localhost:80/store/cart/update/${req.params.id}?uid=${userID}`,{ // Make a PUT request to update the cart with the given product ID and user ID
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Set the authorization header with the token
    },
    body: JSON.stringify(data) // Set the request body with the cart item quantity
  })
  .then(response=>{
    if(response.ok){ // If the response status code is OK, render a success message with status code 200 and the token
      res.status(200).render('success', {message: 'Successfully edit the cart.', token: token});
    }
    else{ // If the response status code is not OK, render an error message with status code 404
      res.status(404).render('error', {message :"No product error"})
    }
  })
  .catch(err=>{ // If there is an error in the request, render an error message with status code 500
    res.status(500).render('error', {message : "internal server error"})
  })

    })
})

app.post('/store/cart/delete/:id', checkToken, async (req, res) => { // handle POST request for deleting an item from cart with authorization check

  let token;

  if (req.cookies && req.cookies.token) { // check if token exists in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check if token exists in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) { // if no token found in cookies or headers, return unauthorized error
    return res.status(401).render('error',{ message: 'Authorization header missing or invalid (401)' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => { // verify the token using the JWT_SECRET
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // if token is invalid, return unauthorized error
    }
    
    const userID = decodedToken.id; // get the user ID from the decoded token

    //Code here

    // fetch request to delete item from cart with the specified id
    fetch(`http://localhost:80/store/cart/delete/${req.params.id}`,{
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // add authorization header to the request
      }
    })
    .then(response => {
      if(response.ok) { // if response is successful, render success page
        res.status(200).render('success', {message: 'Successfully delete from cart.', token: token});
      }
      else { // if no product found with the specified id, render error page
        res.status(404).render('error', {message :"No product to delete error"})
      }
    })
    .catch(err => { // if there is any internal server error, render error page
      res.status(500).render('error', {message : "internal server error"})
    })

  })
})


//Define a function to handle successful payment requests.
const getSuccess = (req,res,next)=>{
    res.status(200).render('successpay',{message: "Your process has been successfully ordered", token: req.cookies.token});
}

//Define a function to handle cancelled payment requests.
const getCancelled = (req,res,next) =>{
    res.status(400).render('cancel', {message: "Your process has been cancelled"});
}

//Define a function to delete a user's payment data and verify the user's authorization.
const wipe = (req,res,next) =>{
    let token;

    //If there is a cookie with a token, assign it to the token variable.
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    //If the Authorization header exists and starts with 'Bearer', assign the token after 'Bearer' to the token variable.
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    //If no token is found, return an error message.
    if (!token) {
        return res.status(401).render('error', { message: 'Authorization header missing or invalid (401)' });
    }

    //Verify the token and decode the user's ID.
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        //If the token is invalid, return an error message.
        if (err) {
            return res.status(401).render('error', { message: 'Invalid token' });
        }

        //Get the user's ID from the decoded token.
        const userID = decodedToken.id;

        try {
            //Send a DELETE request to the server to delete the user's payment data.
            const response = await fetch(`http://localhost:80/pay?uid=${userID}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            //Call the next middleware function.
            next();
            
        } catch (error) {
            console.error(error);
            //If an error occurs, return an error message.
            res.status(500).render('error', { message: 'Internal server error' });
        }
    });
}

//Define routes for successful and cancelled payment requests, including middleware functions.
app.get('/pay/success', checkToken, wipe, getSuccess)
app.get('/pay/cancel', getCancelled)

//404 Error not found page
app.all('*', (req,res)=>{ //Handles all requests made to the server
    res.status(404).sendFile(path.join(__dirname, 'public' ,'404.html')); //Sends a 404 status code and serves the 404.html page present in the public directory
});

app.listen(3000, ()=>{ //Starts the server on port 3000 and listens for incoming requests
    console.log('Frontend is listening on port 3000'); //Logs a message to the console indicating that the frontend is listening on port 3000
})

/*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢆⡱⢫⡟⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⢿⣻⢿⣟⡿⡤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠠⠀⢂⡘⢦⡳⣏⣾⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣞⣿⣳⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠐⠈⣌⢣⡑⢦⣙⢮⣳⢻⡾⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣾⢷⣿⢯⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣌⡳⢈⡒⡌⡖⣭⢺⡭⣞⡥⣏⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣟⡾⣏⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡈⢑⡣⢜⡜⡱⣌⢧⡽⣲⣽⢻⣾⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣽⣻⡽⣷⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠁⠂⠐⢈⠐⡡⠊⢎⡳⣟⠾⣝⡾⣛⣾⢳⢯⡻⡝⣯⢟⡿⣻⢿⣟⡿⣟⣿⢻⠿⡿⣿⢿⡿⣿⣿⢿⣾⣿⣿⣷⡿⣽⣳⠭⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠐⣸⢮⣷⡱⣭⣞⡵⣏⢿⡱⣏⠷⣎⣟⢮⢳⡙⡴⢋⡴⢩⠞⡼⡙⢮⠘⣉⠣⡙⠤⢋⡹⢱⠫⣟⢿⣽⣿⣟⣿⣯⣟⡷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠂⢭⣻⣽⣿⡷⣯⢻⣜⣣⢟⣼⡻⣝⣮⣛⢦⡙⡖⢣⠜⣡⠚⡔⣩⠂⢇⢢⠱⡱⢌⡒⠤⡃⠵⣈⠞⣽⣾⣿⣿⣽⣯⠷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠠⣈⣶⣽⣾⡿⣽⢏⡷⣎⢷⣫⠾⣽⣹⢶⡹⣎⡵⣍⢳⢪⢅⡫⠴⣡⢋⡜⢢⢣⡑⢎⡸⢐⡉⢖⡡⢚⡜⣯⣿⣿⣯⣟⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡸⣟⣿⡿⣽⣻⢎⣷⡹⣎⣷⣛⣧⢯⣗⡻⣜⡞⣬⢇⡳⢊⡕⢣⢆⢣⠜⣡⠆⡍⢦⠡⠣⠜⢢⡑⢣⢜⣱⢯⣿⢿⡽⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣁⢷⣻⣯⢿⣯⢷⣛⠶⣝⣳⢾⣹⢮⢷⡺⣝⢧⡻⣔⢫⡔⢫⠜⡡⢎⢎⡜⢢⡙⡜⠤⢋⡅⣋⠦⡙⢆⢮⡹⣟⣾⣿⡻⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠰⢬⢏⣷⡿⣟⣮⢳⣭⢻⣭⣟⣯⣿⣯⣿⣷⣯⣿⣳⣮⣳⣜⢣⢎⡱⢎⡖⣸⢡⠚⣄⠫⠔⡘⡔⢢⠍⢎⢲⡹⣽⢾⡷⣟⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡉⢆⢫⣞⢿⡝⣮⢳⢮⣟⣼⢻⣞⡷⢯⡳⣏⢿⡻⣟⡿⣷⢯⣟⣎⠖⣭⢞⡵⣎⡵⣂⠧⣙⠰⣉⠦⡙⡌⢶⣹⢯⣟⣿⡱⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡐⢬⢷⡞⣯⡝⣮⢏⣷⣚⣮⢷⣻⣾⣿⣷⣿⣞⣷⣯⣟⣿⣻⡾⣝⠎⡜⢯⡾⣿⣽⢿⣻⣮⢷⡜⣦⣑⢚⢦⣻⣯⡿⣞⠥⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⡄⢫⠞⡑⢊⠱⠉⠞⣲⣛⠾⣏⡿⣹⢾⡹⢣⢏⠾⣽⣻⢾⣽⣻⢭⡚⣌⢣⢛⣷⣯⣿⣧⡝⣎⡝⠶⡭⡞⢦⣻⣯⢿⡉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠰⣎⡷⣞⣧⡚⠀⠀⠀⠀⡘⠴⣩⠿⣜⣳⡱⢎⡵⣋⢮⡟⣷⢯⣟⣾⢣⠷⡱⢌⠦⡙⣎⠿⣹⠻⡟⣷⢾⡱⢣⠝⡲⢯⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢌⣻⣽⣻⡽⣶⡹⠄⠀⢌⠰⣌⡳⣝⣯⢳⡧⣝⣏⢶⡹⣎⡿⣽⣻⢾⣝⡯⢏⡵⢊⠖⡱⢌⡚⢥⠓⡜⢤⠣⡙⢥⢋⡵⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⢳⣳⢯⣟⡾⣝⢦⠈⣂⠳⡜⣽⢺⡼⣳⡽⣞⣼⣳⢿⣹⣟⡷⢯⣛⣮⡝⣮⠰⣉⢎⡱⠌⡜⢢⡙⡜⢢⡑⡩⢆⢣⢺⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠡⢏⡿⣾⣽⢫⣮⡑⠤⡛⣼⢣⡯⣗⡯⢷⣛⡾⣽⣞⣷⣻⣾⢿⡿⣷⢿⣞⣳⣵⢪⠴⡩⢜⠡⡒⠌⡥⢒⡱⢊⢆⠯⣼⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠭⢳⢧⣛⡧⣷⣙⢦⡙⣦⢏⡷⣹⢞⡯⣯⣽⢳⣞⡷⣯⣟⣯⠿⣝⠻⡜⡭⠻⣍⠚⡵⣊⠵⣡⢋⡔⢣⠜⣡⠞⡰⢭⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠾⣱⠿⣼⡹⢮⡱⣎⠿⣜⢧⢯⣳⠷⣭⣟⡾⡽⢧⣻⣜⠳⣌⠳⡩⠔⢣⠌⡓⢬⢃⡞⢤⠣⡜⢣⡙⣤⢛⡥⢫⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠠⢉⢧⡳⣭⢻⡜⣯⢞⣵⣻⣳⢯⡾⣽⢯⣷⣞⣷⣬⣳⡹⣌⠣⡜⢱⢊⠖⡸⢂⡳⢌⢣⠜⡰⣋⠖⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⢦⡻⣜⢧⣻⡜⣯⢞⡵⣯⣿⣿⣿⣿⣿⣾⣽⣾⣽⣿⣽⣷⣎⡕⡪⢜⡡⢓⡜⡌⢦⡙⡔⠡⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢉⠲⣝⢮⡳⢧⡻⣜⢯⡽⣳⡽⣞⣯⣟⡻⣙⢛⠻⣻⢿⡿⣟⢯⡛⡕⢪⠔⡣⢜⡘⠆⠱⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢪⠔⡹⢮⡝⣧⢻⡜⣧⢻⡵⣛⣾⢳⣯⢷⣹⢮⡗⣧⢛⡼⢌⠦⡑⢮⡑⢎⡱⢊⠔⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⢞⡡⣛⡼⣣⢟⡼⣣⠿⣜⠿⣼⣻⣞⣯⢷⣻⣼⢣⢏⡲⣉⠖⡩⢆⡙⢦⠱⡉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢭⡚⣵⢣⡟⣵⢯⣞⡵⣻⢭⡟⡶⣓⠮⡜⢭⡒⣍⠣⢎⠴⡡⢎⡕⢪⡑⢎⡱⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⢟⡼⣣⢿⡹⡾⣼⣹⢧⡟⣾⣱⢏⡷⣙⢦⡱⢌⠳⣌⠲⡑⢎⡜⡥⡙⢦⡑⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠭⣞⡵⣛⡮⣗⢿⣱⢯⠾⣝⡾⣭⣟⡾⣵⢮⣱⢋⠶⣈⢧⣙⠲⣜⡡⢝⢢⡹⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡹⢎⡷⣫⢷⣹⡞⣧⢟⣻⡽⣽⣳⢯⡿⣽⣞⡷⣯⢻⡭⢶⢩⠓⢦⡙⢬⠲⣑⢻⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⠱⣏⡞⣷⢫⣶⢻⡼⣫⣗⢯⡷⣯⠿⣽⠳⢯⡝⣎⢳⡙⢎⡲⡙⢦⡙⢦⡙⠤⠈⣿⣿⣿⣷⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠄⠛⠼⡙⢞⠻⡜⡳⢏⠷⣞⣻⡼⢧⡻⣜⢫⠖⣜⡸⢆⡝⣪⢕⡹⢦⡙⢦⡙⠆⠀⢾⣿⣿⣿⣿⣿⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠌⣀⡾⡀⢄⡀⠀⠀⠀⠈⣈⠀⣈⣟⣧⢻⣌⢳⡚⡴⢣⢏⡼⣡⢎⡵⢪⡱⢣⡝⠠⠀⢺⣿⣿⣿⣿⣿⣿⣿⣿⣭⡳⣖⡤⣄⣠⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠄⡌⠀⠀⠌⢢⣝⣣⠷⣌⢯⡻⣝⢯⣟⢧⡛⣵⣻⣼⡳⣎⢷⣹⢣⠟⣜⡲⡱⢎⡜⣣⢽⡓⠄⠀⠀⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣱⣳⣎⡷⣯⣛⡷⣚⡴⣠⢄⣀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡔⢤⢃⡜⢤⣉⠒⡀⠀⢈⠜⢤⡿⣜⣯⠽⣎⡳⡭⢞⢮⡳⣙⢾⣳⢯⡿⣽⡺⣵⢫⡟⢦⢳⡙⢮⣜⡷⡋⠔⠀⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣞⣿⣽⣯⣟⡷⣽⡖⣯⢾⣹⣞⣵⣲⢦⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⣄⢢⢵⣸⡼⣧⣻⣜⠧⢦⣉⠀⠀⠰⣈⠲⣟⡹⣎⠿⣼⡹⣝⣫⠶⣍⠧⣻⡽⣯⣟⣷⣻⡵⣻⡜⣯⢇⣿⣳⢏⠇⠡⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣷⣿⣿⣿⣳⣿⡾⣽⣻⣾⣽⣳⢯⣟⡶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢀⢡⡘⣌⡟⣼⣿⣿⣿⣿⣼⡟⡄⢀⠀⠀⡁⠀⢡⣏⡘⣏⠛⣤⢹⡌⣧⢋⡙⣌⢡⣿⣡⢻⡜⣇⣿⢡⢻⣸⢻⡜⢡⠈⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣿⣿⣿⣿⣿⣏⡟⣧⣼⢹⡟⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠄⢢⡱⣜⣮⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡱⣃⠀⢀⠐⠈⢠⣯⠵⣯⡻⣵⢫⡞⣵⢫⠷⣌⢻⡶⣯⢿⣽⣻⣞⣯⢿⡽⡏⢎⠁⠂⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣷⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⡄⢢⠱⣤⢫⣷⣽⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣛⡄⠀⠀⡌⢀⠰⣏⢿⡱⣟⡼⢧⡻⣜⢯⡳⣌⢳⡿⣽⣻⡾⣷⣻⢾⢏⠓⡁⠂⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠠⡐⡌⢤⠳⣜⣣⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡷⡌⠀⠐⢨⠀⡜⣿⣺⢽⣺⡝⣧⣻⠼⣧⣛⠤⣫⣟⣷⢿⡽⡷⢏⠋⠄⠃⢀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⡘⣤⠳⡼⣜⣷⣻⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢀⠣⡘⢸⣷⢯⣛⡶⣏⠷⣭⢟⡶⢭⣚⣱⢿⣞⢯⠹⡑⠊⠌⠐⠀⠀⠀⠀⠀⠀⠠⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣶⡽⣞⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢄⠓⡌⢳⣿⢯⣝⠾⣭⣻⢧⣻⡼⢧⡳⠘⡏⠜⢂⠡⠐⠡⠈⠀⠀⠀⠀⠀⠀⠐⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠐⣌⢘⡰⠉⢞⡛⠎⠛⠱⠋⠉⠑⠙⠋⠓⠡⢎⠘⣀⠂⡁⠂⠠⠀⠀⠀⠀⠀⢄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⢡⣂⡶⣤⣳⣼⣟⣶⣳⡾⣴⣦⣤⣤⣖⡴⣎⢧⡛⣤⣒⡄⡁⠀⠀⠀⠀⠀⡈⡔⣋⢟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣛⢏⡻⠹⣿⠁⠁⠹⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣴⣦⣼⣷⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢐⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣷⡔⠀⠀⠀⠀⢁⣰⣎⣴⣈⣦⡑⣬⢡⡉⢌⠈⣁⠫⣙⠹⣋⠟⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢻⠟⡝⠀⠀⠀⠀⠀⠿⡿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣷⣾⣾⣾⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⡳⣼⡱⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣧⣾⡔⠈⠀⠄⠀⢀⡸⣄⣄⣊⣄⢂⡡⢉⠜⣩⠋⠟⡛⠟⡿⠿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢞⣵⣳⢏⡷⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡿⢆⠁⠀⠀⠀⠂⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣼⣷⣮⣷⣼⣳⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣫⢾⣽⣻⢼⡱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣦⣓⡆⢀⠦⣄⠀⡀⢰⡠⡑⣨⠉⡝⢩⠛⣛⠻⡛⠿⠿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⢿⣳⣟⣮⢳⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⡛⢿⣿⣿⣿⣿⣿⣿⣿⡗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢇⠠⢈⠀⢂⠰⣿⣷⣿⣷⣿⣿⣷⣿⣶⣷⣽⣮⣵⣜⣶⡴⣮⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢿⡽⣾⡹⢾⣿⣿⣿⣿⣿⣿⡿⢣⣛⠜⡠⢉⠿⣿⣿⣿⣿⣿⡦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡽⣌⠆⡐⢀⡈⠄⠂⠭⡙⢋⠟⡛⢟⠻⢟⠿⢿⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢿⡽⣧⢻⡹⣿⣿⣿⡿⣟⠣⣍⠣⢜⢢⡑⢦⣜⡽⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢆⣠⢀⢀⡈⢤⣷⣯⣿⣮⣷⣮⣷⣬⣮⣤⣳⣌⣦⣱⣊⡵⣩⢟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⢾⣻⣽⢣⡳⡹⢿⡿⣵⢊⡱⢠⡍⢦⣣⣟⡿⣾⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣙⠦⣹⣯⣀⡘⡿⢻⠿⡻⢿⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢿⡽⣾⢯⣗⣯⢯⡝⣆⠳⣜⢧⡟⣷⣻⣾⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣯⡗⣯⣜⣿⣴⣧⣮⣵⣎⡶⣤⣃⣆⢦⡱⣨⢱⡩⢍⣋⢟⡹⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢯⣿⣽⣻⢾⣝⡾⣽⢎⡷⣈⠎⡝⣎⢟⣿⣿⣿⣿⣿⣿⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⡙⣿⢸⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣾⣿⣷⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣞⡷⢯⣟⡾⣽⣳⡟⡶⣥⢚⡘⣤⢋⠾⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣧⣙⡯⢜⣳⣌⡖⣌⢦⣡⢋⡜⡩⢍⢫⡙⣋⠟⡛⢟⡻⢟⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢷⣯⣟⣳⢎⡳⢧⣏⠿⣽⢖⡯⣞⡶⣍⢏⣿⣿⣿⣿⣿⣿⣿⣿⣧⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠧⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⣼⣷⣽⣶⣳⣮⣷⣾⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣾⣽⣻⢮⡱⢫⡜⣹⢎⡽⢺⡵⢻⡜⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢤⡛⣷⢸⡏⣍⢫⠝⣋⠟⡹⢛⠻⡛⢿⠻⠿⢿⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢯⣿⡽⣧⣻⡕⣮⡱⢎⡔⢣⢚⡕⢺⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣝⡷⢺⣿⣾⣿⣿⣾⣽⣷⣯⣷⣽⣦⣽⣜⣦⣳⣌⡶⣰⣎⡼⣧⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢯⣿⣽⢯⡷⡙⢦⢻⡜⣬⡓⣎⡜⣣⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀
⠀⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⡼⣯⢹⡟⢿⠻⡟⠿⡿⢿⢿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⢫⣟⡯⣟⢾⡹⣏⠳⣉⠢⡙⡟⣶⡹⢆⡿⣱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀
⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡼⣧⢻⣽⣶⣷⣮⣷⣼⣎⣦⣵⣢⢦⡱⣌⣣⢍⡹⣩⠛⣝⣫⢟⡿⣻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣫⢞⡵⣋⠶⡱⣍⠳⢄⠢⢱⡙⢦⡙⢮⡜⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣖⠀⠀⠀⠀⠀⠀
⠀⠰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣹⢧⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣾⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⡼⣝⢮⡱⢎⡵⣊⡕⣣⢎⡳⣌⢇⠾⣱⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀
⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢺⣧⢿⣳⣜⣦⣕⢮⣡⢏⣭⢫⡝⣋⠟⡛⡟⡻⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣹⢚⡶⣽⣺⢵⣫⢶⡝⣮⢻⡵⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢆⠀⠀⠀⠀
⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢯⡷⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣷⣿⣴⣫⣼⣍⣟⣿⣻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢿⣷⡿⣯⢷⣏⢿⣼⣳⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀
⠀⠀⠼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢺⣗⣿⣭⣋⣟⣹⢋⡟⡹⢛⡛⣟⠻⡟⢿⠿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣽⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀
⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡽⣾⣽⣿⣿⣿⣿⣿⣾⣿⣷⣿⣼⣷⣿⣮⣷⣵⣦⣧⣝⣮⣝⣯⣻⣽⣻⣟⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀
⠀⠀⡸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣞⡷⣯⢟⡛⣟⠻⣟⠿⡿⢿⢿⡿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠆⠀
⠀⠀⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣺⣽⣻⣿⣿⣾⣿⣾⣿⣽⣾⣶⣳⣭⣾⣴⣣⡽⣌⣯⣹⣙⣏⡻⣝⢯⣛⣿⣻⣟⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀
⠀⠀⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣵⣳⣿⢿⢻⠟⡿⢿⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄
⠀⢀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣞⡷⣿⣧⣿⣾⣵⣯⣾⣼⣳⣮⣷⣭⢯⣹⣍⣻⣙⡟⣛⡟⣛⢻⡛⡟⢿⡻⣟⠿⣿⢿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡷
⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢺⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏
⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢻⣞⣿⣦⣳⣴⣦⣵⣬⣖⣭⣞⣭⣏⡿⣹⣛⣟⣻⠻⣟⢻⠟⡿⣻⠿⣟⡿⣟⡿⣿⢿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀(;´༎ຶٹ༎ຶ`)
*/
//Never Going To Give You Up//