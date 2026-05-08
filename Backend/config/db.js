const { PrismaClient } = require('@prisma/client');

/**
 * در نسخه 7، اگر با خطای مقدار خالی مواجه شدید، 
 * بهتر است یک شیء تنظیمات حتی خالی به سازنده پاس بدهید.
 */
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // فعال کردن لاگ برای عیب‌یابی راحت‌تر
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('✅ MySQL connected via Prisma 7 (Native) successfully.');
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        // اگر دیتابیس وصل نشد، سرور را متوقف نکنیم تا بتوانیم کد را اصلاح کنیم، 
        // اما در محیط عملیاتی معمولا process.exit(1) میزنیم.
    }
};

module.exports = { prisma, connectDB };