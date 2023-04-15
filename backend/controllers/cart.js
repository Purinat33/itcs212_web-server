const {db} = require('./../index');

const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./../controllers/passport');
const jwt = require('jsonwebtoken')
const {checkJWT} = require('./../controllers/token')
require('dotenv').config();

const getCart = async (req, res, next) => {
  const {uid} = req.query;
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

  res.status(200).json({ cartItems: items[0] , totalSum, user: req.user});
};

const putCart = async (req,res,next)=>{
    const pid = req.params.id;
    const newQ = req.body.quantity;
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const userID = decoded.id;

    try {
        await db.promise().query('START TRANSACTION');
        try {
            if(newQ <= 0){
                await db.promise().query('DELETE FROM CART WHERE uid = ? AND pid = ?', [userID, pid]);
                await db.promise().query('COMMIT');    
                res.status(200).redirect('/store/cart'); 
            }   
            else{
                await db.promise().query('UPDATE cart SET quantity = ? WHERE uid = ? AND pid = ?', [newQ, userID, pid]);
                await db.promise().query('COMMIT');    
                res.status(200).redirect('/store/cart');  
            }   
        } catch (error) {
            console.log(error);
            await db.promise().query('ROLLBACK');
            res.status(500).json({message: "Internal server error"});
        }
    } catch (error) {
        console.log(error);
        await db.promise().query('ROLLBACK');
        res.status(500).json({message: "Internal server error"});

    }
}


//For delete from cart actions
const deleteCart = async (req,res,next) =>{
  // Validate pid
  const pid = req.params.id;

  if (!pid) {
    res.status(400).json({message: "Invalid product ID"});
    return;
  }

  // Delete from cart
  try {
    await db.promise().query('START TRANSACTION');
    try{
      await db.promise().query('DELETE cart FROM cart INNER JOIN product ON cart.pid = product.id WHERE cart.pid = ?', [pid]);
      await db.promise().query('COMMIT');
      res.status(200).redirect('/store/cart');
    }catch(err){
      console.log(err);
      await db.promise().query('ROLLBACK');
      res.status(500).json({message: "Internal server error"});
    }
  } catch (error) {
    await db.promise().query('ROLLBACK');
    res.status(500).json({message: "Internal server error"});
  }
};


const addToCart = async (req,res,next) =>{
    const {quantity} = req.body;
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const userID = decoded.id;

    try {
        await db.promise().query('START TRANSACTION');
        try {
            await db.promise().query('INSERT INTO cart (uid, pid, quantity) VALUES (?, ?, ?)', [userID, req.params.id, quantity]);            
            await db.promise().query('COMMIT');
            res.status(200).json({message: "Product added", token: req.cookies.token});
        } catch (error) {
            console.log(error);
            await db.promise().query('ROLLBACK');
            res.status(500).json({message: "Internal server error"})
        }
    } catch (err) {
        console.log(err);
        await db.promise().query('ROLLBACK');
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {getCart, putCart, deleteCart, addToCart};