// src/components/HeaderDashboard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MetaverseStyles.css';

const HeaderDashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

        {/* Mobile Menu Button - Shown only on small screens */}
        <button 
          className="md:hidden text-white hover:text-[#B026FF] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Navigation and User Interface - Hidden on small screens unless menu is open */}
        <div className={`md:flex-1 md:flex md:justify-end md:items-center md:gap-4 md:space-y-0 
          ${mobileMenuOpen ? 'absolute left-0 right-0 top-16 glass-dark py-5 px-6 space-y-3 border-b border-[#8A2BE2]/30 flex flex-col items-center z-50' : 'hidden'}`}
        >
          {/* Navigation Links */}
          <nav className="md:flex items-center gap-5 space-y-3 md:space-y-0">
            <Link to="/dashboard" className="px-4 py-2 text-sm hover:text-[#B026FF] font-medium transition-colors duration-200 font-rajdhani border-b-2 border-[#B026FF] block md:inline-block">
              Anasayfa
            </Link>
            <Link to="/scanner" className="px-4 py-2 text-sm hover:text-[#B026FF] font-medium transition-colors duration-200 font-rajdhani block md:inline-block">
              Analiz
            </Link>
            <Link to="/reports" className="px-4 py-2 text-sm hover:text-[#B026FF] font-medium transition-colors duration-200 font-rajdhani block md:inline-block">
              Raporlar
            </Link>
          </nav>

          {/* Separator for mobile view */}
          <div className="border-t border-[#8A2BE2]/30 w-full py-2 md:hidden"></div>

          {/* User Panel Dropdown */}
          <div className="relative group radial-menu-container">
            <button className="text-white text-sm font-medium font-orbitron leading-normal px-3 py-2 bg-[#1B1137] rounded-lg hover:bg-[#8A2BE2]/20 transition-all duration-300">
              Kullanıcı Paneli
              <span className="ml-1 inline-block md:hidden">▼</span>
            </button>
            <div className="absolute left-0 mt-2 rounded-xl shadow-lg w-48 hidden group-hover:block z-50 overflow-hidden">
              <div className="glass p-1 rounded-xl">
                <Link to="/users" className="block px-4 py-2 text-sm hover:bg-[#8A2BE2]/20 rounded-lg transition-colors duration-200 my-1 radial-menu-item">
                  Kullanıcılar
                </Link>
                <Link to="/supports" className="block px-4 py-2 text-sm hover:bg-[#8A2BE2]/20 rounded-lg transition-colors duration-200 my-1 radial-menu-item">
                  Destek
                </Link>
                <Link to="/perms" className="block px-4 py-2 text-sm hover:bg-[#8A2BE2]/20 rounded-lg transition-colors duration-200 my-1 radial-menu-item">
                  Yetkiler
                </Link>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <Link to="/scanner" className="md:flex items-center justify-center rounded-xl h-10 px-5 relative overflow-hidden group mb-2 md:mb-0 cyber-scan">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
            <span className="relative text-white text-sm font-bold font-orbitron flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
              Analizi Başlat
            </span>
          </Link>

          <Link to="/scanner-details" className="md:flex items-center justify-center rounded-xl h-10 px-5 bg-[#1B1137] border border-[#8A2BE2]/30 text-white text-sm font-bold font-orbitron transition-all duration-300 hover:bg-[#8A2BE2]/20 mb-2 md:mb-0">
            Analiz Detayı
          </Link>

          {/* Search Box */}
          <div className="relative md:flex items-center w-full md:w-auto mb-2 md:mb-0">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input type="text" placeholder="Genel Arama" className="w-full md:w-48 lg:w-60 h-10 pl-10 pr-3 rounded-xl text-sm bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200" />
          </div>

          {/* Notification Button */}
          <button className="relative flex items-center justify-center rounded-xl h-10 w-10 bg-[#1B1137] border border-[#8A2BE2]/30 text-white hover:bg-[#8A2BE2]/20 transition-all duration-300 mb-2 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z"></path>
            </svg>
            <span className="absolute -top-1 -right-1 size-4 bg-[#B026FF] rounded-full text-xs flex items-center justify-center">3</span>
          </button>

          {/* User Profile */}
          <div className="relative group radial-menu-container">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium hidden sm:block">Ece Demir</span>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] animate-pulse opacity-50"></div>
                <div className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#0F0921]" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/replicate/44054395-3f26-4fc6-b930-e2ca89e11e0c.png")' }}></div>
              </div>
            </div>
            <div className="absolute right-0 mt-2 rounded-xl shadow-lg w-40 hidden group-hover:block z-50 overflow-hidden">
              <div className="glass p-1 rounded-xl">
                <Link to="/profile-detail" className="block px-4 py-2 text-sm hover:bg-[#8A2BE2]/20 rounded-lg transition-colors duration-200 my-1 radial-menu-item flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profil Detayı
                </Link>
                <Link to="/login" className="block px-4 py-2 text-sm hover:bg-[#8A2BE2]/20 rounded-lg transition-colors duration-200 my-1 radial-menu-item flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Çıkış Yap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;