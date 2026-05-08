const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { prisma } = require('../config/db'); // اتصال به پریزما

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // دریافت اطلاعات کاربر از MySQL با استفاده از ID استخراج شده از توکن
            // با استفاده از select می‌توانیم انتخاب کنیم که پسورد برنگردد
            req.user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true
                }
            });

            if (!req.user) {
                res.status(401);
                throw new Error('کاربر متعلق به این توکن دیگر وجود ندارد');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('توکن نامعتبر است یا منقضی شده');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('توکن احراز هویت یافت نشد');
    }
});

module.exports = protect;