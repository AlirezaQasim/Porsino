const express = require('express');
const router = express.Router(); // <--- Express Router را ایمپورت می‌کنیم

// <--- ایمپورت کردن کنترلرها
// فعلاً، منطق رو مستقیماً اینجا می‌نویسیم.
// اما در آینده، این رو به یک فایل کنترلر منتقل می‌کنیم:
// const testController = require('../controllers/testController');
// router.post('/data', testController.handleData);
// ایمپورت کردن کنترلرها --->

// تعریف یک مسیر POST برای /api/data
router.post('/data', (req, res) => {
    console.log('Received JSON data via test route:', req.body);
    res.json({ message: 'Data handled by test route!', received: req.body });
});

module.exports = router; // <--- روتر را اکسپورت می‌کنیم