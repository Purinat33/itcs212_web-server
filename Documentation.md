@Purinat33

# ITCS212 Web Server (OnlyGames)

## Description:
<p>This web server is part of the ITCS212 Web Programming course syllabus, built in the MVC format</p>

# General Detail:

## Introduction:
<p>
A web service follows a client-server architecture where the client sends a request to the server and the server sends a response back to the client. The client can be a browser, mobile application, or any other application that wants to access the resources provided by the web service.</p><p>
To make a request to a web service, the client sends an HTTP request with a specific HTTP method (GET, POST, PUT, DELETE, etc.) to a specific URL endpoint of the web service. The request may also contain additional information such as headers and a message body, depending on the specific requirements of the web service.
</p><p>
Once the server receives the request, it processes the request, retrieves or modifies the relevant data from a database or other resources, and generates an HTTP response message. The response typically includes a status code indicating whether the request was successful or not, headers with additional information about the response, and a message body containing the requested data.
</p><p>
The client then receives the response message and can use the data provided by the web service in the appropriate way, such as displaying it on a web page or using it to modify data in a mobile application. The client can also make subsequent requests to the web service as needed to access other resources or perform other actions.
</p>

## Typicial web service structure:

![service](request-response.png)

## HTTP protocol:
<p>
HTTP (Hypertext Transfer Protocol) is an application layer protocol used for transferring data over the web. It is the foundation of data communication on the world wide web and other networks that use the internet as a backbone. HTTP is a client-server protocol, which means that it relies on the communication between the client (a web browser or an application that accesses the web) and the server (the computer hosting the web service or website).
</p><p>
The HTTP protocol uses a request/response model, where the client sends a request to the server, and the server sends a response back to the client. The request contains information about the resource that the client wants to access, such as a web page, an image, or other data, while the response contains the requested data and information about the status of the request.
</p><p>
HTTP is a stateless protocol, which means that each request and response is independent of any previous requests and responses. However, web applications often require a way to maintain state between requests, which is achieved using cookies, sessions, and other mechanisms.
</p><p>
In summary, HTTP is the protocol that enables communication between a client and a server over the web, using a request/response model. It is a foundation of modern web development and essential to the functioning of web services and websites.
</p>

## HTTP methods:
GET, POST, PUT, and DELETE are the most commonly used HTTP methods or verbs. They are used to perform various operations or actions on the resources available on a web server.
<p>
<strong>GET</strong>: This method is used to retrieve information or data from the server. When a client sends a GET request to a server, the server returns the requested resource if it exists. For example, when a user opens a website or clicks a link, the GET method is used to request the webpage from the server.
</p><p>
<strong>POST</strong>: This method is used to submit or send data to the server to create or update a resource. When a client sends a POST request to a server, the server accepts the request, processes the data, and sends back a response. For example, when a user submits a form on a webpage, the POST method is used to send the form data to the server.
</p><p>
<strong>PUT</strong>: This method is used to update an existing resource on the server. When a client sends a PUT request to a server, the server updates the resource if it exists, or creates a new one if it doesn't. For example, when a user edits an article on a website, the PUT method is used to update the article on the server.
</p><p>
<strong>DELETE</strong>: This method is used to delete a resource from the server. When a client sends a DELETE request to a server, the server deletes the resource if it exists. For example, when a user deletes a post on a social media platform, the DELETE method is used to delete the post from the server.
</p>


## HTTP Status Code:
<p>
HTTP status codes are a set of codes that indicate the status of a requested HTTP resource. They are three-digit numbers that are returned by the server as a response to a client's request. Some of the most common HTTP status codes are:</p>
<ul>
<li>200 OK: The request was successful.</li>
<li>201 Created: The request was successful, and a new resource has been created.</li>
<li>204 No Content: The server successfully processed the request, but there is no content to return.</li>
<li>400 Bad Request: The request was malformed or invalid.</li>
<li>401 Unauthorized: The client is not authorized to access the requested resource.</li>
<li>403 Forbidden: The client does not have access to the requested resource.</li>
<li>404 Not Found: The requested resource could not be found.</li>
<li>500 Internal Server Error: An error occurred on the server while processing the request.
</li>
</ul>
<p>These codes provide a quick way for developers to identify and handle different types of responses from the server.</p>

The codes are very useful when testing our web application, most notable web application testing software is POSTMAN.

## POSTMAN
<p>Postman is a popular tool used by developers to test, document and share APIs. It allows users to send HTTP requests to an API and receive responses. With Postman, developers can send GET, POST, PUT, DELETE requests, set headers and authentication tokens, and examine responses in detail. Postman also provides features like request history, collection of requests, testing scripts, and automatic generation of code snippets for different programming languages. It is available as a desktop application and a web-based service. Postman is widely used by developers and teams to streamline their API development and testing workflows.</p>

