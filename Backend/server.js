// 1. ایمپورت کردن ماژول Express
const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('./routes/route'); // ایمپورت کردن روتر

// 2. ایجاد یک نمونه از اپلیکیشن Express
const app = express();

// 3. تعریف پورت برای سرور
// اگر متغیر محیطی PORT تنظیم شده بود از اون استفاده کن، در غیر این صورت از پورت 8080 استفاده کن
const PORT = process.env.PORT || 8080;

// ******** تنظیمات CORS ********
// <--- استفاده از میانی‌افزار CORS
// این خط به Express می‌گه که به درخواست‌هایی از هر مبدایی اجازه دسترسی بده.
// در محیط توسعه، این کار معمولاً امنه.
// در محیط پروداکشن، بهتره فقط به مبدا فرانت‌اند خودتون اجازه بدید.

app.use(cors());
// استفاده از میانی‌افزار CORS --->

// در محیط پروداکشن
// app.use(cors({
//   origin: 'http://your-frontend-domain.com' // آدرس دقیق فرانت‌اند شما
// }));

// یا برای چند دامنه
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://your-frontend-domain.com']
// }));

// ******** تنظیمات CORS ********

// 4. تعریف اولین Endpoint (مسیر)
// وقتی درخواستی از نوع GET به ریشه سرور ('/') ارسال بشه
app.get('/', (req, res) => {
    // یک پاسخ متنی ساده به کلاینت ارسال می‌کنه
    res.send('wellcome to the backend !!');
});
app.get('/api/data', (req, res) => {
    res.json({ message: 'GET request received!' });
});

app.use(express.json()); // برای پارس کردن JSON در بدنه درخواست‌ها



// app.post('/api/data', (req, res) => {
//     console.log('Received JSON data:', req.body); // داده‌های JSON پارس شده در req.body موجودند
//     res.json({ message: 'Data received successfully!', yourData: req.body });
// });

// 5. راه‌اندازی سرور برای گوش دادن به درخواست‌ها
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access it at: http://localhost:${PORT}`);
});