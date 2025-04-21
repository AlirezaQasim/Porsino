import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageSelection from './sellang.js';
import LoginPage from './login.js';
import { ThemeProvider, useTheme } from './themecontext.js';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useTheme();

  useEffect(() => {
    if (currentLanguage && currentLanguage !== i18n.language) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

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