![POSTMAN](postman.webp)

# ITCS212 Web Server's Detail

## Database Overview:

![DB](schema.png)

<p>Our database consists of 3 tables: users, product, and cart. Each have their own unique ID.
Though cart does possess a reference to users and product. This is due to the fact that a user can purchase or add a product into their cart. Therefore references must be maintained.</p>

## Flow Overview:

![Diagram](WebRouting.jpeg)

## General Overview:
<ul>
<li>
    The home page group (Accessible from everywhere):
    <ul>
        <li>Homepage (/): Landing page of the website</li>
        <li>Browse (/store/browse): List of items</li>
        <li>About (/about): Information of the authors</li>
        <li>Search (/store/search): Items search page</li>
        <li>Login (/auth/login): Use for authentication</li>
    </ul>
</li>
<li>
    Product Specific Pages: 
    <p>Redirected from /store/browse or /store/search page. The URL of a product page is linked to its corresponding catalogue item.</p>
</li>
<li>
    Admin Pages:
    <ul>
        <li>Dashboard (/admin/dashboard): Contain lists of items and all users with abilities to edit and delete their details</li>
        <li>Product adding and User adding pages: Grants the ability to set username, password, and user status of either being an admin (granted access to the dashboard) or a normal user. Also allowed uploading of photos (jpeg) for product pages.</li>
    </ul>
</li>
<li>
    User's specific page (cart):
    <ul>
        <li>Contain information like titles, price per unit, number of units, and total price of a single product.</li>
        <li>Total price of everything summed together
        </li>
        <li>Checkout button leading to a payment gateway API by a 3rd party provider where a secured and trustworthy payment can occurred.
        </li>
    </ul>
</li>
</ul>

## General running steps:
<ol>
    <li>The service connect to a MySQL database</li>
    <li>The possible routes are: </li>
        <ul>
            <li>Admin routes (/admin): Containing an admin dashboard and the functionality to Add/Update/Delete products and users</li>
            <li>Users routes (/store): Used for displaying products, along with a user's cart containing their current order</li>
            <li>Authentication route (/auth): Pages used for authentication functionality such as login and registration</li>
        </ul>
    <li>Generate the landing page (/) based on the current `cookie` state. This cookie will be crucial to our session managements and protection against unauthorized access, as it will redirect any unauthorized user from accessing admin routes or user's specific route (user's cart). The server checks for the cookie and fetch and render the cart page based on the user's information.</li>
</ol>

## MVC
<p>[MVC (Model-View-Controller)](https://developer.mozilla.org/en-US/docs/Glossary/MVC) is a pattern in software design commonly used to implement user interfaces, data, and controlling logic. It emphasizes a separation between the software's business logic and display. This "separation of concerns" provides for a better division of labor and improved maintenance.</p>

<ul>
    <li><strong>Model</strong>: Where our connection the database and exportation of the connection to other modules occurred</li>
    <li><strong>View</strong>: Where our EJS files (Embedded JavaScript), where retrieved data (from our database in this case) are rendered at runtime, allowing real-time displays of information like users and products. </li>
    <li><strong>Controller</strong>: This is where our program's behaviours like CRUD and authentications are performed.</li>
    <li><strong>Routes</strong>: Though not a literal part of the definition of MVC, we nontheless separate the routing and pathing of our web flows into a separate modules. The paths, working with the controller modules, specify the behaviours and where in our web would the corresponding behaviour performs.</li>
    <li>Config: Contain setting/initialization of packages like PassportJS, Stripe Payment API etc.</li>
</ul>

### An example of each MVC(RC) module and snippet:

database.js (Model)
```js
const sql = require('mysql2');
require('dotenv').config(); 

const db = sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

db.getConnection((err, connection)=>{
  if (err) {
    console.error('Error getting connection from pool:', err);
    return;
  }
  console.log('Connection retrieved from pool:', connection.threadId);
  connection.release();
});
```

success.ejs (View)
```html
<div class="container">
        <h1>Success!</h1>
        <p>
            <%= message %>
        </p>
        <button id="continue-button">Continue</button>
    </div>
```

auth.js (Controller)
```js
const register = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', '..','frontend', 'public', 'auth', 'register.html'));
}
```

auth.js (Routes)
```js
routes.get('/register', register);
```

stripe.js (Config)
```js
const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.SERVER_URL}/pay/success`,
    cancel_url: `${process.env.SERVER_URL}/pay/cancel`,
  });

  res.json({ id: session.id });
