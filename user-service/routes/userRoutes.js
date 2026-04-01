const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controller/userController');
const auth = require('../middleware/auth');

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'User Service is working!' });
});

router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;