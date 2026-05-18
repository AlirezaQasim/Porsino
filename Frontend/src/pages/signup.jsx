import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

function Signup() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRtl = i18n.language === 'fa';
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        let errMsg = 'Registration failed';
        try {
          const errData = await response.json();
          errMsg = errData.message || errMsg;
        } catch (jsonErr) {
          if (response.status === 500) errMsg = isRtl ? 'این نام کاربری یا ایمیل قبلاً ثبت شده است' : 'Username or Email already exists';
        }
        throw new Error(errMsg);
      }

      await response.json();
      setMessage(isRtl ? 'ثبت‌نام موفقیت‌آمیز بود! وارد شوید.' : 'Registration successful! Sign in.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally { // 👈 باگ با موفقیت فیکس شد!
      setLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-black px-4 transition-all duration-500 ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[420px] space-y-6 rounded-3xl bg-zinc-900/30 p-8 border border-zinc-800 shadow-2xl backdrop-blur-xl relative transition-transform duration-200 ease-out before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(800px_circle_at_var(--mouse-x,_0px)_var(--mouse-y,_0px),rgba(255,255,255,0.06),transparent_40%)] before:pointer-events-none"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black text-white tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {t('signupTitle')}
          </h1>
          <p className="text-[10px] tracking-[0.4em] text-zinc-600 font-bold uppercase">Porsino</p>
        </div>

        {error && <div className="rounded-xl bg-red-950/20 p-3.5 text-xs text-red-400 border border-red-900/30 text-center animate-in fade-in duration-200">{error}</div>}
        {message && <div className="rounded-xl bg-emerald-950/20 p-3.5 text-xs text-emerald-400 border border-emerald-900/30 text-center animate-in fade-in duration-200">{message}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 px-1">{t('username')}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full rounded-xl border border-zinc-800/80 px-4 py-3 text-sm text-zinc-100 bg-zinc-950/50 focus:border-zinc-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 px-1">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full rounded-xl border border-zinc-800/80 px-4 py-3 text-sm text-zinc-100 bg-zinc-950/50 focus:border-zinc-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 px-1">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-zinc-800/80 px-4 py-3 text-sm text-zinc-100 bg-zinc-950/50 focus:border-zinc-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl mt-4 text-sm font-bold transition-all duration-300 bg-zinc-50 text-black hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-[0.97] cursor-pointer border border-white" 
            disabled={loading}
          >
            {loading ? t('creating') : t('submitSignup')}
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-zinc-500">
            {t('hasAccount')}{' '}
            <a 
              href="#login" 
              className="font-bold text-zinc-200 hover:text-white transition-all duration-300 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300 pb-0.5"
            >
              {t('submitLogin')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;