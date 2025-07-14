import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/themecontext';

// import i18n from 'i18next';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 20px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  color: ${(props) => props.theme.heading};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.label};
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${(props) => props.theme.primary};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 14px 20px;
  border: none;
  border-radius: 6px;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.buttonText};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;
// تعریف استایل کامپوننت برای دکمه‌ها
// این استایل برای دکمه‌های ناوبری زیر فرم استفاده می‌شود
// این استایل به دکمه‌ها ظاهری یکسان می‌دهد و فاصله بین آن‌ها را تنظیم می‌کند دقیقا مانند فورم دکمه لاگین
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
// const LinkContainer = styled.div`
//   margin-top: 25px;
//   text-align: center;
// `;

// const StyledLink = styled.span`
//   font-size: 0.95rem;
//   color: ${(props) => props.theme.secondaryText};
//   cursor: pointer;
//   transition: color 0.3s ease;

//   &:hover {
//     color: ${(props) => props.theme.primary};
//     text-decoration: underline;
//   }

//   &:not(:last-child) {
//     margin-right: 15px;
//   }
// `;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with:', username, password);
    navigate('/dashboard');
  console.log("login رندر شد",LoginPage);

  };//نوشتن تابعی جهت مقایسه یوزر و پسورد برای تایید ورود به پنل داشبرد

  return (
    <Container theme={theme}>
      <Card theme={theme}>
        <Title theme={theme}>{t('login')}</Title>
        <Form theme={theme} onSubmit={handleSubmit}>
          <FormGroup>
            <Label theme={theme}>{t('username')}</Label>
            <Input
              theme={theme}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('username')}
            />
          </FormGroup>
          <FormGroup>
            <Label theme={theme}>{t('password')}</Label>
            <Input
              theme={theme}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('password')}
            />
          </FormGroup>
          <Button theme={theme} type="submit">{t('login')}</Button>
        </Form>
                {/* Add navigation buttons below the form */}
                {/* استفاده از استایلی که در کامپوننت های بالا تعریف کردیم */}
        <ButtonGroup>
          <Button
            theme={theme}
            type="button"
            onClick={() => navigate('/signup')}
          >
            {t('sign_up_button')}
          </Button>
          <Button
            theme={theme}
            type="button"
            onClick={() => navigate('/forgetpass')}
          >
            {t('forgot_password_button')}
          </Button>
          <Button
            theme={theme}
            type="button"
            onClick={() => navigate('/')}
          >
            {t('back_button')}
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
}

export default LoginPage;