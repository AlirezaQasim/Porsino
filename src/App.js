// import React from 'react';//نیازی به استفاده نیست زیرا در themecotext.js استفاده شده است
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageSelection from './pages/sellang.js';
import LoginPage from './pages/login.js';
import { ThemeProvider } from './contexts/themecontext.js';
import ForgotPasswordPage from './pages/forgetpass.js';
import SignUpPage from './pages/signup.js';
import DashboardPage from './pages/dashboard.js'; // مسیر پنل داشبورد 
import UserProfilePage from './pages/userprofile.js';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/login" element={<LoginPage />} />{/*مسیر پنل لاگین */}
          <Route path="/dashboard" element={<DashboardPage/>} /> {/* مسیر پنل داشبورد */}
          <Route path="/profile" element={<UserProfilePage />} /> {/* مسیر پنل پروفایل */}
          <Route path="/forgetpass" element={<ForgotPasswordPage />} /> {/* مسیر پنل فراموشی پسورد */}
          <Route path="/signup" element={<SignUpPage />} /> {/* مسیر پنل ثبت نام */}
          {/*در اینجا برای مسیر دهی نیازی به استفاده از ./pages/ نیست زیرا در ایمپورت ها مشخص شده است*/}
          {/* ... سایر روت‌ها */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;