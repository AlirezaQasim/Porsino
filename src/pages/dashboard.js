import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/themecontext';
import {
    BsSun, BsMoon, BsHouseDoor, BsBook, BsQuestionCircle, BsGear, BsBoxArrowRight,
    BsBell, BsCalendarCheck, BsInfoCircle, BsCheckCircleFill, BsPersonFill // آیکون جدید
} from 'react-icons/bs';

// ======================= استایل‌های کلی =======================

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// ======================= استایل‌های سایدبار (بدون تغییر عمده) =======================
const Sidebar = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.cardBackground};
  padding: 2rem 1.5rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 1rem;
    flex-direction: row;
    justify-content: space-around;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid ${(props) => props.theme.secondaryText};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.secondaryText};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.primary};
  margin-right: 10px;
`;

const AppName = styled.h2`
  font-size: 1.6rem;
  color: ${(props) => props.theme.heading};
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    color: ${(props) => props.theme.primary};
  }

  &.active {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.buttonText};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    flex-direction: column;
    text-align: center;
    gap: 0.3rem;
    font-size: 0.9rem;
  }
`;

const NavIcon = styled.span`
  font-size: 1.4rem;
`;

const SidebarFooter = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.secondaryText};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ThemeLanguageSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: ${(props) => props.theme.cardBackground};
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
  }
`;

const SettingButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const LogoutButton = styled(SettingButton)`
  color: #dc3545;
  &:hover {
    color: #c82333;
  }
`;

// ======================= استایل‌های محتوای اصلی =======================

const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.heading};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NotificationContainer = styled.div`
  position: relative;
  margin-left: auto;
  @media (max-width: 768px) {
    position: static;
    margin-left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  font-size: 1.8rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;
  pointer-events: none;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme.secondaryText};

  @media (max-width: 480px) {
    width: 95vw;
    right: 2.5vw;
  }
`;

const DropdownHeader = styled.h4`
  font-size: 1.3rem;
  color: ${(props) => props.theme.heading};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.secondaryText};
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  padding: 0.8rem 0;
  border-bottom: 1px solid ${(props) => props.theme.secondaryText};
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
`;

const NotificationIcon = styled.span`
  font-size: 1.2rem;
  color: ${(props) => props.type === 'exam' ? props.theme.primary : props.theme.secondaryText};
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotificationTitle = styled.h5`
  font-size: 1rem;
  margin: 0;
  color: ${(props) => props.theme.text};
  font-weight: ${(props) => (props.read ? 'normal' : 'bold')};
`;

const NotificationTime = styled.span`
  font-size: 0.85rem;
  color: ${(props) => props.theme.secondaryText};
  margin-top: 0.2rem;
`;

const MarkAllReadButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.secondaryText};
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardIcon = styled.span`
  font-size: 2.5rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: ${(props) => props.theme.heading};
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${(props) => props.theme.heading};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const RecentActivityList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ActivityItem = styled.li`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const ActivityText = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.text};
`;

const ActivityDate = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.secondaryText};
`;

// ======================= استایل‌های جدید برای User Profile Hover Card =======================

const UserProfileHoverArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer; /* نشانگر ماوس برای کلیک */
  margin-left: 20px; /* فاصله از دکمه نوتیفیکیشن */
  /* Hide on mobile, it will be in sidebar */
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.secondaryText};
  object-fit: cover;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

const ProfileHoverCard = styled.div`
  position: absolute;
  top: calc(100% + 10px); /* کمی پایین‌تر از آواتار */
  right: 0; /* در سمت راست آواتار */
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  width: 250px; /* عرض کارت پروفایل */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.secondaryText};
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;

  ${UserProfileHoverArea}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const HoverAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.secondaryText};
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid ${(props) => props.theme.primary};
`;

const HoverName = styled.h4`
  font-size: 1.3rem;
  color: ${(props) => props.theme.heading};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const HoverLevel = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.primary};
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const HoverEmail = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.secondaryText};
  margin-bottom: 1rem;
  text-align: center;
  word-break: break-all; /* برای شکستن کلمات طولانی مثل ایمیل */