```

## Overview of important modules used:
<ul>
    <li><strong>express</strong>:
        <p>Express.js is a web application framework for Node.js that provides a simple, yet powerful set of features for creating web applications and APIs. It provides a number of built-in middleware functions to help you quickly create robust applications, including handling HTTP requests and responses, routing, session management, error handling, and more. Express is lightweight and flexible, and allows you to easily configure your application to meet your specific needs. It also has a large and active community that contributes to its development and provides a wealth of third-party plugins and extensions. </p> [Documentation](https://expressjs.com/)
    </li>
    <li><strong>express-session</strong>:
    <p>express-session is a middleware for Express.js that provides a way to manage user sessions in a web application. Sessions allow web applications to store information about the user across multiple requests.</p</li>
    <li><strong>method-override</strong>:
    <p>method-override is a middleware for Express.js that allows you to override the HTTP method of a request using a query parameter or HTTP header. It is useful in situations where a browser does not support certain HTTP methods like PUT, PATCH, and DELETE.</p>
    <p>
    By default, HTML forms only support GET and POST methods. This means that if you want to submit a form using a different method, like PUT or DELETE, you would normally have to use JavaScript to send an AJAX request. However, with method-override, you can use a query parameter or HTTP header to indicate the desired HTTP method, and the middleware will handle the rest. </p></li>
    <li><strong>morgan</strong>:
    <p>morgan is a middleware for logging HTTP requests in Node.js/Express applications. It provides detailed information about every request, such as the HTTP method, URL, status code, and response time.</p></li>
    <li><strong>dotenv</strong>:
    <p>dotenv is a Node.js package that allows developers to store configuration information, such as API keys, database credentials, and other sensitive information, in environment variables instead of hardcoding them into the code. It reads key-value pairs from a .env file and loads them into process.env, which can then be accessed throughout the application. 
    </p>
    </li>
    <li><strong>bcrypt</strong>:
    <p>bcrypt is a library for Node.js that provides password hashing functionality using the bcrypt algorithm. It is commonly used to securely store user passwords in databases. Bcrypt is a one-way hash function, which means that it cannot be reversed to get the original password.</p></li>
    <li><strong>flash</strong>:
    <p>connect-flash is a module used in Node.js and Express.js applications for displaying flash messages to the user. Flash messages are used to give feedback to the user about the status of an operation, such as whether an action was successful or not.</p></li>
    <li><strong>body-parser</strong>:
        <p>body-parser is a middleware module for handling HTTP POST request bodies. It is used to extract the body of an incoming request and make it available in `req.body` property</p>
    </li>
    <li><strong>cookie-parser</strong>:
    <p>cookie-parser is a middleware for Express that parses cookies attached to the client request object. It allows your application to set, get and clear cookies with ease. Once you require and initialize the middleware, it automatically parses the cookies and attaches them to the request object as `request.cookies` property.</p></li>
    <li><strong>jsonwebtoken</strong>:
    <p>jsonwebtoken is a Node.js library used for generating and verifying JSON Web Tokens (JWTs). JWTs are a type of token used for authentication and authorization in web applications.</p>
    <p>The library provides methods for signing and verifying JWTs, which can be used to securely transmit information between the client and server. When a user logs in to a web application, for example, a JWT can be generated that contains information about the user, such as their username or email address. This token can then be sent to the client and stored in a cookie or local storage.</p><p>
    When the user makes subsequent requests to the server, the JWT is included in the request headers. The server can then use the jsonwebtoken library to verify the token, and extract the user information contained within. This allows the server to authenticate the user and authorize access to certain resources or functionality.</p>
    <p>
    The jsonwebtoken library supports various algorithms for signing and verifying JWTs, including HMAC and RSA. It also provides options for setting expiration times and custom claims within the token.</p></li>
    <li><strong>passport</strong>:
    <p>Passport is an authentication middleware for Node.js, which can be used to handle user authentication and authorization in an Express.js application. It is highly configurable, and can support a wide range of authentication strategies including local authentication (using a username and password), OAuth, OpenID, and more.</p><p>
    Passport is built on top of the concept of "strategies", which are essentially authentication mechanisms. Each strategy represents a different way of authenticating users, such as via a password, a social media account, or a single sign-on service. Passport supports a wide range of strategies out of the box, and developers can also create their own custom strategies.</p></li>
    <li><strong>mysql2</strong>:
    <p>mysql2 is a Node.js module that provides fast and reliable access to MySQL databases. It is a library for interacting with MySQL databases using the Node.js programming language. The module uses the same API as the popular mysql module but provides faster performance and better support for newer versions of the MySQL server. It is a native driver for Node.js, which means that it is written in C++ and compiled into a binary module, making it faster and more efficient than modules written entirely in JavaScript. It supports both Promise-based and callback-based approaches for handling database queries and connections.  </p></li>
</ul>

## What is a cookie?
<p>A cookie is a small text file that a website saves on a user's computer or mobile device when they visit the site. Cookies are used to remember information about the user, such as their login credentials, preferences, and browsing history. Cookies can also be used to track user behavior on the website, such as which pages they visit and how long they stay on each page.</p>
<p>
There are two types of cookies: session cookies and persistent cookies. Session cookies are temporary and are deleted when the user closes their browser, while persistent cookies remain on the user's device until they expire or are deleted by the user.</p><p>
Cookies are often used to improve the user experience on a website, such as by remembering a user's language preference or their shopping cart contents. However, some users may be concerned about their privacy and the tracking of their online behavior through the use of cookies. Therefore, many websites provide options for users to control cookie settings or even opt out of cookie tracking altogether.</p>

## JSON Web Token (JWT), Our preferred choice of cookie:
<p>JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization purposes in web applications.</p><p>
JWTs consist of three parts: the header, the payload, and the signature. The header contains information about the type of token and the signing algorithm used. The payload contains the claims or assertions that the token makes about the user or entity. The signature is created by hashing the header, the payload, and a secret key using the specified algorithm.</p><p>
When a user logs into an application, the server generates a JWT and sends it back to the client. The client then stores the JWT and sends it back to the server with every subsequent request. The server verifies the signature of the token to ensure that it has not been tampered with, and uses the information in the payload to authenticate and authorize the user.</p><p>
JWTs have become a popular alternative to traditional session-based authentication because they are stateless and can be used across multiple domains. They also provide a way to store additional information in the token, such as user roles and permissions, which can be used for authorization purposes.</p>

For example:
```js
const jwt = require('jsonwebtoken');

