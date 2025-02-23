// src/pages/auth/Auth.tsx
import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [activePage, setActivePage] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const togglePassword = (page: 'login' | 'register') => {
    if (page === 'login') {
      setShowPassword(prev => !prev);
    } else {
      setShowRegisterPassword(prev => !prev);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#231010]"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {activePage === 'login' && (
        <div id="login" className="auth-container w-full max-w-md bg-[#492222] p-8 rounded-xl shadow-lg text-white fade-in">
          <h1 className="text-center text-2xl font-bold mb-6">Tekrar Hoş Geldiniz</h1>
          <p className="text-center text-sm mb-6">Devam etmek için hesabınıza giriş yapın</p>
          <form>
            <label className="block mb-4">
              <span className="text-base font-medium">E-posta</span>
              <input
                type="email"
                placeholder="E-postanızı girin"
                className="w-full p-3 rounded-xl bg-[#cb9090] text-white border-none placeholder-white focus:outline-none"
              />
            </label>
            <label className="block mb-4 relative">
              <span className="text-base font-medium">Şifre</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Şifrenizi girin"
                className="w-full p-3 rounded-xl bg-[#cb9090] text-white border-none placeholder-white focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-9 text-white"
                onClick={() => togglePassword('login')}
              >
                👁️
              </button>
            </label>
            <button type="submit" className="w-full bg-[#f20d0d] p-3 rounded-xl font-bold text-white">
              Giriş Yap
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            <a href="#" className="underline" onClick={() => setActivePage('forgot')}>
              Şifrenizi mi unuttunuz?
            </a>
          </p>
          <p className="text-center text-sm mt-2">
            <a href="#" className="underline" onClick={() => setActivePage('register')}>
              Hesabınız yok mu? Kayıt olun
            </a>
          </p>
        </div>
      )}

      {activePage === 'register' && (
        <div id="register" className="auth-container w-full max-w-md bg-[#492222] p-8 rounded-xl shadow-lg text-white fade-in">
          <h1 className="text-center text-2xl font-bold mb-6">Hesap Oluştur</h1>
          <p className="text-center text-sm mb-6">Hizmetlerimizi kullanmaya başlamak için kaydolun</p>
          <form>
            <label className="block mb-4">
              <span className="text-base font-medium">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-[#cb9090] text-white border-none placeholder-white focus:outline-none"
              />
            </label>
            <label className="block mb-4 relative">
              <span className="text-base font-medium">Password</span>
              <input
                id="register-password"
                type={showRegisterPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full p-3 rounded-xl bg-[#cb9090] text-white border-none placeholder-white focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-9 text-white"
                onClick={() => togglePassword('register')}
              >
                👁️
              </button>
            </label>
            <button type="submit" className="w-full bg-[#f20d0d] p-3 rounded-xl font-bold text-white">
              Kayıt Ol
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            <a href="#" className="underline" onClick={() => setActivePage('login')}>
              Zaten bir hesabınız var mı? Giriş yapın
            </a>
          </p>
        </div>
      )}

      {activePage === 'forgot' && (
        <div id="forgot" className="auth-container w-full max-w-md bg-[#492222] p-8 rounded-xl shadow-lg text-white fade-in">
          <h1 className="text-center text-2xl font-bold mb-6">Şifrenizi Sıfırlayın</h1>
          <p className="text-center text-sm mb-6">Şifre sıfırlama talimatlarını almak için e-postanızı girin</p>
          <form>
            <label className="block mb-4">
              <span className="text-base font-medium">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-[#cb9090] text-white border-none placeholder-white focus:outline-none"
              />
            </label>
            <button type="submit" className="w-full bg-[#f20d0d] p-3 rounded-xl font-bold text-white">
              Sıfırlama Bağlantısını Gönder
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            <a href="#" className="underline" onClick={() => setActivePage('login')}>
              Giriş sayfasına dön
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
