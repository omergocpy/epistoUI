// src/pages/profile/ProfileDetail.tsx
import React, { useEffect } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
import '../../../styles/MetaverseStyles.css'; // CSS dosyasını import ediyoruz

const ProfileDetail: React.FC = () => {
  // Particles Effect
  useEffect(() => {
    const createParticle = () => {
      const container = document.getElementById('particles-container');
      if (!container) return;

      const particle = document.createElement('div');
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random opacity
      const opacity = Math.random() * 0.3 + 0.1;
      
      // Random animation duration between 15s and 30s
      const duration = Math.random() * 15 + 15;
      
      // Set styles
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(to right, rgba(138, 43, 226, ${opacity}), rgba(176, 38, 255, ${opacity}));
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        pointer-events: none;
        z-index: -1;
        animation: float ${duration}s ease-in-out infinite;
        filter: blur(1px);
      `;
      
      container.appendChild(particle);
    };

    // Create multiple particles
    for (let i = 0; i < 30; i++) {
      createParticle();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0921] text-white font-rajdhani">
      <HeaderDashboard />

      {/* Particles container */}
      <div id="particles-container" className="fixed inset-0 pointer-events-none"></div>

      <main className="container mx-auto px-4 py-8">
        {/* Sayfa Başlığı */}
        <div className="glass rounded-2xl p-6 shadow-xl neon-border mb-8 relative overflow-hidden">
          {/* Dekoratif arka plan çizgileri */}
          <div className="absolute inset-0 cyber-grid opacity-30"></div>

          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8A2BE2]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">
                Profil Yönetimi
              </h1>
              <p className="text-white mt-1">Hesap bilgilerinizi görüntüleyin ve güncelleyin</p>
            </div>
          </div>
        </div>

        {/* İçerik Bölümü - Profil ve Şifre - Yeni Düzen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profil Bilgileri Bölümü */}
          <div className="glass rounded-2xl shadow-xl neon-border overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profil Bilgileri
              </h2>
              
              <div className="flex items-center gap-5 mb-6">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] animate-pulse opacity-50"></div>
                  <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-[#0F0921]">
                    <img
                      src="https://cdn.usegalileo.ai/replicate/44054395-3f26-4fc6-b930-e2ca89e11e0c.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <p className="text-xl font-bold text-white">Ali Demir</p>
                  <p className="text-sm text-gray-300">ali.demir@example.com</p>
                  <p className="text-sm text-gray-300 mt-1">
                    Rol: <span className="text-[#B026FF] font-medium">Yönetici</span>
                  </p>
                </div>
              </div>
              
              <form className="flex flex-col gap-4">
                <div>
                  <label className="text-sm text-gray-300 font-medium block mb-1.5">Ad Soyad</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="Ali Demir"
                      className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 font-medium block mb-1.5">E-Posta</label>
                  <div className="relative">
                    <input
                      type="email"
                      defaultValue="ali.demir@example.com"
                      className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 font-medium block mb-1.5">Telefon</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="05xx xxx xx xx"
                      className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 font-medium block mb-1.5">Adres</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="İstanbul, Türkiye"
                      className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="relative mt-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg cyber-scan overflow-hidden self-start"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                  <div className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Bilgileri Güncelle
                  </div>
                </button>
              </form>
            </div>
          </div>
          
          {/* Şifre İşlemleri Bölümü */}
          <div className="glass rounded-2xl shadow-xl neon-border overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Şifre İşlemleri
              </h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                  <div className="w-6 h-6 rounded-full bg-[#8A2BE2]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                      <polyline points="1 4 1 10 7 10"></polyline>
                      <polyline points="23 20 23 14 17 14"></polyline>
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                    </svg>
                  </div>
                  Şifremi Güncelle
                </h3>
                
                <form className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-gray-300 font-medium block mb-1.5">Mevcut Şifre</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 font-medium block mb-1.5">Yeni Şifre</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 font-medium block mb-1.5">Yeni Şifre (Tekrar)</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-grow h-1.5 bg-[#1B1137] rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                    </div>
                    <span className="text-xs text-[#B026FF]">Orta</span>
                  </div>
                  
                  <button
                    type="submit"
                    className="relative mt-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg cyber-scan overflow-hidden self-start"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                    <div className="relative flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Şifreyi Güncelle
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <FooterDashboard />
    </div>
  );
};

export default ProfileDetail;