const asyncHandler = require('express-async-handler'); // <--- این رو اضافه کنید
const jwt = require('jsonwebtoken'); // <--- این رو اضافه کنید
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// تابع برای ساخت JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // توکن بعد از 30 روز منقضی می‌شود
  });
};

// @desc    ثبت‌نام کاربر
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => { // <--- تابع رو داخل asyncHandler قرار دهید
  const { username, email, password } = req.body;

  // بررسی وجود فیلدها
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('لطفا همه فیلدها را پر کنید');
  }

  // بررسی وجود کاربر
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('کاربر با این ایمیل قبلاً ثبت نام کرده است');
  }

  // ایجاد کاربر
  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      message: 'ثبت نام با موفقیت انجام شد',
      _id: user._id,
      username: user.username,
      email: user.email,
      level: user.level,
      avatar: user.avatar,
      token: generateToken(user._id), // <--- ارسال توکن به کاربر
    });
  } else {
    res.status(400);
    throw new Error('داده‌های نامعتبر کاربر');
  }
});

// @desc    ورود کاربر و دریافت توکن
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => { // <--- تابع رو داخل asyncHandler قرار دهید
  const { email, password } = req.body;

  // بررسی وجود ایمیل کاربر
  const user = await User.findOne({ email }).select('+password'); // <--- رمز عبور را انتخاب کنید

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      message: 'ورود موفقیت‌آمیز بود',
      _id: user._id,
      username: user.username,
      email: user.email,
      level: user.level,
      avatar: user.avatar,
      token: generateToken(user._id), // <--- ارسال توکن
    });
  } else {
    res.status(401); // 401: Unauthorized
    throw new Error('ایمیل یا رمز عبور نامعتبر است');
  }
});

// @desc    دریافت اطلاعات پروفایل کاربر
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            level: user.level,
            avatar: user.avatar,
        });
    } else {
        res.status(404);
        throw new Error('کاربر پیدا نشد');
    }
});


module.exports = {
  registerUser,
  loginUser,
  getUserProfile, // <--- این رو اضافه کنید
};