// Example user data
const user = {
  id: 123,
  role: 'admin'
};

// Generate token
const token = jwt.sign(user, 'secret-key-here', { expiresIn: '1h' });

// Verify token
jwt.verify(token, 'secret-key-here', (err, decoded) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(decoded); // { id: 123, role: 'admin', iat: 1651640906, exp: 1651644506 }
});
```

## Pros and Cons of different types of session management:
<strong>Session cookies</strong>:
<p>Pros:</p>
<ul>
<li>They are easy to use and implement. Most web frameworks have built-in support for session cookies.</li>
<li>They can be invalidated by the server. If a user logs out or if their session expires, the server can simply delete the session cookie.</li>
<li>They can store any kind of data, not just user authentication information.</li>
</ul>
<p>Cons:</p>
<ul>
<li>They are vulnerable to cross-site request forgery (CSRF) attacks. Since session cookies are automatically sent with every request to the server, an attacker can trick a user into performing an unintended action by making a request on their behalf.</li>
<li>They can be hijacked if the server is not properly secured. If an attacker gains access to the server's session storage, they can steal any session cookie and impersonate any user.</li>
</ul>
<p></p>
<strong>JSON Web Token</strong>:
<p>Pros:</p>
<ul>
<li>They are not vulnerable to CSRF attacks since they are not automatically sent with every request. Instead, they are stored in the client's browser and sent explicitly when needed.</li>
<li>They can be easily used in stateless architectures such as microservices and serverless functions.</li>
<li>They can contain all the information needed for authentication and authorization, reducing the need for server-side storage.
</li>
</ul>
<p>Cons:</p>
<ul>
<li>They cannot be invalidated by the server. Once a JWT is issued, it remains valid until it expires, which can be a security risk if a JWT is stolen or compromised.</li>
<li>They are typically larger than session cookies, since they need to store all the authentication and authorization information.</li>
<li>They require additional implementation effort to integrate with a web application, since most frameworks do not have built-in support for JWTs.</li>
</ul>

## FAQ: Why use passport.js over normal equal checking of user's input?
<ol>
    <li>It supports multiple authentication strategies: Passport allows you to implement multiple authentication strategies in your application. For example, you could allow users to log in using a traditional email and password, or you could allow them to log in using a social media account such as Google or Facebook. This flexibility can be very useful for users who may prefer different authentication methods or for applications that need to support different user bases.</li>
    <li>It handles authentication flow: With Passport, you don't need to worry about handling the entire authentication flow yourself. Passport provides a middleware layer that handles authentication and user sessions for you, allowing you to focus on your application's business logic.</li>
    <li>It has a large and active community: Passport is one of the most widely used authentication frameworks in the Node.js ecosystem. This means that there are many resources available for learning how to use Passport, as well as many third-party plugins and strategies that can be easily integrated into your application.</li>
    <li>It is extensible and customizable: Passport is highly extensible, allowing you to customize and configure it to meet the specific needs of your application. For example, you can create your own authentication strategies, or you can customize the behavior of existing strategies to better fit your application's needs.</li>
</ol>

<hr>

# Directory and files overview:

### Our goal is deploying the frontend and the backend separately on a different server/port:

![Directory](dir.png)

<ul>
    <li>Views and static folder (containing images and other unchanged assets) are contain in the frontend folder.</li>
    <li>Model, Controller, Routes, and Config are stored in the backend folder.</li>
</ul>

# <strong>Frontend</strong>

![Frontend](Frontend.png)

## The frontend contains 2 folders: view and public
<ul>
<li>
    <strong>public</strong> 
    <p>The public folder is a standard folder in a web application that contains static assets such as images, CSS files, JavaScript files, and other resources that are directly served to the client-side (i.e., the user's web browser) when they visit a web page.</p>
    <p>
    The purpose of the public folder is to separate static files from dynamic files, such as server-side code that generates HTML dynamically. By separating these files, the server can serve the static files faster since it doesn't have to execute any code to generate them.
    </p>
    <p>
    In Node.js applications, the public folder is often located in the root directory of the project, alongside other folders such as routes, views, and models. When a client requests a file in the public folder, the server will directly serve that file without any processing or modification. </p>
</li>
<li>
    <strong>view</strong>
    <p>The views folder is a standard directory in a web application that contains the templates or views that are rendered by the server to generate the HTML that is sent to the client's web browser. The views folder is typically located in the root directory of the project, alongside other directories such as routes, models, and public.</p>
    <p>
    In a Node.js application that uses a templating engine like EJS or Handlebars, the views folder will contain files with extensions like .ejs or .hbs that define the structure of the HTML that the server sends to the client. These files contain placeholders or variables that are replaced by data when the server renders the view. For example, a view file might contain a variable like <%= username %> which will be replaced by the actual value of the username variable when the server renders the view.</p>
    <p>
    The views folder typically contains different files for different pages or components of the web application, such as the home page, login page, profile page, and so on. These files define the structure and layout of the HTML that is sent to the client and often include links to CSS and JavaScript files in the public folder.
    </p>
    <p>
    When a client requests a page from the server, the server will typically execute code in a routes file to generate or retrieve data to be displayed on the page, and then render the appropriate view file using the templating engine. The server then sends the resulting HTML to the client's web browser.</p>
</li>
</ul>

## EJS Files:
<p>EJS (Embedded JavaScript) is a templating language that allows developers to generate HTML dynamically with JavaScript. EJS is used in Node.js applications to generate dynamic web pages that can include variables, conditionals, and loops.</p>
<p>
In EJS, developers can write HTML code and embed JavaScript code within it using tags such as <% %> and <%= %>. The <% %> tags are used to execute JavaScript code, while the <%= %> tags are used to display the value of a JavaScript expression within the HTML output.</p>
<p>
EJS templates can also include partials, which are reusable code snippets that can be included in multiple templates. EJS partials are defined using the <%- include('partial-name') %> syntax.
</p><p>
When a Node.js application receives a request, the server processes the request and generates an HTML response using an EJS template. The server replaces EJS tags with their corresponding values and generates the final HTML output. This output is then sent back to the client's web browser as the response to the original request.</p>
<p>
Overall, EJS is a powerful tool for generating dynamic web pages in Node.js applications. It allows developers to create reusable templates that can be customized with dynamic data, making it easier to build complex web applications.
</p>

Example of `cart.js` rendering a cart page based on a logged in user:
```js
const getCart = async (req, res, next) => {
  const uid = req.user.id;
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

  const totalSum = items[0].reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  res.status(200).render('cart', { cartItems: items[0] , totalSum, user: req.user});
};
```

# <strong>Backend</strong>

![Directory](backend.png)


The backend contains many folder, mainly Model, Controller, Routes and Config with additional files.

<ul>
    <li>
        <strong>package.json</strong>
        <p>package.json is a configuration file in a Node.js application that contains information about the application, its dependencies, and scripts to execute various tasks. It is typically located in the root directory of the project and is automatically created when a new Node.js application is initialized.</p>
        <p>
        The package.json file includes metadata about the application, such as the application name, version, description, author, and license. It also includes a list of dependencies and devDependencies, which are packages required by the application and development packages used during development, respectively. These dependencies can be installed using the npm or yarn package managers.</p>
        <p>
        In addition to dependencies, the package.json file includes scripts that can be executed using npm or yarn. These scripts can be used to start the application, run tests, build the application for production, and perform other tasks.
        </p><p>
        The package.json file also includes other settings that control the behavior of npm or yarn, such as the default version of Node.js to use, the location of the main entry point for the application, and configuration options for linters and other development tools.
        </p>
        <p>
        Overall, the package.json file is a central configuration file for a Node.js application that provides important metadata about the application, lists its dependencies and scripts, and provides other configuration settings.
        </p>
    </li>
    <li>
        <strong>package-lock.json</strong>
        <p>package-lock.json is a file created by npm when it installs dependencies for a Node.js application. It serves as a lock file to ensure that the application uses the same dependencies across different machines or environments.</p>
        <p>
        The package-lock.json file contains a detailed list of all installed packages, including their version numbers and dependencies. It also includes information about the installation process, such as the order in which packages were installed, the location of each package, and any warnings or errors encountered during installation.</p>
        <p>
        When a Node.js application is installed using npm install, npm reads the package.json file to determine the required packages and their versions, and then installs them in the node_modules directory. The package-lock.json file is then created to record the exact version numbers of each installed package, so that the application can be re-created with the same dependencies in the future.</p>
    </li>
    <li>
        <strong>index.js</strong>
        <p>The file starts by importing several required modules using the require function: express, session, method-override, path, morgan, dotenv, bcrypt, ejs, flash, body-parser, and cookie-parser. The express module is used to create and configure the HTTP server, while the other modules are used for tasks like logging, session management, security, and handling HTTP requests.</p>
    <p>
    The file then defines a database connection using the db object exported from the database.js module, and exports the db object to allow other files to join and query the database.
    </p><p>
    Next, the file checks if an admin user exists in the database and creates one if it does not already exist. This is done by hashing the admin password using bcrypt, querying the database for an admin user with the username "admin", and creating a new admin user if none exists.</p>
    <p>
    After that, the file defines routes for handling HTTP requests. These include routes for user actions, authentication, admin actions, and payment. The file also sets up middleware for handling cookies, sessions, and JSON data, and sets up the view engine to use EJS templates.</p>
    <p>
    Finally, the file defines routes for serving HTML pages, handles errors, and starts the server listening on the specified port. The main route (/) renders an EJS template called index with a context object that includes a user property, and the /about route serves a static HTML page. If a requested route is not found, the server responds with a 404 error page.
    </p>
    </li>
    <li>
    List of middlewares in index.js
    <p>
    In the given index.js file, app.use() is used to add middleware functions to the Express application app. Here's a brief explanation of each app.use() function in the file:</p>
    <p>
    `app.use(flash())`: This adds the connect-flash middleware to the application, which allows for displaying flash messages on successful or failed operations.</p>
    <p>
    `app.use(bodyParser.urlencoded({ extended: false }))`: This adds the body-parser middleware to the application, which parses incoming request bodies in a middleware and makes it available under the req.body property.</p>
    <p>
    `app.use(methodOverride(req => req.body._method))`: This adds the method-override middleware to the application, which allows for using HTTP verbs such as PUT or DELETE in places where the client doesn't support it (like in HTML forms).</p>
    <p>
    `app.use(cookieParser())`: This adds the cookie-parser middleware to the application, which parses cookies attached to the client request object.</p>
    <p>
    `app.use(session({ ... }))`: This adds the express-session middleware to the application, which enables server-side session management. The middleware creates a new session object for each client, and stores the session data on the server.</p>
    <p>
    `app.use(passport.initialize())`: This adds the passport middleware to the application, which is an authentication middleware that provides various strategies for authenticating a user.
    </p><p>
    `app.use(passport.session({ ... }))`: This adds the passport session middleware to the application, which allows passport to serialize and deserialize user instances to and from the session.
    </p><p>
    `app.use(express.urlencoded({extended:false}))`: This adds the urlencoded middleware to the application, which parses incoming requests with urlencoded payloads.
    </p>
    <p>
    `app.use(express.json())`: This adds the json middleware to the application, which parses incoming requests with json payloads.
    </p><p>
    `app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')))`: This serves static files, like images, CSS, JavaScript, etc., from the specified directory. This middleware serves files in the directory to the client, based on the URL path provided.
    </p><p>
    `app.use(morgan('dev'))`: This adds the morgan middleware to the application, which logs incoming requests to the console in a developer-friendly format.
    </p><p>
    `app.use((err, req, res, next) => { ... })`: This adds an error handling middleware to the application, which catches and handles errors thrown by the application.
    </p><p>
    `app.use((req, res, next) => { ... })`: This adds middleware to the application to set the content type of the response to text/html if the request URL ends with .html.
    </p>
    <p>
    In summary, the `app.use()` function is used to add middleware to the Express application, which can perform various operations such as parsing request bodies, handling errors, and serving static files, among others.
    </p>
    </li>
    </ul>
    </li>
