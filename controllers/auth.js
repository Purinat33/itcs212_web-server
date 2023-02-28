//User from DB
const {db} = require('./../server/index');
const path = require('path');
const fs = require('fs')
const { dirname } = require('path');
//Connect to db and query all the users
//The pool is in db

const login = (req,res) =>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'auth', 'login.html'));
}

const register = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, '..', 'server', 'public', 'auth', 'register.html'));
}

module.exports = {login, register}
