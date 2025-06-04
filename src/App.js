import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageSelection from './pages/sellang.js';
import LoginPage from './pages/login.js';
import { ThemeProvider } from './contexts/themecontext.js';
import ForgotPasswordPage from './pages/forgetpass.js';
import SignUpPage from './pages/signup.js';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgetpass" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* ... سایر روت‌ها */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;