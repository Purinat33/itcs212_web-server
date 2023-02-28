//User from DB
const {db} = require('./../server/index');
const path = require('path');
//Connect to db and query all the users
//The pool is in db

const login = (req,res) =>{
    const page = path.join(__dirname, 'auth/login.html');
    res.status(200).send(page);
}

const register = (req,res)=>{

}

module.exports = {login, register}
