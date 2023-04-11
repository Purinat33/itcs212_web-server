//Index.js for front-end module
const express = require('express')
const route = express.Router();
const app = express()
const ejs = require('ejs')
const path = require('path')
const axios = require('axios')
const morgan = require('morgan')



app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))


app.get('/', (req,res)=>{
    res.status(200).render('index', {user: req.user});
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
    res.status(200).redirect('/');
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

    res.status(200).redirect('/');
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


//404 Error not found page
app.all('*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'public' ,'404.html'));
});

app.listen(4000, ()=>{
    console.log('Frontend is listening on port 4000');
})