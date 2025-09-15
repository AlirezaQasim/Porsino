const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/usercontroller');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // <--- این رو اضافه کنید

// مسیر POST برای ثبت‌نام کاربر
router.post('/register', registerUser);
// مسیر POST برای ورود کاربر
router.post('/login', loginUser);
// مسیر GET برای دریافت اطلاعات پروفایل (مسیر محافظت شده)
router.get('/profile', protect, getUserProfile); // <--- protect رو به عنوان میانی‌افزار اضافه کنید

module.exports = router;