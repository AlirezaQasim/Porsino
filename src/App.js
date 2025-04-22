import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageSelection from './sellang.js';
import LoginPage from './login.js';
import { ThemeProvider } from './themecontext.js';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/login" element={<LoginPage />} />
          {/* ... سایر روت‌ها */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;