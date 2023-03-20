const jwt = require('jsonwebtoken')

function checkJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    if (!req.responseSent) {
      req.responseSent = true;
      return res.status(401).render('error', {message: "User is not logged in"});
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (error) {
    if (!req.responseSent) {
      req.responseSent = true;
      return res.status(500).render('error', {message: "Internal server error"});
    }
  }
}


const checkAdmin = (req,res,next)=>{
    const user = req.user;
    console.log(user);
    if(!user || !user.isAdmin){
        if (!req.responseSent) {
          req.responseSent = true;
          return res.status(401).render('error', {message: "Unauthorized Access"})
        }
    }
    next();
}


module.exports = { checkJWT, checkAdmin };
