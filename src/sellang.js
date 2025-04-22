import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import styled, { keyframes } from 'styled-components';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from './themecontext';

// انیمیشن محو شدن برای ورود کامپوننت
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// استایل برای کل صفحه انتخاب زبان
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme?.background}; // استفاده از optional chaining
  color: ${(props) => props.theme?.text}; // استفاده از optional chaining
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// استایل برای کارت اصلی که محتوا در آن قرار دارد
const Card = styled.div`
  background-color: ${(props) => props.theme?.cardBackground}; // استفاده از optional chaining
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  padding: 48px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// استایل برای عنوان اصلی صفحه
const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 36px;
  text-align: center;
  color: ${(props) => props.theme?.heading}; // استفاده از optional chaining
  direction: ${(props) => (props.lang === 'fa' || props.lang === 'ar' ? 'rtl' : 'ltr')};
`;

// استایل برای لیست دکمه‌های انتخاب زبان
const LanguageList = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
`;

// استایل برای دکمه‌های انتخاب زبان
const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  padding: 16px 32px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme?.buttonBackground}; // استفاده از optional chaining
  color: ${(props) => props.theme?.buttonText}; // استفاده از optional chaining
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease;

  &:hover {
    background-color: ${(props) => props.theme?.buttonHover}; // استفاده از optional chaining
    transform: scale(1.05);
  }
`;

// استایل برای متن داخل دکمه‌های زبان
const LanguageText = styled.span`
  margin-left: 12px;
  font-size: 1.2rem;
  color: inherit;
  direction: ${(props) => (props.lang === 'fa' || props.lang === 'ar' ? 'rtl' : 'ltr')};
`;

// استایل برای بخش "درباره ما"
const AboutUs = styled.div`
  margin-top: 48px;
  max-width: 100%;
  text-align: center;
  opacity: 0.9;
  border-top: 1px solid ${(props) => props.theme?.secondaryText}; // استفاده از optional chaining
  padding-top: 24px;
`;

// استایل برای عنوان بخش "درباره ما"
const AboutUsTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${(props) => props.theme?.heading}; // استفاده از optional chaining
`;

// استایل برای متن بخش "درباره ما"
const AboutUsText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${(props) => props.theme?.text}; // استفاده از optional chaining
`;

// استایل برای دکمه تغییر تم (حالت شب/روز)
const ThemeToggleButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  background-color: ${(props) => props.theme?.buttonBackground}; // استفاده از optional chaining
  color: ${(props) => props.theme?.text}; // استفاده از optional chaining
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme?.buttonHover}; // استفاده از optional chaining
    color: ${(props) => props.theme?.buttonHoverText}; // استفاده از optional chaining
  }
`;

// استایل برای دکمه ورود/ثبت‌نام (با ارث‌بری از LanguageButton)
const AuthButton = styled(LanguageButton)`
  font-weight: 600;
  justify-content: center;
  background-color: ${(props) => props.theme?.primary}; // استفاده از optional chaining
  color: ${(props) => props.theme?.buttonText}; // استفاده از optional chaining
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.25);

  &:hover {
    background-color: ${(props) => props.theme?.primaryHover}; // استفاده از optional chaining
    transform: scale(1.08);
  }
`;

// استایل برای متن داخل دکمه ورود/ثبت‌نام
const AuthButtonText = styled.span`
  font-size: 1.2rem;
  color: inherit;
`;

function LanguageSelection() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const themeContext = useTheme(); // دریافت context
  // console.log("themeContext in LanguageSelection:", themeContext);
  const { setLanguage } = themeContext || {}; // استفاده از optional chaining

  // اگر themeContext در دسترس نباشد، یک پیام لودینگ نمایش دهید
  if (!themeContext) {
    return <div>Loading Theme...</div>;
  }

  // تابعی که هنگام انتخاب زبان فراخوانی می‌شود
  const handleLanguageChange = (lng) => {
    setLanguage?.(lng); // فراخوانی تابع setLanguage با استفاده از optional chaining
    // navigate('/login'); // هدایت کاربر به صفحه لاگین
  };

  return (
    <Container>
      <ThemeToggleButton onClick={themeContext?.toggleTheme}> {/* استفاده از optional chaining */}
        {themeContext?.theme?.isDarkMode ? <BsSun /> : <BsMoon />} {/* استفاده از optional chaining */}
      </ThemeToggleButton>
      <Card>
        <Title lang={i18n.language}>{t('welcome')}</Title>
        <LanguageList>
          <LanguageButton onClick={() => handleLanguageChange('fa')}>
            <ReactCountryFlag code="IR" size={32} />
            <LanguageText lang={i18n.language}>فارسی</LanguageText>
          </LanguageButton>
          <LanguageButton onClick={() => handleLanguageChange('en')}>
            <ReactCountryFlag code="US" size={32} />
            <LanguageText lang={i18n.language}>English</LanguageText>
          </LanguageButton>
        </LanguageList>
        <AuthButton onClick={() => navigate('/login')}>
          <AuthButtonText>{t('login_signup')}</AuthButtonText>
        </AuthButton>
        <AboutUs lang={i18n.language}>
          <AboutUsTitle>{t('about_us')}</AboutUsTitle>
          <AboutUsText>{t('about_us_text')}</AboutUsText>
        </AboutUs>
      </Card>
    </Container>
  );
}

export default LanguageSelection;
console.log(LanguageSelection);
// console.log("LanguageSelection component rendered");