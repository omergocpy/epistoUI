// src/components/HeaderDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderDashboard: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-[#492222] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="w-8 h-8">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          Sandbox
        </h2>
      </div>
      <div className="flex flex-1 justify-end items-center gap-6">
        <nav className="flex items-center gap-5">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm hover:bg-[#683131] border-b border-[#683131]"
          >
            Anasayfa
          </Link>
        </nav>
        {/* Kullanıcı paneli ve diğer menü elemanlarını buraya ekleyebilirsiniz */}
        <div className="relative group">
          <button className="text-white text-sm font-medium leading-normal px-2 py-1">
            Kullanıcı Paneli
          </button>
          <div className="absolute left-0 mt-2 bg-[#492222] border border-[#683131] rounded-xl shadow-lg w-48 hidden group-hover:block z-50">
            <Link
              to="/users"
              className="block px-4 py-2 text-sm hover:bg-[#683131] border-b border-[#683131]"
            >
              Kullanıcılar
            </Link>
            <Link
              to="/supports"
              className="block px-4 py-2 text-sm hover:bg-[#683131] border-b border-[#683131]"
            >
              Destek
            </Link>
            <Link
              to="/perms"
              className="block px-4 py-2 text-sm hover:bg-[#683131]"
            >
              Yetkiler
            </Link>
          </div>
        </div>
        <Link
          to="/scanner"
          className="hidden md:flex items-center justify-center rounded-xl h-10 px-4 bg-[#f20d0d] text-white text-sm font-bold"
        >
          Analizi Başlat
        </Link>
        <Link
          to="/scanner-details"
          className="hidden md:flex items-center justify-center rounded-xl h-10 px-4 bg-[#f20d0d] text-white text-sm font-bold"
        >
          Analiz Detayı
        </Link>
        <div className="relative hidden md:flex items-center">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Genel Arama"
            className="w-48 md:w-60 h-10 pl-10 pr-3 rounded-xl text-sm bg-[#492222] text-white border-[#492222] focus:outline-none"
          />
        </div>
        <button className="relative flex items-center justify-center rounded-xl h-10 bg-[#492222] text-white gap-2 text-sm font-bold px-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z"></path>
          </svg>
        </button>
        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium">Ali Demir</span>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/replicate/44054395-3f26-4fc6-b930-e2ca89e11e0c.png")',
              }}
            ></div>
          </div>
          <div className="absolute right-0 mt-2 bg-[#492222] border border-[#683131] rounded-xl shadow-lg w-40 hidden group-hover:block z-50">
            <Link
              to="/profile-detail"
              className="block px-4 py-2 text-sm hover:bg-[#683131] border-b border-[#683131]"
            >
              Profil Detayı
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-sm hover:bg-[#683131]"
            >
              Çıkış Yap
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
