require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const {db} = require('./../index');

//https://youtu.be/1r-F3FIONl8
const createCheckoutSession = async (req, res) => {
  const uid = req.params.uid;
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

  const lineItems = items[0].map(item => {
    return {
      price_data: {
        currency: 'thb',
        product_data: {
          name: item.name,
          description: item.publisher,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `http://localhost:3000/pay/success`,
    cancel_url: `http://localhost:3000/pay/cancel`,
  });

  res.json({ id: session.id });
};

const getSuccess = (req,res,next)=>{
    res.status(200).json({message: "Your process has been successfully ordered", token: req.cookies.token});
}

const getCancelled = (req,res,next) =>{
    res.status(400).json({message: "Your process has been cancelled"});
}

const wipeCart = async (req, res, next) => {
    const {uid} = req.query;
    console.log(uid); // Check if uid is being passed correctly


    await db.promise().query(`
        DELETE FROM cart WHERE uid = ?
    `, [uid]);

    next();
}


//Doing webhook
/*
A webhook is a mechanism that allows an application to receive real-time or near-real-time notifications from another application or service. It works like a callback or HTTP POST request that an application can use to receive event notifications from another application.
In the context of Stripe, webhooks are used to automatically notify your application about events that happen in your Stripe account, such as a successful payment or a failed payment. When an event occurs, Stripe sends a POST request to the webhook URL you have specified, along with a JSON payload that contains information about the event. Your application can then use this information to update its records or take other actions. 
*/
// Using sendGrid API to send email
//Change of plan, sendGrid bans me for some reasons I need to email support
// Stripe already automatically send email
//https://stripe.com/docs/receipts

module.exports = {createCheckoutSession, getSuccess, getCancelled, wipeCart};