</ul>

## Routes and controller:
<p>As stated, we want to separate the route and the controllers entirely from each other. Instead of having a route perform a specific action, we instead defined a function (commonly called a middleware function) in the controllers module and have a route calls it. This reduce same code redundancy, increase reusability, and can be easily built upon one another using many middleware functions chained together.</p>

An example of a controller called by a single route:

`cart.js` controller function.
```js
const addToCart = async (req,res,next) =>{
    const {quantity} = req.body;
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const userID = decoded.id;

    try {
        await db.promise().query('START TRANSACTION');
        try {
            await db.promise().query('INSERT INTO cart (uid, pid, quantity) VALUES (?, ?, ?)', [userID, req.params.id, quantity]);            
            await db.promise().query('COMMIT');
            res.status(200).render('success', {message: "Product added", token: req.cookies.token});
        } catch (error) {
            console.log(error);
            await db.promise().query('ROLLBACK');
            res.status(500).render('error', {message: "Internal server error"})
        }
    } catch (err) {
        console.log(err);
        await db.promise().query('ROLLBACK');
        res.status(500).render('error', {message: "Internal server error"})
    }
}
```

`users.js` routes
```js
routes.post('/cart/:id', checkJWT, addToCart);
```

<p>Also note the presense of another middleware function `checkJWT` added before addToCart function. This is another middleware used to check authorization before continuing to execution of addToCart function</p>

