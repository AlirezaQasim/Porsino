import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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

    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('appLanguage') || i18n.language);

    useEffect(() => {
        localStorage.setItem('darkMode', theme.isDarkMode);
        setTheme(prevTheme => ({
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

    useEffect(() => {
        localStorage.setItem('appLanguage', currentLanguage);
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage, i18n]);

    const toggleTheme = () => {
        setTheme({ ...theme, isDarkMode: !theme.isDarkMode });
    };

    const setLanguage = (lng) => {
        setCurrentLanguage(lng);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, currentLanguage, setLanguage }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);