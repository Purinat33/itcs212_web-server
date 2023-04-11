const jwt = require('jsonwebtoken')

function checkJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    if (!req.responseSent) {
      req.responseSent = true;
    }
    return res.status(401).json({message: "User is not logged in"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };    
    
    next();
  } catch (error) {
    if (!req.responseSent) {
      req.responseSent = true;
    }
    return res.status(401).json({message: "Invalid token"});
  }
}


const checkAdmin = (req,res,next)=>{
    const user = req.user;
    if(!user || !user.isAdmin){
        if (!req.responseSent) {
          req.responseSent = true;
        }
        return res.status(401).json({message: "Unauthorized Access"})
    }
    next();
}

//  Middleware to check for a valid JWT token in the user's cookies
//  Note that this function is quite different from the checkJWT function
//  This one is just for checking if a cookie exists on a non-critical level like home page etc.
function checkUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    req.user = { role: 'guest' }; // Set user role as guest
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.isAdmin ? 'admin' : 'user' };
    next();
  } catch (error) {
    req.user = { role: 'guest' }; // Set user role as guest
    return res.status(401).json({message: "Invalid token"}); // Return 401 if token is invalid
  }
}



module.exports = { checkJWT, checkAdmin, checkUser};
