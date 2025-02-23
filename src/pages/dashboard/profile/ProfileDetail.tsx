// src/pages/profile/ProfileDetail.tsx
import React from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';

const ProfileDetail: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-[#231010] text-white"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <HeaderDashboard />
      <main className="px-10 py-5 max-w-[1200px] mx-auto w-full md:flex md:items-start md:gap-6">
        {/* Profil Bilgileri Bölümü */}
        <div className="bg-[#341818] p-6 rounded-xl border border-[#683131] w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Profil Bilgileri</h2>
          <div className="flex items-center gap-6 mb-6">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-20 h-20"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/replicate/44054395-3f26-4fc6-b930-e2ca89e11e0c.png")',
              }}
            ></div>
            <div className="flex flex-col">
              <p className="text-white text-xl font-bold">Ali Demir</p>
              <p className="text-sm text-[#cb9090]">ali.demir@example.com</p>
              <p className="text-sm text-[#cb9090] mt-1">
                Rol: <span className="text-white font-medium">Yönetici</span>
              </p>
            </div>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">Ad Soyad</label>
              <input
                type="text"
                defaultValue="Ali Demir"
                className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">E-Posta</label>
              <input
                type="email"
                defaultValue="ali.demir@example.com"
                className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">Telefon</label>
              <input
                type="tel"
                placeholder="05xx xxx xx xx"
                className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">Adres</label>
              <input
                type="text"
                placeholder="İstanbul, Türkiye"
                className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl self-start"
            >
              Bilgileri Güncelle
            </button>
          </form>
        </div>

        {/* Şifre İşlemleri Bölümü */}
        <div className="bg-[#341818] p-6 rounded-xl border border-[#683131] w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Şifre İşlemleri</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Şifremi Güncelle</h3>
            <form className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-[#cb9090] font-medium block mb-1">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-[#cb9090] font-medium block mb-1">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-[#cb9090] font-medium block mb-1">
                  Yeni Şifre (Tekrar)
                </label>
                <input
                  type="password"
                  className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl self-start"
              >
                Şifreyi Güncelle
              </button>
            </form>
          </div>
        </div>
      </main>
      <FooterDashboard />
    </div>
  );
};

export default ProfileDetail;
