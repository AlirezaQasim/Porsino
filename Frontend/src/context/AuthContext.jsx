import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // بررسی اینکه آیا از قبل توکنی در مرورگر ذخیره شده یا خیر
        const token = localStorage.getItem('token');
        if (token) {
            // اینجا در آینده می‌توان یک درخواست به /api/users/profile زد تا اطلاعات کاربر بروز شود
            setUser({ isLoggedIn: true });
        }
        setLoading(false);
    }, []);

    // تابع عملیاتی برای لاگین
    const login = async (email, password) => {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // 👈 اول چک میکنیم اگر سرور ارور داد (مثل 401)، بدون کرش کردن متکست خطا رو مدیریت کنیم
        if (!response.ok) {
            let errorMessage = 'ایمیل یا رمز عبور اشتباه است';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // اگر پاسخ سرور JSON نبود (مثل HTML خطای اکسپرس)، این بخش هندلش میکنه
            }
            throw new Error(errorMessage);
        }

        // اگر پاسخ OK بود (کد 200)، حالا با خیال راحت JSON رو میخونیم
        const data = await response.json();

        localStorage.setItem('token', data.token);
        setUser({ isLoggedIn: true, ...data.user });
        return data;
    };

    // تابع خروج
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);