`token.js` controllers
```js

function checkJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    if (!req.responseSent) {
      req.responseSent = true;
    }
    return res.status(401).render('error', {message: "User is not logged in"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };    
    
    next();
  } catch (error) {
    if (!req.responseSent) {
      req.responseSent = true;
    }
    return res.status(401).render('error', {message: "Invalid token"});
  }
}
```

## Payment API with Stripe:
<p>Stripe is a popular payment processing platform that allows businesses and individuals to accept payments over the internet. Stripe provides a range of tools and services for online payments, including payment processing, subscriptions, invoicing, and fraud prevention.</p><p>
With Stripe, businesses can accept payments from customers all over the world in a variety of currencies, and the platform provides tools for managing payments and customers, as well as analytics and reporting features. Stripe also offers a range of integrations with popular e-commerce platforms, content management systems, and other tools, making it easy to add payment processing capabilities to your website or app.</p><p>
One of the key benefits of using Stripe is its developer-friendly API, which makes it easy to integrate payment processing into your website or app. Stripe also offers comprehensive documentation and support, as well as a range of development tools and libraries for popular programming languages like Ruby, Python, and JavaScript.</p><p>
Overall, Stripe is a popular choice for businesses and individuals who need to accept payments online, offering a range of tools and services for payment processing, subscriptions, and more, as well as a developer-friendly API and comprehensive documentation and support.</p>

