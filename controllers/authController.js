const jwt = require('jsonwebtoken');
const Person = require('../models/personModel');
const { body, validationResult } = require('express-validator');

// Helper to create JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Endpoint: POST /api/v1/register
// Register a new user (default role: Cliente)
exports.register = [
  body('name').notEmpty().trim(),
  body('identificacion').notEmpty().isLength({ min: 9 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  //body('fechaRegistro').isISO8601(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'fail', errors: errors.array() });
    }

    try {
      const newUser = await Person.create({
        ...req.body,
        rol: req.body.rol || 'Cliente', // Default to Cliente
      });

      const token = signToken(newUser._id);

      res.status(201).json({
        status: 'success',
        token,
        data: { user: { id: newUser._id, name: newUser.name, email: newUser.email, rol: newUser.rol } },
      });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  },
];

// Endpoint: POST /api/v1/login
// Login
exports.login = [
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'fail', errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await Person.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
      }

      const token = signToken(user._id);

      res.status(200).json({
        status: 'success',
        token,
        data: { user: { id: user._id, name: user.name, email: user.email, rol: user.rol } },
      });
    } catch (err) {
      res.status(500).json({ status: 'fail', message: 'Server error' });
      console.log(err);
    }
  },
];

// Endpoint: POST /api/v1/logout
// Logout (client-side, just return success)
exports.logout = (req, res) => {
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};