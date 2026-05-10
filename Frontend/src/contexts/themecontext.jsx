import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

// ایجاد Context برای تم
const ThemeContext = createContext();

// Provider برای فراهم کردن context تم و زبان به کامپوننت‌های فرزند
export const ThemeProvider = ({ children }) => {
    // State برای نگهداری اطلاعات تم
    const [theme, setTheme] = useState({
        isDarkMode: localStorage.getItem('darkMode') === 'true' || false,
        background: localStorage.getItem('darkMode') === 'true' ? '#121212' : '#f0f0f0',
        text: localStorage.getItem('darkMode') === 'true' ? '#f0f0f0' : '#121212',
        primary: '#007bff',
        primaryHover: '#0056b3',
        secondaryText: '#6c757d',
        buttonBackground: localStorage.getItem('darkMode') === 'true' ? '#333' : '#fff',
        buttonText: localStorage.getItem('darkMode') === 'true' ? '#fff' : '#333',
        buttonHover: localStorage.getItem('darkMode') === 'true' ? '#555' : '#ddd',
        buttonHoverText: localStorage.getItem('darkMode') === 'true' ? '#fff' : '#333',
        cardBackground: localStorage.getItem('darkMode') === 'true' ? '#222' : '#fff',
        heading: localStorage.getItem('darkMode') === 'true' ? '#fff' : '#333',
    });

    // استفاده از هوک useTranslation برای دسترسی به instance i18n
    const { i18n } = useTranslation();

    // State برای نگهداری زبان فعلی برنامه
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || i18n.language || 'en';
    });

    // Effect برای ذخیره تغییرات تم در localStorage و به‌روزرسانی state تم
    useEffect(() => {
        localStorage.setItem('darkMode', theme.isDarkMode);
        setTheme((prevTheme) => ({
            ...prevTheme,
            background: prevTheme.isDarkMode ? '#121212' : '#f0f0f0',
            text: prevTheme.isDarkMode ? '#f0f0f0' : '#121212',
            buttonBackground: prevTheme.isDarkMode ? '#333' : '#fff',
            buttonText: prevTheme.isDarkMode ? '#fff' : '#333',
            buttonHover: prevTheme.isDarkMode ? '#555' : '#ddd',
            buttonHoverText: prevTheme.isDarkMode ? '#fff' : '#333',
            cardBackground: prevTheme.isDarkMode ? '#222' : '#fff',
            heading: prevTheme.isDarkMode ? '#fff' : '#333',
            
        }));
    }, [theme.isDarkMode]);

    // Effect برای ذخیره تغییرات زبان در localStorage و تغییر زبان i18n
    useEffect(() => {
        localStorage.setItem('appLanguage', currentLanguage);
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage, i18n]);

    // تابع برای تغییر حالت تم
    const toggleTheme = () => {
        setTheme((prevTheme) => ({ ...prevTheme, isDarkMode: !prevTheme.isDarkMode }));
    };

    // تابع برای تغییر زبان برنامه
    const setLanguage = (lng) => {
        setCurrentLanguage(lng);
    };

    // فراهم کردن مقادیر تم، تابع تغییر تم، زبان فعلی و تابع تغییر زبان برای کامپوننت‌های فرزند
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, currentLanguage, setLanguage }}>
            {children}
        </ThemeContext.Provider>
    );
};

// هوک سفارشی برای استفاده آسان از context تم در کامپوننت‌های فرزند
export const useTheme = () => useContext(ThemeContext);