const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile, getUserProfile } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile/:id', updateUserProfile);
router.get("/profile/:id", getUserProfile);

module.exports = router;