![Stripe](dashstripe.png)

### What is a payment gateway:
<p>A "payment gateway" is a technology that connects merchants (sellers) and customers (buyers) in the process of making online transactions, such as purchases or bill payments. It acts as a mediator between a merchant's website or application and the financial institution that processes the payment, ensuring the secure and efficient transfer of funds between parties.</p><p>
When a customer makes a payment on a merchant's website, the payment gateway securely captures the customer's payment information, such as credit card details or bank account information, and sends it to the payment processor or acquiring bank for authentication and authorization. Once the payment is authorized, the payment gateway confirms the transaction and sends a response to the merchant's website, enabling the completion of the transaction.</p><p>
Payment gateways also provide merchants with tools for managing transactions, such as generating reports, tracking payments, and managing refunds and chargebacks.</p>

## How a 3rd party service (Stripe) connect, manage, and separate this web service from millions of other web services around the world:
<p><strong>API</strong>: An API, or Application Programming Interface, is a set of protocols, routines, and tools for building software applications. It specifies how software components should interact with each other, enabling different software systems to communicate and share data.</p>
In general, an API works in a following steps:
<ol>
<li>A client application sends a request to the API endpoint using a specific format (e.g., HTTP request).</li>
<li>The API server receives the request and processes it, often by accessing a database or other resources to retrieve or manipulate data.</li>
<li>The API server then formulates a response in the same format as the request (e.g., JSON, XML) and sends it back to the client.
</li>
<li>
The client receives the response and processes it according to its own needs.
</li>
</ol>

