// src/pages/auth/Auth.tsx
import React, { useState } from 'react';
import '../styles/MetaverseStyles.css';

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 cyber-grid">
      <div className="absolute inset-0 cyber-scan opacity-50"></div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#8A2BE2]/10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-[#B026FF]/10 blur-3xl translate-x-1/4 translate-y-1/4"></div>
      
      {activePage === 'login' && (
        <div id="login" className="glass border border-[#8A2BE2]/30 w-full max-w-md p-8 rounded-xl shadow-lg text-white relative overflow-hidden cyber-scan">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 size-16 bg-gradient-to-tr from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
          
          <div className="mb-6 flex justify-center">
            <div className="size-14 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg p-3 neon-border cyber-scan">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B026FF" />
                    <stop offset="1" stopColor="#8A2BE2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <h2 className="text-center text-2xl font-bold mb-1 font-orbitron">
            <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">EPİSTO</span>
            <span className="text-white">SANDBOX</span>
          </h2>
          
          <h1 className="text-center text-xl font-bold mb-2 font-orbitron text-white">Tekrar Hoş Geldiniz</h1>
          <p className="text-center text-sm mb-6 text-gray-400 font-rajdhani">Devam etmek için hesabınıza giriş yapın</p>
          
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 font-rajdhani">E-posta</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="E-postanızı girin"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500 font-rajdhani"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 font-rajdhani">Şifre</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifrenizi girin"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500 font-rajdhani"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] hover:text-[#B026FF]/80 transition-colors"
                  onClick={() => togglePassword('login')}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="custom-radio-container flex items-center">
                <input type="checkbox" id="remember-me" className="hidden" />
                <label htmlFor="remember-me" className="radio-label text-sm text-gray-400 cursor-pointer select-none font-rajdhani">Beni Hatırla</label>
              </div>
              <button 
                type="button" 
                className="text-sm text-[#B026FF] hover:text-[#B026FF]/80 font-rajdhani"
                onClick={() => setActivePage('forgot')}
              >
                Şifrenizi mi unuttunuz?
              </button>
            </div>
            
            <button 
              type="submit" 
              className="relative w-full flex items-center justify-center rounded-xl h-12 overflow-hidden group mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] transition-all duration-300"></div>
              <span className="relative text-white text-base font-bold font-orbitron">
                Giriş Yap
              </span>
            </button>
          </form>
          
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-gray-400 font-rajdhani">Hesabınız yok mu?</span>
            <button 
              onClick={() => setActivePage('register')}
              className="ml-2 text-sm text-[#B026FF] hover:text-[#B026FF]/80 font-rajdhani"
            >
              Kayıt olun
            </button>
          </div>
        </div>
      )}

      {activePage === 'register' && (
        <div id="register" className="glass border border-[#8A2BE2]/30 w-full max-w-md p-8 rounded-xl shadow-lg text-white relative overflow-hidden cyber-scan">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 size-16 bg-gradient-to-tr from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
          
          <div className="mb-6 flex justify-center">
            <div className="size-14 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg p-3 neon-border cyber-scan">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B026FF" />
                    <stop offset="1" stopColor="#8A2BE2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <h2 className="text-center text-2xl font-bold mb-1 font-orbitron">
            <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">EPİSTO</span>
            <span className="text-white">SANDBOX</span>
          </h2>
          
          <h1 className="text-center text-xl font-bold mb-2 font-orbitron text-white">Hesap Oluştur</h1>
          <p className="text-center text-sm mb-6 text-gray-400 font-rajdhani">Hizmetlerimizi kullanmaya başlamak için kaydolun</p>
          
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 font-rajdhani">Ad Soyad</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Adınızı ve soyadınızı girin"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500 font-rajdhani"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 font-rajdhani">E-posta</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="E-postanızı girin"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500 font-rajdhani"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 font-rajdhani">Şifre</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                </div>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="Şifrenizi girin"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500 font-rajdhani"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] hover:text-[#B026FF]/80 transition-colors"
                  onClick={() => togglePassword('register')}
                >
                  {showRegisterPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="custom-radio-container flex items-center">
                <input type="checkbox" id="accept-terms" className="hidden" />
                <label htmlFor="accept-terms" className="radio-label text-sm text-gray-400 cursor-pointer select-none font-rajdhani">
                  <span className="text-[#B026FF]">Kullanım Şartlarını</span> ve <span className="text-[#B026FF]">Gizlilik Politikasını</span> kabul ediyorum
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="relative w-full flex items-center justify-center rounded-xl h-12 overflow-hidden group mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] transition-all duration-300"></div>
              <span className="relative text-white text-base font-bold font-orbitron">
                Kayıt Ol
              </span>
            </button>
          </form>
          
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-gray-400 font-rajdhani">Zaten bir hesabınız var mı?</span>
            <button 
              onClick={() => setActivePage('login')}
              className="ml-2 text-sm text-[#B026FF] hover:text-[#B026FF]/80 font-rajdhani"
            >
              Giriş yapın
            </button>
          </div>
        </div>
      )}
{activePage === 'forgot' && (
  <div id="forgot" className="glass border border-[#8A2BE2]/30 w-full max-w-md p-8 rounded-xl shadow-lg text-white relative overflow-hidden cyber-scan">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
    <div className="absolute bottom-0 left-0 size-16 bg-gradient-to-tr from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
    
    <div className="mb-6 flex justify-center">
      <div className="size-14 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg p-3 neon-border cyber-scan">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-[#B026FF]" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
      </div>
    </div>
    
    <h2 className="text-center text-2xl font-bold mb-1 font-orbitron">
      <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">EPİSTO</span>
      <span className="text-white">SANDBOX</span>
    </h2>
    
    <h1 className="text-center text-xl font-bold mb-2 font-orbitron text-white">Şifrenizi Sıfırlayın</h1>
    <p className="text-center text-sm mb-6 text-gray-400 font-rajdhani">Şifre sıfırlama talimatlarını almak için e-postanızı girin</p>
    
    <form>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 font-rajdhani">E-posta</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
          </div>
          <input
            type="email"
            placeholder="E-postanızı girin"
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500 font-rajdhani"
          />
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 mb-6">
        <button 
          type="submit" 
          className="relative w-full flex items-center justify-center rounded-xl h-12 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] transition-all duration-300"></div>
          <span className="relative text-white text-base font-bold font-orbitron">
            Sıfırlama Bağlantısını Gönder
          </span>
        </button>
        
        <button 
          type="button"
          onClick={() => setActivePage('login')} 
          className="w-full flex items-center justify-center rounded-xl h-12 bg-[#1B1137] border border-[#8A2BE2]/30 text-white text-sm font-bold font-orbitron transition-all duration-300 hover:bg-[#8A2BE2]/20"
        >
          Giriş Sayfasına Dön
        </button>
      </div>
    </form>
    
    <div className="text-center mt-6">
      <div className="inline-flex items-center justify-center">
        <div className="h-px w-8 bg-[#8A2BE2]/30"></div>
        <p className="mx-4 text-xs text-gray-500 font-rajdhani">Şifrenizi mi hatırladınız?</p>
        <div className="h-px w-8 bg-[#8A2BE2]/30"></div>
      </div>
      <button 
        onClick={() => setActivePage('login')}
        className="mt-2 text-sm text-[#B026FF] hover:text-[#B026FF]/80 font-rajdhani"
      >
        Giriş sayfasına dön
      </button>
    </div>
  </div>
)}
</div>
);
};

export default Auth;