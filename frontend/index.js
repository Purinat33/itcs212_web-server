//Index.js for front-end module
const express = require('express')
const route = express.Router();
const app = express()
const ejs = require('ejs')
const path = require('path')
const axios = require('axios')
const morgan = require('morgan')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const checkToken = require('./controller/cookie')

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

app.use(checkToken);

function getCookie(req,name) {
  const cookie = req.cookies[name];
  return cookie ? cookie : null;
}


app.get('/', (req,res)=>{
    // console.log(req.cookies);
    res.status(200).render('index', {user: req.cookies, token:req.cookies.token, jwt:jwt});
})

  //About page. Because .html is not cool enough
app.get('/about', (req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'about.html'));
})

route.get('/register', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'public', 'auth', 'register.html'));
});

route.post('/register', async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password;

  const response = await fetch('http://localhost:80/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const data = await response.json();
    // handle successful registration
    console.log(data);
    res.status(200).redirect('/auth/login');
  } else {
    const errorData = await response.json();
    // handle registration error
    res.status(404).render('error', {message: errorData})
  }
});


route.get('/login', (req,res)=>{
    res.status(200).render('login', {messages: req.query.message});
})

// Handle login form submission
route.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Send login request to backend
  const response = await fetch('http://localhost:80/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  // Handle response from backend
  const { status, message, token } = await response.json();
  if (status === 'success') {
    // If authentication successful, set token in cookie and redirect to homepage
    res.cookie('token', token, {
        secure: true,
        sameSite: 'lax',
        maxAge: 7200000
    });

    res.status(200).render('success', {message: "Successfully logged in", token: token});
  } else {
    // If authentication failed, redirect to login page with error message
    res.status(401).render('login', {messages:[message]});
  }
});

app.use('/auth', route);

app.get('/error', (req, res) => {
  fetch('/error')
    .then(res => res.json())
    .then(data => {
      res.render('error', { message: data.message });
    })
    .catch(err => console.error(err));
});

app.get('/admin/dashboard', checkToken, (req,res,next)=>{

    let token;
  if (req.cookies && req.cookies.token) { // check for token in cookies
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).render('error', { message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
    }

    if (!decodedToken.isAdmin) {
      return res.status(403).render('error',{ message: 'Access denied. User is not an admin' }); // handle forbidden access
    }

        fetch('http://localhost:80/admin/users', {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
        const users = data;
        // console.log(users); // add this line
        fetch('http://localhost:80/admin/product',{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
        const product = data;
        // console.log(product); // add this line
        // Pass the users and product data to the user.ejs file for rendering
        res.render('user', { users, product });
        })
        .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    })
})


app.get('/admin/adduser', checkToken, (req,res)=>{
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
    return res.status(200).sendFile(path.join(__dirname, 'public', 'admin', 'adduser.html'))

    })
});

app.get('/admin/dashboard/edit/:id', checkToken, async (req, res) => {
  try {
    const response = await fetch(`http://localhost:80/admin/users/${req.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.token}`,
      },
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).render('error', { message: errorData.message });
    }
    const user = await response.json();
    res.status(200).render('edit', { user });
  } catch (err) {
    console.log('Error getting edit page');
    res.status(500).render('error', { message: 'Internal server error' });
  }
});


// app.post('/admin/adduser', checkToken, (req,res)=>{
//      let token;
//   if (req.cookies && req.cookies.token) { // check for token in cookies
//     token = req.cookies.token;
//   } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // check for token in headers
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).render('error',{ message: 'Authorization header missing or invalid' }); // handle unauthorized access
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//     if (err) {
//       return res.status(401).render('error',{ message: 'Invalid token' }); // handle unauthorized access
//     }



//     });
// })

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

//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'public' ,'404.html'));
});

app.listen(3000, ()=>{
    console.log('Frontend is listening on port 3000');
})