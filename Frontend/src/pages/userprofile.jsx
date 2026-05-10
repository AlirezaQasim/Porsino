import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/themecontext';
import { useNavigate } from 'react-router-dom'; // <--- این را اضافه کنید
import { BsPersonCircle, BsEnvelope, BsKey, BsCalendar, BsArrowBarLeft } from 'react-icons/bs'; // <--- BsArrowBarLeft را اضافه کنید

// ======================= استایل‌های کلی (بدون تغییر) =======================

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PageContainer = styled.div`
  flex-grow: 1;
  padding: 2rem;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  animation: ${fadeIn} 0.5s ease-in-out;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.heading};
  margin-bottom: 2.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Section = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.6rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 14px;
  border: 1px solid ${(props) => props.theme.secondaryText};
  border-radius: 8px;
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  padding: 14px;
  border: 1px solid ${(props) => props.theme.secondaryText};
  border-radius: 8px;
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
  width: 100%;
  box-sizing: border-box;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236c757d'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.8em auto, 100%;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const Option = styled.option`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;


const Button = styled.button`
  padding: 14px 28px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.buttonText};
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: auto;
  align-self: flex-end;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }

  &:disabled {
    background-color: ${(props) => props.theme.secondaryText};
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-size: 0.95rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  color: ${(props) => (props.type === 'error' ? '#dc3545' : '#28a745')};
  text-align: right;
`;

const UserInfoDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.secondaryText};
  object-fit: cover;
  border: 3px solid ${(props) => props.theme.primary};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  font-size: 1.8rem;
  color: ${(props) => props.theme.heading};
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.secondaryText};
  margin: 0;
`;

// <--- استایل جدید برای دکمه "بازگشت به ورود"
const ReturnToLoginButton = styled(Button)`
  background-color: ${(props) => props.theme.secondaryText};
  color: ${(props) => props.theme.buttonText};
  margin-top: 3rem; /* فاصله از آخرین سکشن */
  width: fit-content;
  align-self: center; /* در وسط قرار گیرد */

  &:hover {
    background-color: #6c757d; /* یک رنگ کمی تیره‌تر در هاور */
  }
