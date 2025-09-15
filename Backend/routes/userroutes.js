const express = require('express');
const { registerUser } = require('../controllers/usercontroller');
const router = express.Router();

// مسیر POST برای ثبت‌نام کاربر
router.post('/register', registerUser);

module.exports = router;