const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // دریافت توکن از هدر Authorization
            token = req.headers.authorization.split(' ')[1];

            // تأیید توکن
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // دریافت اطلاعات کاربر از دیتابیس
            req.user = await User.findById(decoded.id).select('-password'); // رمز عبور را حذف کنید

            next(); // به مسیر بعدی بروید
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('توکن نامعتبر است');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('توکن احراز هویت یافت نشد');
    }
});

module.exports = protect;