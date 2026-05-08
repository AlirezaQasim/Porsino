const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { prisma } = require('../config/db'); // استفاده از کلاینت پریزما که ساختیم

// تابع برای ساخت JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    ثبت‌نام کاربر
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('لطفا همه فیلدها را پر کنید');
  }

  // بررسی وجود کاربر در MySQL با استفاده از Prisma
  const userExists = await prisma.user.findUnique({
    where: { email }
  });

  if (userExists) {
    res.status(400);
    throw new Error('کاربر با این ایمیل قبلاً ثبت نام کرده است');
  }

  // هش کردن رمز عبور (در پریزما خودکار انجام نمی‌شود، پس دستی انجام می‌دهیم)
  const hashedPassword = await bcrypt.hash(password, 10);

  // ایجاد کاربر در MySQL
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (user) {
    res.status(201).json({
      message: 'ثبت نام با موفقیت انجام شد',
      id: user.id, // در MySQL از id استفاده می‌کنیم نه _id
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('داده‌های نامعتبر کاربر');
  }
});

// @desc    ورود کاربر
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // پیدا کردن کاربر با پریزما
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      message: 'ورود موفقیت‌آمیز بود',
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('ایمیل یا رمز عبور نامعتبر است');
  }
});

// @desc    دریافت پروفایل
const getUserProfile = asyncHandler(async (req, res) => {
    // پیدا کردن با ID عددی MySQL
    const user = await prisma.user.findUnique({
        where: { id: req.user.id }
    });

    if (user) {
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('کاربر پیدا نشد');
    }
});

module.exports = { registerUser, loginUser, getUserProfile };