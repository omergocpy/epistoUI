// src/pages/dashboard/Home.tsx
import React from 'react';
import HeaderDashboard from '../../components/HeaderDashboard';
import FooterDashboard from '../../components/FooterDashboard';

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-[#231010] text-white"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <HeaderDashboard />
      <main className="px-10 py-6 max-w-[1200px] mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Hoş Geldiniz, Ece Demir!</h1>
        <p className="text-sm text-[#cb9090] mb-8">
          Başarılı bir şekilde giriş yaptınız. Buradan son güncellemeleri görüntüleyebilir veya hızlıca yeni analiz başlatabilirsiniz.
        </p>
        <div className="md:flex md:gap-6 md:items-start">
          <div className="bg-[#341818] p-5 border border-[#683131] rounded-xl w-full md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-3">Yeni Güncellemeler</h2>
            <p className="text-sm text-[#cb9090] mb-4">
              Sistemdeki son haberler, değişiklikler veya duyurular:
            </p>
            <div className="flex flex-col gap-4">
              <div className="bg-[#492222] p-3 rounded-xl">
                <h3 className="text-base font-semibold">Güncelleme #1</h3>
                <p className="text-sm text-[#cb9090]">
                  Paket kayıtlarını toplu şekilde indirme özelliği eklendi.
                </p>
              </div>
              <div className="bg-[#492222] p-3 rounded-xl">
                <h3 className="text-base font-semibold">Güncelleme #2</h3>
                <p className="text-sm text-[#cb9090]">
                  Artık analiz tamamlanınca otomatik bildirim alabilirsiniz.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#341818] p-5 border border-[#683131] rounded-xl">
            <h2 className="text-lg font-bold mb-3">Hızlı Erişim</h2>
            <div className="flex flex-col gap-2">
              <a href="#" className="bg-[#492222] rounded-xl px-4 py-2 text-sm font-semibold">
                Yeni Dosya Analizi
              </a>
              <a href="#" className="bg-[#492222] rounded-xl px-4 py-2 text-sm font-semibold">
                Hash Sorgulama
              </a>
              <a href="#" className="bg-[#492222] rounded-xl px-4 py-2 text-sm font-semibold">
                IP Adres Analizi
              </a>
            </div>
          </div>
          <div className="bg-[#341818] p-5 border border-[#683131] rounded-xl">
            <h2 className="text-lg font-bold mb-3">Genel Bakış</h2>
            <p className="text-sm text-[#cb9090] mb-4">
              Kısa istatistikler veya sistem durumu:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li className="text-white">
                Dosya Tarama Sayınız: <span className="text-[#f20d0d] font-bold">35</span>
              </li>
              <li className="text-white">
                İşlemdeki Dosyalar: <span className="text-[#f20d0d] font-bold">3</span>
              </li>
              <li className="text-white">
                Sonuçlanan Analizler: <span className="text-[#f20d0d] font-bold">32</span>
              </li>
              <li className="text-white">
                Gelen Bildirimler: <span className="text-[#f20d0d] font-bold">5</span>
              </li>
              <li className="text-white">
                Sistem Durumu: <span className="text-[#f20d0d]">Yoğun</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <FooterDashboard />
    </div>
  );
};

export default Home;
