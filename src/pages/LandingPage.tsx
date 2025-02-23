import React from 'react';
import HeaderLanding from '../components/HeaderLanding';
import FooterLanding from '../components/FooterLanding';

const LandingPage: React.FC = () => {
  return (
    <div
      className="bg-[#231010] text-white m-0 p-0"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <HeaderLanding />
      
      <section className="relative flex flex-col md:flex-row items-center justify-center md:justify-between px-10 py-16">
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Sandbox ile Dosyalarınızı <br className="hidden md:block" /> Güvenle Analiz Edin
          </h1>
          <p className="text-sm text-[#cb9090]">
            Zararlı yazılımları tespit etmek, davranışlarını izlemek ve ağ trafiğini incelemek için gelişmiş bir sanallaştırma ortamı.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="bg-[#492222] hover:bg-[#683131] text-sm font-bold px-4 py-2 rounded-xl">
              Daha Fazla Bilgi
            </button>
            <button className="bg-[#f20d0d] hover:bg-[#e10c0c] text-sm font-bold px-4 py-2 rounded-xl animate-pulse">
              Şimdi Başlayın
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="relative w-48 h-48 bg-[#341818] rounded-full flex items-center justify-center animate-bounce">
            <svg
              className="w-24 h-24 animate-spin text-[#f20d0d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        </div>
      </section>

      <section className="px-10 py-8 bg-[#341818] border-y border-[#492222] flex flex-col gap-8">
        <h2 className="text-2xl font-bold">Neden Sandbox?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#492222] p-4 rounded-xl flex flex-col gap-2">
            <h3 className="text-lg font-bold">Güvenlik</h3>
            <p className="text-sm text-[#cb9090]">
              Dosyalarınızı izole bir ortamda çalıştırarak sistemi korur.
            </p>
          </div>
          <div className="bg-[#492222] p-4 rounded-xl flex flex-col gap-2">
            <h3 className="text-lg font-bold">Detaylı Analiz</h3>
            <p className="text-sm text-[#cb9090]">
              Davranışsal loglar, API çağrıları ve ağ trafiği derinlemesine incelenir.
            </p>
          </div>
          <div className="bg-[#492222] p-4 rounded-xl flex flex-col gap-2">
            <h3 className="text-lg font-bold">Kolay Kullanım</h3>
            <p className="text-sm text-[#cb9090]">
              Sürükle-bırak veya tek tıkla analiz başlatma, sonuçlara hızlı erişim.
            </p>
          </div>
        </div>
      </section>

      <FooterLanding />
    </div>
  );
};

export default LandingPage;
