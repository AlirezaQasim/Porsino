import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite" // ۱. ایمپورت کردن تایلوند جدید


export default defineConfig({
    plugins: [react(), tailwindcss()],// ۲. اضافه کردن به لیست پلاگین‌ها
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.jsx',
    },resolve: {
        alias: {
            '@': path.resolve('./src'), // تنظیم آلیاس برای مسیرهای کوتاه‌تر
        },
    },
    server: {
        port: 3000, // پورت اجرای فرانت‌اِند
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''), // حذف /api از مسیر درخواست‌ها
                configure: (proxy, options) => {
                    console.log('Proxying API requests to http://localhost:8080');
                },
            },
        },
    },
})