`;

const ViewProfileButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.secondaryText};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;


// ======================= کامپوننت DashboardPage =======================

function DashboardPage() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme, setLanguage, currentLanguage } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    // مثال داده‌های کاربر (این‌ها باید از Backend و وضعیت احراز هویت شما بیایند)
    const user = {
        username: 'usertest',
        email: 'usertest@example.com',
        avatarUrl: 'https://via.placeholder.com/50', // آواتار برای نمایش در هدر
        level: 'دانشجو' // سطح کاربر
    };

    // مثال داده‌های داشبورد و نوتیفیکیشن (این‌ها باید از Backend بیایند)
    const [dashboardData, setDashboardData] = useState({
        totalNotes: 150,
        completedChapters: 25,
        upcomingExams: 3,
        recentActivities: [
            { id: 1, text: t('activity_reviewed_chapter', { chapter: 'ساختمان داده' }), date: '2024-05-30' },
            { id: 2, text: t('activity_completed_quiz', { quiz: 'مقدمات الگوریتم' }), date: '2024-05-28' },
            { id: 3, text: t('activity_added_note', { topic: 'سیستم عامل' }), date: '2024-05-25' },
        ],
        notifications: [
            { id: 1, type: 'exam', title: t('upcoming_exam_compiler'), date: '2024-06-15', time: '10:00', read: false },
            { id: 2, type: 'info', title: t('new_notes_available'), date: '2024-06-01', read: false },
            { id: 3, type: 'exam', title: t('upcoming_exam_networks'), date: '2024-06-20', time: '14:30', read: true },
            { id: 4, type: 'info', title: t('system_update_notice'), date: '2024-05-29', read: true },
        ]
    });

    const unreadNotificationsCount = dashboardData.notifications.filter(n => !n.read).length;

    const handleLogout = () => {
        // منطق خروج از سیستم
        console.log("کاربر خارج شد");
        navigate('/login');
    };

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setShowNotifications(false);
        }
    };

    const markAllNotificationsAsRead = () => {
        setDashboardData(prevData => ({
            ...prevData,
            notifications: prevData.notifications.map(n => ({ ...n, read: true }))
        }));
    };

    const handleViewProfile = () => {
        navigate('/profile'); // هدایت به صفحه پروفایل کاربری
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Container theme={theme}>
            {/* Sidebar */}
            <Sidebar theme={theme}>
                <div>
                    <SidebarHeader theme={theme}>
                        <Logo>📚</Logo>
                        <AppName theme={theme}>{t('app_name')}</AppName>
                    </SidebarHeader>
                    <NavList>
                        <NavItem>
                            <NavLink href="#" className="active" theme={theme}>
                                <NavIcon><BsHouseDoor /></NavIcon>
                                <span>{t('dashboard')}</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" theme={theme}>
                                <NavIcon><BsBook /></NavIcon>
                                <span>{t('my_notes')}</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" theme={theme}>
                                <NavIcon><BsQuestionCircle /></NavIcon>
                                <span>{t('practice_questions')}</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/profile" theme={theme}> {/* لینک به صفحه پروفایل */}
                                <NavIcon><BsGear /></NavIcon>
                                <span>{t('settings')}</span> {/* یا t('user_profile') */}
                            </NavLink>
                        </NavItem>
                    </NavList>
                </div>
                <SidebarFooter theme={theme}>
                    <ThemeLanguageSettings theme={theme}>
                        <SettingButton onClick={toggleTheme} theme={theme}>
                            {theme.isDarkMode ? <BsSun /> : <BsMoon />}
                            <span>{theme.isDarkMode ? t('light_mode') : t('dark_mode')}</span>
                        </SettingButton>
                        <SettingButton onClick={() => setLanguage(currentLanguage === 'fa' ? 'en' : 'fa')} theme={theme}>
                            <span>{currentLanguage === 'fa' ? 'EN' : 'فا'}</span>
                        </SettingButton>
                    </ThemeLanguageSettings>
                    <LogoutButton onClick={handleLogout} theme={theme}>
                        <NavIcon><BsBoxArrowRight /></NavIcon>
                        <span>{t('logout')}</span>
                    </LogoutButton>
                </SidebarFooter>
            </Sidebar>

            {/* Main Content */}
            <MainContent>
                <DashboardHeader theme={theme}>
                    <WelcomeMessage theme={theme}>{t('welcome_user', { username: user.username })}</WelcomeMessage>

                    {/* دکمه نوتیفیکیشن و پنل */}
                    <NotificationContainer ref={notificationRef}>
                        <NotificationButton onClick={toggleNotifications} theme={theme}>
                            <BsBell />
                            {unreadNotificationsCount > 0 && (
                                <NotificationBadge>{unreadNotificationsCount}</NotificationBadge>
                            )}
                        </NotificationButton>
                        {showNotifications && (
                            <NotificationDropdown theme={theme}>
                                <DropdownHeader theme={theme}>{t('notifications')}</DropdownHeader>
                                <NotificationList>
                                    {dashboardData.notifications.length > 0 ? (
                                        dashboardData.notifications.map((notification) => (
                                            <NotificationItem key={notification.id} theme={theme}>
                                                <NotificationIcon type={notification.type} theme={theme}>
                                                    {notification.type === 'exam' ? <BsCalendarCheck /> : <BsInfoCircle />}
                                                </NotificationIcon>
                                                <NotificationContent>
                                                    <NotificationTitle read={notification.read} theme={theme}>
                                                        {notification.title}
                                                    </NotificationTitle>
                                                    <NotificationTime theme={theme}>
                                                        {notification.date} {notification.time && ` - ${notification.time}`}
                                                    </NotificationTime>
                                                </NotificationContent>
                                            </NotificationItem>
                                        ))
                                    ) : (
                                        <NotificationItem theme={theme}>
                                            <NotificationContent>
                                                <NotificationTitle theme={theme}>{t('no_notifications')}</NotificationTitle>
                                            </NotificationContent>
                                        </NotificationItem>
                                    )}
                                </NotificationList>
                                {unreadNotificationsCount > 0 && (
                                    <MarkAllReadButton onClick={markAllNotificationsAsRead} theme={theme}>
                                        <BsCheckCircleFill style={{ marginRight: '8px' }} />
                                        {t('mark_all_read')}
                                    </MarkAllReadButton>
                                )}
                            </NotificationDropdown>
                        )}
                    </NotificationContainer>

                    {/* User Profile Hover Area */}
                    <UserProfileHoverArea>
                        <UserAvatar src={user.avatarUrl} alt="User Avatar" theme={theme} />
                        <UserName theme={theme}>{user.username}</UserName>
                        <ProfileHoverCard theme={theme}>
                            <HoverAvatar src={user.avatarUrl} alt="User Avatar" theme={theme} />
                            <HoverName theme={theme}>{user.username}</HoverName>
                            <HoverLevel theme={theme}><BsPersonFill style={{ verticalAlign: 'middle', marginRight: '5px' }} />{t('level')}: {user.level}</HoverLevel>
                            <HoverEmail theme={theme}>{user.email}</HoverEmail>
                            <ViewProfileButton onClick={handleViewProfile} theme={theme}>
                                {t('view_profile')}
                            </ViewProfileButton>
                        </ProfileHoverCard>
                    </UserProfileHoverArea>

                </DashboardHeader>

                <CardGrid>
                    <InfoCard theme={theme}>
                        <CardIcon>📝</CardIcon>
                        <CardTitle>{t('total_notes')}</CardTitle>
                        <CardValue>{dashboardData.totalNotes}</CardValue>
                    </InfoCard>
                    <InfoCard theme={theme}>
                        <CardIcon>✅</CardIcon>
                        <CardTitle>{t('completed_chapters')}</CardTitle>
                        <CardValue>{dashboardData.completedChapters}</CardValue>
                    </InfoCard>
                    <InfoCard theme={theme}>
                        <CardIcon>⏰</CardIcon>
                        <CardTitle>{t('upcoming_exams')}</CardTitle>
                        <CardValue>{dashboardData.upcomingExams}</CardValue>
                    </InfoCard>
                </CardGrid>

                <SectionTitle theme={theme}>{t('recent_activity')}</SectionTitle>
                <RecentActivityList>
                    {dashboardData.recentActivities.map((activity) => (
                        <ActivityItem key={activity.id} theme={theme}>
                            <ActivityText>{activity.text}</ActivityText>
                            <ActivityDate>{activity.date}</ActivityDate>
                        </ActivityItem>
                    ))}
                </RecentActivityList>
            </MainContent>
        </Container>
    );
}

export default DashboardPage;