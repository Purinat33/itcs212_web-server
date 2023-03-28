const express = require('express');
const { checkJWT } = require('../controllers/token');
const route = express.Router();
const {createCheckoutSession, getSuccess, getCancelled} = require('./../config/stripe')

route.post('/create-checkout-session/:uid', checkJWT, createCheckoutSession);
route.get('/success', checkJWT, getSuccess);
route.get('/cancel', getCancelled);

module.exports = route