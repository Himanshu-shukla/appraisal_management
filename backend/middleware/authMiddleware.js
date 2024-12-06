const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.role !== 'admin') return res.status(403).send({ message: 'Require Admin Role' });
  next();
};

const isStaff = (req, res, next) => {
  if (req.role !== 'staff') return res.status(403).send({ message: 'Require Staff Role' });
  next();
};

module.exports = { verifyToken, isAdmin, isStaff };