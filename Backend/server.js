const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// <--- ایمپورت کردن روت‌ها
const userRoutes = require('./routes/userroutes');
// ایمپورت کردن روت‌ها --->

connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// <--- اتصال روت‌ها به اپلیکیشن
app.use('/api/users', userRoutes);
// اتصال روت‌ها به اپلیکیشن --->

app.get('/', (req, res) => {
    res.send('Welcome to the Exam Prep Backend!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});