Most notable is known as REST API:
<p><strong>REST</strong> (Representational State Transfer) API is a type of web service that uses HTTP methods to communicate with clients. It is a popular architectural style for building web APIs and is widely used by many popular web services.</p><p>
REST APIs are built around resources, which are objects or pieces of data that can be accessed and manipulated through a set of HTTP methods. These methods include `GET`, `POST`, `PUT`, and `DELETE`.
</p><p>
When a client sends a request to a REST API, it includes a URL that identifies the resource it wants to access or manipulate, along with the HTTP method it wants to use. The API then sends a response back to the client, usually in the form of JSON or XML data.
</p><p>
One of the key features of REST APIs is that they are stateless, meaning that the server does not store any information about the client's previous requests. Instead, each request contains all the necessary information for the server to process it and send back a response.
</p><p>
Overall, REST APIs provide a flexible and efficient way for clients to access and manipulate resources on a server, making them an essential component of many web applications and services.</p>

![REST](rest.png)

## To use an API in general:
<ol>
    <li>Register for an API key: Most APIs require you to register and obtain an API key or authentication token to access their services.</li>
    <li>Read the documentation: APIs usually provide documentation that outlines the endpoints, request/response formats, parameters, and other details that you need to know to use their services.</li>
    <li>Choose an API endpoint: APIs typically provide multiple endpoints that correspond to different functions or data sets. You need to select the endpoint that best meets your needs.</li>
    <li>Make a request: You need to construct an HTTP request with the required parameters and headers, and send it to the API endpoint.</li>
    <li>Handle the response: The API will respond with data that may need to be parsed, processed, and formatted according to your application's needs.</li>
    <li>Implement error handling: API requests may fail due to a variety of reasons, such as network errors, authentication failures, or incorrect parameters. You need to handle these errors gracefully and provide appropriate feedback to the user.</li>
    <li>Test and iterate: Once you have implemented the API integration, you need to test it thoroughly and iterate as necessary to address any issues or optimize performance.</li>
</ol>

## API keys:
<p>
API keys are unique identifiers that are used to authenticate and authorize access to an API. They are typically a long string of randomly generated characters that are associated with a specific user or application. When making requests to an API, the API key is included in the request headers or query parameters to identify the requester and provide access to the API's resources.</p><p>
API keys can be classified as public or private keys depending on how they are used. Public keys are meant to be shared with the public and are used to access non-sensitive, read-only resources of an API. Private keys, on the other hand, are kept secret and are used to access sensitive resources or perform actions that require authorization.
</p><p>
API keys are an important component of API security as they allow the API provider to control access to its resources and monitor usage patterns. They also enable API providers to track usage metrics, enforce rate limits, and manage access permissions for different users or applications.
</p>

## Stripe API Integration:
<ol><li>Sign up for a Stripe account: To use the Stripe API, you need to have a Stripe account. You can sign up for a free account on the Stripe website.</li>
<li>
Install the Stripe library: To use the Stripe API, you need to install the Stripe library. You can do this by running the following command in your terminal:

```js
npm i stripe
```

</li>
<li>
Get your API keys: To authenticate your requests to the Stripe API, you need to use your API keys. You can find your API keys in your Stripe dashboard.</li>
<li>Create a charge: To charge a customer, you need to create a charge. You can do this by making a request to the Stripe API using your API keys.

In this example, we are creating a charge of $20 (2000 cents) with the currency of USD and a payment source of a test Visa card.
```js
const stripe = require('stripe')('sk_test_your_secret_key');

stripe.charges.create({
  amount: 2000,
  currency: 'usd',
  source: 'tok_visa',
  description: 'Charge for test@example.com'
}, function(err, charge) {
  // asynchronously called
});
```
</li>
<li>Handle the response: Once you have made a request to the Stripe API, you will receive a response. You can handle the response to update your database or display a success message to the user.</li>
</ol>

## Extra: How to test the web server (and Stripe) APIs using POSTMAN:
<p>To use Postman for testing an external party API such as Stripe, you will need to first obtain the API credentials from the external party (in this case, Stripe). You can usually find instructions on how to obtain the API credentials in the API documentation provided by the external party.</p><p>
Once you have obtained the API credentials, you can use Postman to make requests to the Stripe API by following these steps:</p>
<ol>
<li>Open Postman and create a new request by clicking on the "New" button in the top left corner.</li><li>
In the "New" dialog, select the HTTP method that you want to use (e.g. GET, POST, etc.) and enter the URL for the API endpoint that you want to test.</li><li>
In the "Headers" tab, add any necessary headers for the API request. For example, if you are making a request to the Stripe API, you will need to include the "Authorization" header with your API key.</li><li>
In the "Body" tab, add any necessary request parameters for the API request. The parameters will depend on the specific API endpoint that you are testing.</li><li>
Click on the "Send" button to send the API request.</li><li>
Once you have sent the API request, you should receive a response from the API. You can view the response in the "Response" tab in Postman. You can also use Postman to test different API endpoints and methods by creating new requests and modifying the headers and parameters as needed.</li>
</ol>