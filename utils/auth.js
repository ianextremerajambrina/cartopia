const jwt = require('jsonwebtoken');
const Person = require('../models/personModel');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Person.findById(decoded.id).select('+password');

    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'User no longer exists' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', message: 'Invalid token' });
  }
};

// Middleware to restrict by role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ status: 'fail', message: 'Insufficient permissions' });
    }
    next();
  };
};