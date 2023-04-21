const express = require('express'); //Import the express module to create the router
const { checkJWT } = require('../controllers/token'); //Import checkJWT function from ../controllers/token file
const route = express.Router(); //Create an instance of the express router
const {createCheckoutSession, getSuccess, getCancelled, wipeCart} = require('./../config/stripe') //Import createCheckoutSession, getSuccess, getCancelled and wipeCart functions from ../config/stripe file

route.post('/create-checkout-session/:uid', checkJWT, createCheckoutSession); //Define a post route for creating a checkout session with :uid parameter, checkJWT middleware and createCheckoutSession function
route.get('/success', checkJWT, wipeCart,getSuccess); //Define a get route for success with checkJWT middleware, wipeCart and getSuccess functions
route.get('/cancel', getCancelled); //Define a get route for cancel with getCancelled function

route.delete('/',checkJWT, wipeCart); //Define a delete route with checkJWT middleware and wipeCart function

module.exports = route //Export the router as a module
