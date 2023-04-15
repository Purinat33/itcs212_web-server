const express = require('express');
const { checkJWT } = require('../controllers/token');
const route = express.Router();
const {createCheckoutSession, getSuccess, getCancelled, wipeCart} = require('./../config/stripe')

route.post('/create-checkout-session/:uid', checkJWT, createCheckoutSession);
route.get('/success', checkJWT, wipeCart,getSuccess);
route.get('/cancel', getCancelled);

route.delete('/',checkJWT, wipeCart);

module.exports = route