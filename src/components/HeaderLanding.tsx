// src/components/HeaderLanding.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MetaverseStyles.css';

const HeaderLanding: React.FC = () => {
  return (
    <header className="glass border-b border-[#8A2BE2]/30 px-6 py-3 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="size-10 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg p-2 neon-border cyber-scan">
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
          <h2 className="text-white text-2xl font-orbitron font-bold tracking-wider">
            <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">TAMU</span>
            <span className="text-white">SANDBOX</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/features" className="px-4 py-2 text-sm hover:text-[#B026FF] font-medium transition-colors duration-200 font-rajdhani">
            Özellikler
          </Link>
          <Link to="/pricing" className="px-4 py-2 text-sm hover:text-[#B026FF] font-medium transition-colors duration-200 font-rajdhani">
            Fiyatlandırma
          </Link>
          <Link to="/about" className="px-4 py-2 text-sm hover:text-[#B026FF] font-medium transition-colors duration-200 font-rajdhani">
            Hakkımızda
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-sm font-medium hover:text-[#B026FF] transition-colors duration-200 font-rajdhani">
            Giriş Yap
          </Link>
          <Link to="/auth" className="relative flex items-center justify-center rounded-xl h-10 px-5 overflow-hidden group cyber-scan">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
            <span className="relative text-white text-sm font-bold font-orbitron">
              Kayıt Ol
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderLanding;