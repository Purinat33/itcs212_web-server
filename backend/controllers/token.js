const jwt = require('jsonwebtoken');

function checkJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({message: "User is not logged in"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (error) {
    return res.status(401).json({message: "Invalid token"});
  }
}

function checkAdmin(req, res, next) {
  const user = req.user;
  if (!user || !user.isAdmin) {
    return res.status(401).json({message: "Unauthorized Access"})
  }
  next();
}

function checkUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if (!token) {
    req.user = { role: 'guest' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.isAdmin ? 'admin' : 'user' };
    next();
  } catch (error) {
    req.user = { role: 'guest' };
    return res.status(401).json({message: "Invalid token"});
  }
}

module.exports = { checkJWT, checkAdmin, checkUser };
