// src/pages/LandingPage.tsx
import React from 'react';
import HeaderLanding from '../components/HeaderLanding';
import FooterLanding from '../components/FooterLanding';
import '../styles/MetaverseStyles.css';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F0921] text-white flex flex-col">
      <HeaderLanding />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#8A2BE2]/10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-[#B026FF]/10 blur-3xl translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron leading-tight mb-6">
                <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">Lorem</span> 
                <br />
                Deneyimini 
                <br />
                <span className="text-white">Keşfedin</span>
              </h1>
              
              <p className="text-lg text-gray-400 font-rajdhani mb-8">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et laboriosam consequatur in optio quod? Sunt laboriosam iusto ipsam amet quasi!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="relative flex items-center justify-center rounded-xl h-12 px-6 overflow-hidden group cyber-scan">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                  <span className="relative text-white text-base font-bold font-orbitron flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                    Şimdi Keşfet
                  </span>
                </button>
                
                <button className="flex items-center justify-center rounded-xl h-12 px-6 bg-[#1B1137] border border-[#8A2BE2]/30 text-white text-base font-bold font-orbitron transition-all duration-300 hover:bg-[#8A2BE2]/20">
                  Daha Fazla Bilgi
                </button>
              </div>
              
              <div className="mt-12 flex items-center">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-[#1B1137] border-2 border-[#8A2BE2]/30"></div>
                  <div className="size-8 rounded-full bg-[#1B1137] border-2 border-[#8A2BE2]/30"></div>
                  <div className="size-8 rounded-full bg-[#1B1137] border-2 border-[#8A2BE2]/30"></div>
                  <div className="size-8 rounded-full bg-[#1B1137] border-2 border-[#8A2BE2]/30 flex items-center justify-center text-xs">+5</div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-white">1,000+ Kullanıcı</div>
                  <div className="text-xs text-gray-400">Şu an aktif</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Main animated shape */}
                <div className="size-64 md:size-80 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] opacity-20 blur-2xl animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full bg-[#1B1137] border border-[#8A2BE2]/50 flex items-center justify-center overflow-hidden cyber-scan">
                    <div className="absolute inset-0 cyber-grid opacity-30"></div>
                    
                    {/* 3D Object */}
                    <div className="relative size-48 animate-spin-slow">
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
                    
                    {/* Orbiting elements */}
                    <div className="absolute size-full animate-reverse-spin-slow">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-60 border-2 border-dashed border-[#8A2BE2]/30 rounded-full"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-5 rounded-full bg-[#B026FF]"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-4 rounded-full bg-[#8A2BE2]"></div>
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 size-6 rounded-full bg-[#B026FF]"></div>
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 size-3 rounded-full bg-[#8A2BE2]"></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating indicators */}
                <div className="absolute -top-4 right-8 glass rounded-xl p-2 border border-[#8A2BE2]/30 text-xs animate-float">
                  <div className="flex items-center">
                    <div className="size-2 rounded-full bg-[#B026FF] mr-1"></div>
                    <span>Sandbox Bağlantısı</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 -left-8 glass rounded-xl p-2 border border-[#8A2BE2]/30 text-xs animate-float-delay">
                  <div className="flex items-center">
                    <div className="size-2 rounded-full bg-[#8A2BE2] mr-1"></div>
                    <span>Sanal Varlıklar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Features Section */}
<section className="relative py-16 glass-dark border-y border-[#8A2BE2]/20">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-orbitron mb-4">
              <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">Neden</span> 
              <span className="text-white">TAMUSANDBOX?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-rajdhani">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati harum possimus nulla nisi voluptate. Ipsum minima dolorem repellendus porro similique.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass border border-[#8A2BE2]/30 rounded-xl p-6 transition-transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
              
              <div className="size-14 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg mb-4 neon-border cyber-scan">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold font-orbitron mb-2">Güvenli Ortam</h3>
              <p className="text-gray-400 text-sm font-rajdhani mb-4">
                Gelişmiş güvenlik protokolleriyle korunan izole sanal ortamlarda içerik ve varlıklarınızı güvenle yönetin.
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Blokzincir tabanlı güvenlik
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Şifreli iletişim
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Çok faktörlü kimlik doğrulama
                </li>
              </ul>
            </div>
            
            <div className="glass border border-[#8A2BE2]/30 rounded-xl p-6 transition-transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
              
              <div className="size-14 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg mb-4 neon-border cyber-scan">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold font-orbitron mb-2">Detaylı Analiz</h3>
              <p className="text-gray-400 text-sm font-rajdhani mb-4">
                Kullanıcı etkileşimleri, varlık performansı ve sanal ortam metrikleri için kapsamlı analitik araçlar.
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Gerçek zamanlı metrikler
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Etkileşim ve davranış analizi
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Özelleştirilebilir raporlar
                </li>
              </ul>
            </div>
            
            <div className="glass border border-[#8A2BE2]/30 rounded-xl p-6 transition-transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
              
              <div className="size-14 flex items-center justify-center bg-[#8A2BE2]/10 rounded-lg mb-4 neon-border cyber-scan">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold font-orbitron mb-2">Kolay Kullanım</h3>
              <p className="text-gray-400 text-sm font-rajdhani mb-4">
                Sezgisel arayüzler ve kullanıcı dostu deneyimlerle metaverse'e erişim hiç bu kadar kolay olmamıştı.
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Sürükle-bırak arayüzü
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Tek tıkla işlemler
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF] mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Responsive tasarım
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass border border-[#8A2BE2]/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold font-orbitron bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-sm text-gray-400 font-rajdhani">Aktif Kullanıcı</div>
            </div>
            
            <div className="glass border border-[#8A2BE2]/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold font-orbitron bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-sm text-gray-400 font-rajdhani">Sanal Ortam</div>
            </div>
            
            <div className="glass border border-[#8A2BE2]/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold font-orbitron bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent mb-2">100K+</div>
              <div className="text-sm text-gray-400 font-rajdhani">Dijital Varlık</div>
            </div>
            
            <div className="glass border border-[#8A2BE2]/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold font-orbitron bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-sm text-gray-400 font-rajdhani">Teknik Destek</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#8A2BE2]/10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-[#B026FF]/10 blur-3xl translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="glass border border-[#8A2BE2]/30 rounded-xl p-12 max-w-4xl mx-auto text-center relative overflow-hidden cyber-scan">
            <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 size-40 bg-gradient-to-tr from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
            
            <h2 className="text-3xl font-bold font-orbitron mb-4">
              <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">Siber Güvenlik</span> 
              <span className="text-white">Yolculuğunuza Başlayın</span>
            </h2>
            
            <p className="text-gray-400 max-w-xl mx-auto mb-8 font-rajdhani">
              Sınırsız olasılıklar dünyasını keşfetmek için bugün TAMUSANDBOX'a katılın ve geleceğin bir parçası olun.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="relative flex items-center justify-center rounded-xl h-12 px-6 overflow-hidden group cyber-scan">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                <span className="relative text-white text-base font-bold font-orbitron">
                  Ücretsiz Kaydol
                </span>
              </button>
              
              <button className="flex items-center justify-center rounded-xl h-12 px-6 bg-[#1B1137] border border-[#8A2BE2]/30 text-white text-base font-bold font-orbitron transition-all duration-300 hover:bg-[#8A2BE2]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#B026FF]">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
                Demo İzle
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <FooterLanding />
    </div>
  );
};

export default LandingPage;