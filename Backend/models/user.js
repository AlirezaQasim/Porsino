const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// تعریف طرحواره (Schema) برای کاربر
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'لطفا نام کاربری را وارد کنید'],
        unique: true, // نام کاربری باید یکتا باشد
        trim: true // فاصله های اضافی ابتدا و انتها حذف شود
    },
    email: {
        type: String,
        required: [true, 'لطفا ایمیل را وارد کنید'],
        unique: true, // ایمیل باید یکتا باشد
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'لطفا یک آدرس ایمیل معتبر وارد کنید'
        ]
    },
    password: {
        type: String,
        required: [true, 'لطفا رمز عبور را وارد کنید'],
        minlength: [6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'],
        select: false // وقتی یک کاربر را از دیتابیس می گیریم، رمز عبور نمایش داده نشود
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/80' // آواتار پیش‌فرض
    },
    level: {
        type: String,
        enum: ['دانشجو', 'استاد', 'مدیر'], // سطح‌های کاربری مجاز
        default: 'دانشجو'
    },
    createdAt: {
        type: Date,
        default: Date.now // زمان ثبت‌نام کاربر
    }
});

// میانی‌افزار (Middleware) برای هش کردن رمز عبور قبل از ذخیره
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { // اگر رمز عبور تغییر نکرده بود
        next();
    }
    // تولید salt و هش کردن پسورد
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);