const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "No token provided." });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err)
      return res.status(403).json({ error: "Invalid token." });

    req.user = decoded;
    next();
  });
};

module.exports = authenticateJWT;
