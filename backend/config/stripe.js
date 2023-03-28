require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const {db} = require('./../index');

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
    success_url: 'http://localhost:3000/pay/success',
    cancel_url: 'http://localhost:3000/pay/cancel',
  });

  res.json({ id: session.id });
};

const getSuccess = (req,res,next)=>{
    res.status(200).render('success', {message: "Your process has been successfully ordered", token: req.cookies.token});
}

const getCancelled = (req,res,next) =>{
    res.status(400).render('cancel', {message: "Your process has been cancelled"});
}

module.exports = {createCheckoutSession, getSuccess, getCancelled};