const User = require('../models/user');

// @desc    ثبت‌نام کاربر
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // بررسی وجود کاربر با ایمیل یا نام کاربری تکراری
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'نام کاربری یا ایمیل قبلاً ثبت شده است' });
    }

    // ایجاد کاربر جدید
    const user = await User.create({
      username,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        message: 'ثبت‌نام با موفقیت انجام شد',
        _id: user._id,
        username: user.username,
        email: user.email,
        level: user.level,
        avatar: user.avatar
      });
    } else {
      res.status(400).json({ message: 'داده‌های نامعتبر کاربر' });
    }
  } catch (error) {
    // مدیریت خطاهای اعتبارسنجی Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error(error);
    res.status(500).json({ message: 'خطای سرور' });
  }
};

module.exports = { registerUser };