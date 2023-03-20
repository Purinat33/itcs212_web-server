const express = require('express');
const routes = express.Router();
const {
    login,
    register,
    authenticate,
    createUser
} = require('./../controllers/auth')
const passport = require('./../controllers/passport');
const jwt = require('jsonwebtoken')

routes.get('/login', login);
//Getting the register page
routes.get('/register', register);

//login POST (logging in)
routes.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user.id, isAdmin : req.user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
  if(req.user.isAdmin){
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: false });
    console.log(req.cookies);
    return res.status(200).redirect('/admin/dashboard')
  } else {
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: false });
    console.log(req.cookies);
    return res.status(200).redirect('/')
  }
});

//Register post (creating user)
routes.post('/register', createUser);

//Logout, wiping all cookie and redirecting back to /auth/login
routes.get('/logout', (req,res)=>{
  console.log('Logging out... ');
  res.clearCookie('token');
  return res.status(200);
})


module.exports = routes;