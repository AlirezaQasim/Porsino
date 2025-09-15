const mongoose = require('mongoose');

// متغیر محیطی URL اتصال به دیتابیس
const DB_URI = process.env.MONGO_URI;

// تابع اتصال به دیتابیس
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        // خروج از فرآیند با شکست
        process.exit(1);
    }
};

module.exports = connectDB;