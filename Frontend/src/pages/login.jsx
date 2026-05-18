import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

function Login() {
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRtl = i18n.language === 'fa';
  const cardRef = useRef(null);

  // هندلر جادویی حرکت ماوس برای موقعیت نوری داینامیک و افکت ۳بعدی
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // ۱. محاسبه موقعیت ماوس برای نور پس‌زمینه
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // ۲. محاسبه زاویه خم شدن ۳بعدی
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // زاویه ملایم ۴ درجه
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fa' ? 'en' : 'fa');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      alert(isRtl ? 'ورود موفقیت‌آمیز بود!' : 'Logged in successfully!');
    } catch (err) {
      setError(err.message || 'Error authenticating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-black px-4 transition-all duration-500 relative overflow-hidden ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      
      {/* دکمه مجلل تغییر زبان */}
      <button 
        onClick={toggleLanguage} 
        className="absolute top-6 right-6 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/40 font-mono text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 cursor-pointer z-50"
      >
        {i18n.language.toUpperCase()}
      </button>

      {/* کارت تعاملی پُرسینو با افکت Spotlight ماوس */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[420px] space-y-6 rounded-3xl bg-zinc-900/30 p-8 border border-zinc-800 shadow-2xl backdrop-blur-xl relative transition-transform duration-200 ease-out before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(800px_circle_at_var(--mouse-x,_0px)_var(--mouse-y,_0px),rgba(255,255,255,0.06),transparent_40%)] before:pointer-events-none"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black text-white tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {t('loginTitle')}
          </h1>
          <p className="text-[10px] tracking-[0.4em] text-zinc-600 font-bold uppercase">Porsino</p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-950/20 p-3.5 text-xs text-red-400 border border-red-900/30 text-center animate-in fade-in duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 px-1">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full rounded-xl border border-zinc-800/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-800 bg-zinc-950/50 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 focus:outline-none transition-all duration-300 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{t('password')}</label>
              <a href="#forget" className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200">{t('forgetPass')}</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-zinc-800/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-800 bg-zinc-950/50 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 focus:outline-none transition-all duration-300 shadow-inner"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl mt-4 text-sm font-bold transition-all duration-300 bg-zinc-50 text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer border border-white" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{t('checking')}</span>
              </div>
            ) : (
              t('submitLogin')
            )}
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-zinc-500">
            {t('noAccount')}{' '}
            <a 
              href="#signup" 
              className="font-bold text-zinc-200 hover:text-white transition-all duration-300 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300 pb-0.5"
            >
              {t('signupTitle')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;