`;
// استایل جدید برای دکمه "بازگشت به ورود" --->


// ======================= کامپوننت UserProfilePage =======================

function UserProfilePage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate(); // <--- اینجا اضافه کنید

  // داده‌های نمونه کاربر (این‌ها باید از Backend و وضعیت احراز هویت شما بیایند)
  const [user, setUser] = useState({
    username: 'usertest',
    email: 'user.test@example.com',
    avatarUrl: 'https://via.placeholder.com/80' // یک تصویر پیش‌فرض
  });

  // State برای فرم ویرایش پروفایل
  const [editUsername, setEditUsername] = useState(user.username);
  const [editEmail, setEditEmail] = useState(user.email);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileMessageType, setProfileMessageType] = useState('');

  // State برای فرم تغییر رمز عبور
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordMessageType, setPasswordMessageType] = useState('');

  // State برای تنظیمات آموزشی
  const availableYears = [2024, 2023, 2022, 2021, 2020]; // سال‌های موجود
  const availableTopics = [
    t('topic_data_structures'),
    t('topic_algorithms'),
    t('topic_operating_systems'),
    t('topic_databases'),
    t('topic_compiler_design')
  ]; // موضوعات موجود
  const [selectedYear, setSelectedYear] = useState(2024); // سال پیش‌فرض
  const [selectedTopic, setSelectedTopic] = useState(''); // موضوع پیش‌فرض
  const [settingsMessage, setSettingsMessage] = useState('');
  const [settingsMessageType, setSettingsMessageType] = useState('');


  // useEffect برای به‌روزرسانی فرم‌ها وقتی داده‌های کاربر تغییر می‌کند
  useEffect(() => {
    setEditUsername(user.username);
    setEditEmail(user.email);
  }, [user]);

  // ======================= هندلرهای فرم =======================

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileMessageType('');

    if (editUsername.trim() === '' || editEmail.trim() === '') {
        setProfileMessage(t('profile_fields_empty'));
        setProfileMessageType('error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
        setProfileMessage(t('invalid_email_format'));
        setProfileMessageType('error');
        return;
    }

    console.log('Update Profile:', { username: editUsername, email: editEmail });
    // شبیه‌سازی API call
    setTimeout(() => {
      setUser(prev => ({ ...prev, username: editUsername, email: editEmail }));
      setProfileMessage(t('profile_updated_success'));
      setProfileMessageType('success');

      // <--- افزودن هدایت به صفحه لاگین پس از تغییرات مهم
      setTimeout(() => {
        navigate('/login');
      }, 1500); // مثلاً 1.5 ثانیه صبر کند تا کاربر پیام را ببیند
      // افزودن هدایت به صفحه لاگین پس از تغییرات مهم --->
    }, 1000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordMessageType('');

    if (currentPassword === '' || newPassword === '' || confirmNewPassword === '') {
        setPasswordMessage(t('password_fields_empty'));
        setPasswordMessageType('error');
        return;
    }
    if (newPassword !== confirmNewPassword) {
        setPasswordMessage(t('passwords_not_match'));
        setPasswordMessageType('error');
        return;
    }
    if (newPassword.length < 6) {
        setPasswordMessage(t('password_too_short'));
        setPasswordMessageType('error');
        return;
    }

    console.log('Change Password:', { currentPassword, newPassword });
    // شبیه‌سازی API call
    setTimeout(() => {
      setPasswordMessage(t('password_changed_success'));
      setPasswordMessageType('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      // <--- افزودن هدایت به صفحه لاگین پس از تغییرات رمز عبور
      setTimeout(() => {
        navigate('/login');
      }, 1500); // مثلاً 1.5 ثانیه صبر کند تا کاربر پیام را ببیند
      // افزودن هدایت به صفحه لاگین پس از تغییرات رمز عبور --->
    }, 1000);
  };

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    setSettingsMessage('');
    setSettingsMessageType('');

    console.log('Update Learning Settings:', { selectedYear, selectedTopic });
    // شبیه‌سازی API call
    setTimeout(() => {
      setSettingsMessage(t('settings_saved_success'));
      setSettingsMessageType('success');

      // <--- افزودن هدایت به صفحه لاگین پس از تغییرات تنظیمات (مثلاً سطح کاربری)
      // این بخش را فقط در صورتی اضافه کنید که تغییرات تنظیمات آموزشی واقعاً
      // نیاز به Re-login داشته باشد (مثلاً اگر سطح دسترسی کاربر را تغییر دهد).
      // در غیر این صورت، نیازی به این Re-login نیست.
      // من برای سناریوی شما آن را اضافه می‌کنم:
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      // افزودن هدایت به صفحه لاگین پس از تغییرات تنظیمات --->
    }, 1000);
  };

  return (
    <PageContainer theme={theme}>
      <Header theme={theme}>{t('user_profile')}</Header>

      {/* بخش اطلاعات کلی کاربر */}
      <Section theme={theme}>
        <SectionTitle theme={theme}>
          <BsPersonCircle /> {t('personal_info')}
        </SectionTitle>
        <UserInfoDisplay>
          <UserAvatar src={user.avatarUrl} alt="User Avatar" />
          <UserDetails>
            <UserName theme={theme}>{user.username}</UserName>
            <UserEmail theme={theme}>{user.email}</UserEmail>
          </UserDetails>
        </UserInfoDisplay>

        <FormRow>
          <Label theme={theme} htmlFor="username">{t('username')}</Label>
          <Input
            id="username"
            type="text"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            theme={theme}
          />
        </FormRow>
        <FormRow>
          <Label theme={theme} htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            theme={theme}
          />
        </FormRow>
        {profileMessage && <Message type={profileMessageType}>{profileMessage}</Message>}
        <Button onClick={handleProfileUpdate} theme={theme}>
          {t('update_profile')}
        </Button>
      </Section>

      {/* بخش تغییر رمز عبور */}
      <Section theme={theme}>
        <SectionTitle theme={theme}>
          <BsKey /> {t('change_password')}
        </SectionTitle>
        <FormRow>
          <Label theme={theme} htmlFor="currentPassword">{t('current_password')}</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            theme={theme}
          />
        </FormRow>
        <FormRow>
          <Label theme={theme} htmlFor="newPassword">{t('new_password')}</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            theme={theme}
          />
        </FormRow>
        <FormRow>
          <Label theme={theme} htmlFor="confirmNewPassword">{t('confirm_new_password')}</Label>
          <Input
            id="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            theme={theme}
          />
        </FormRow>
        {passwordMessage && <Message type={passwordMessageType}>{passwordMessage}</Message>}
        <Button onClick={handleChangePassword} theme={theme}>
          {t('change_password_button')}
        </Button>
      </Section>

      {/* بخش تنظیمات محتوای آموزشی */}
      <Section theme={theme}>
        <SectionTitle theme={theme}>
          <BsCalendar /> {t('learning_settings')}
        </SectionTitle>
        <FormRow>
          <Label theme={theme} htmlFor="examYear">{t('select_exam_year')}</Label>
          <Select
            id="examYear"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            theme={theme}
          >
            {availableYears.map((year) => (
              <Option key={year} value={year} theme={theme}>{year}</Option>
            ))}
          </Select>
        </FormRow>
        <FormRow>
          <Label theme={theme} htmlFor="examTopic">{t('select_exam_topic')}</Label>
          <Select
            id="examTopic"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            theme={theme}
          >
            <Option value="" theme={theme}>{t('all_topics')}</Option>
            {availableTopics.map((topic) => (
              <Option key={topic} value={topic} theme={theme}>{topic}</Option>
            ))}
          </Select>
        </FormRow>
        {settingsMessage && <Message type={settingsMessageType}>{settingsMessage}</Message>}
        <Button onClick={handleSettingsUpdate} theme={theme}>
          {t('save_settings')}
        </Button>
      </Section>

      {/* دکمه بازگشت به صفحه ورود */}
      <ReturnToLoginButton onClick={() => navigate('/login')} theme={theme}>
        <BsArrowBarLeft style={{ marginRight: '8px' }} />
        {t('return_to_login')}
      </ReturnToLoginButton>
    </PageContainer>
  );
}

export default UserProfilePage;