const {db} = require('./../index');

const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./../controllers/passport');
const jwt = require('jsonwebtoken')
const {checkJWT} = require('./../controllers/token')

const getCart = async (req,res,next) =>{
    const uid = req.user.id;
    const items = await db.promise().query(`
        SELECT
        product.name,
        product.publisher,
        product.price
    FROM 
        cart
        INNER JOIN product ON cart.pid = product.id
    WHERE
        cart.uid = ?
    `, [uid]);


    console.log(items); // Add this line to check the items variable

    res.status(200).render('cart', {item: req.user.id});
}


//For delete from cart actions
const deleteCart = async (req,res,next) =>{
    //Delete from cart
    try{
        
    }catch(err){
        console.log(err);
    }
}

const addToCart = (req,res,next) =>{

}

module.exports = {getCart, deleteCart, addToCart};