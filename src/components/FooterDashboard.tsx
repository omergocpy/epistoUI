// src/components/FooterDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MetaverseStyles.css';

const FooterDashboard: React.FC = () => {
  return (
    <footer className="glass border-t border-[#8A2BE2]/30 mt-8 py-6 px-6 relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Scan Line Effect */}
      <div className="absolute inset-0 cyber-scan"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-8 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg p-1.5 neon-border cyber-scan">
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
              <h3 className="text-lg font-orbitron font-bold tracking-wider">
                <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">TAMU</span>
                <span className="text-white">SANDBOX</span>
              </h3>
            </div>
            <p className="text-sm text-gray-400 text-center md:text-left mb-4">
              Geleceğin SANDBOX deneyimini keşfedin ve kendi dünyalarınızı yaratın.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="size-8 rounded-lg bg-[#1B1137] border border-[#8A2BE2]/30 flex items-center justify-center text-[#B026FF] hover:bg-[#8A2BE2]/20 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="#" className="size-8 rounded-lg bg-[#1B1137] border border-[#8A2BE2]/30 flex items-center justify-center text-[#B026FF] hover:bg-[#8A2BE2]/20 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="#" className="size-8 rounded-lg bg-[#1B1137] border border-[#8A2BE2]/30 flex items-center justify-center text-[#B026FF] hover:bg-[#8A2BE2]/20 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
              <a href="#" className="size-8 rounded-lg bg-[#1B1137] border border-[#8A2BE2]/30 flex items-center justify-center text-[#B026FF] hover:bg-[#8A2BE2]/20 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:mx-auto">
            <h4 className="text-white text-lg font-orbitron font-medium mb-4 relative inline-block">
              Hızlı Linkler
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></span>
            </h4>
            <ul className="space-y-2 font-rajdhani">
              <li><Link to="/dashboard" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">Anasayfa</Link></li>
              <li><Link to="/scanner" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">Analiz</Link></li>
              <li><Link to="/reports" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">Raporlar</Link></li>
              <li><Link to="/users" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">Kullanıcılar</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="md:mx-auto">
            <h4 className="text-white text-lg font-orbitron font-medium mb-4 relative inline-block">
              Yardım & Destek
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></span>
            </h4>
            <ul className="space-y-2 font-rajdhani">
              <li><Link to="/faq" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">Sık Sorulan Sorular</Link></li>
              <li><Link to="/documentation" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">Dokümantasyon</Link></li>
              <li><Link to="/supports" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">Destek Merkezi</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#B026FF] transition-colors duration-200">İletişim</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-orbitron font-medium mb-4 relative inline-block">
              Bülten
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></span>
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              Yeni özellikler ve güncellemelerden haberdar olmak için bültenimize abone olun.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="flex-1 h-10 pl-4 rounded-l-lg text-sm bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200"
              />
              <button className="h-10 px-4 rounded-r-lg text-white text-sm font-bold font-orbitron bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] hover:opacity-90 transition-opacity">
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#8A2BE2]/20 my-6"></div>

        {/* Bottom row with copyright and links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent font-medium">TAMU</span>
            <span className="text-white font-medium">SANDBOX</span> - Tüm Hakları Saklıdır.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link to="/terms" className="hover:text-[#B026FF] transition-colors duration-200">Kullanım Şartları</Link>
            <Link to="/privacy" className="hover:text-[#B026FF] transition-colors duration-200">Gizlilik Politikası</Link>
            <Link to="/cookies" className="hover:text-[#B026FF] transition-colors duration-200">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterDashboard;