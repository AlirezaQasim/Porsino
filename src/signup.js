import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from './themecontext';

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
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  padding: 48px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 36px;
  text-align: center;
  color: ${(props) => props.theme.heading};
`;

const Input = styled.input`
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid ${(props) => props.theme.secondaryText};
  border-radius: 8px;
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }
`;

const Button = styled.button`
  padding: 16px 32px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.buttonText};
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const LinkButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  font-size: 1rem;
  margin-top: 12px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

function SignUpPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme();

    const handleSignUp = () => {
        // منطق ساخت اکانت جدید
        console.log('اطلاعات ثبت نام:', { username, email, password });
        // پس از ثبت نام موفق، احتمالاً کاربر را به صفحه دیگری هدایت کنید
    };

    return (
        <Container theme={theme}>
            <Card theme={theme}>
                <Title>{t('sign_up_title')}</Title>
                <Input
                    type="text"
                    placeholder={t('username_placeholder')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder={t('email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder={t('password_placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleSignUp}>{t('sign_up_button')}</Button>
                <LinkButton onClick={() => navigate('/login')}>{t('already_have_account')}</LinkButton>
            </Card>
        </Container>
    );
}

export default SignUpPage;