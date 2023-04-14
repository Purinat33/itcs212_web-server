const jwt = require('jsonwebtoken');

const checkJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' }); // handle unauthorized access
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' }); // handle unauthorized access
    }

    req.user = { id: decodedToken.id, isAdmin: decodedToken.isAdmin };
    next();
  });
};

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
