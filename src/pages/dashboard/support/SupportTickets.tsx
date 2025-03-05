// src/pages/support/SupportTickets.tsx
import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
import '../../../styles/MetaverseStyles.css'; // CSS dosyasını import ediyoruz

interface Reply {
  user: string;
  message: string;
  time: string;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}

const initialTickets: Ticket[] = [
  {
    id: 'TCK-101',
    subject: 'Oturum açma sorunu',
    status: 'Açık',
    content: 'Sisteme girişte hata alıyorum...',
    createdAt: '1 saat önce',
    replies: [
      { user: 'admin', message: 'Merhaba, problemi detaylandırır mısınız?', time: 'Bugün 10:30' }
    ]
  },
  {
    id: 'TCK-102',
    subject: 'Şifre sıfırlayamıyorum',
    status: 'Yanıtlandı',
    content: 'Şifremi sıfırlayamıyorum, lütfen yardım edin.',
    createdAt: '3 saat önce',
    replies: []
  }
];

const SupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [newReply, setNewReply] = useState<string>('');

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

  const openModal = (mode: 'create' | 'edit', ticketData?: Ticket) => {
    setModalMode(mode);
    if (mode === 'edit' && ticketData) {
      setCurrentTicket({ ...ticketData });
    } else {
      setCurrentTicket({
        id: '',
        subject: '',
        status: 'Açık',
        content: '',
        createdAt: '',
        replies: []
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewReply('');
  };

  const handleTicketFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTicket) return;
    if (modalMode === 'create') {
      const newTicket: Ticket = {
        ...currentTicket,
        id: `TCK-${Math.floor(Math.random() * 1000)}`,
        createdAt: 'Şimdi'
      };
      setTickets([...tickets, newTicket]);
    } else {
      setTickets(tickets.map(t => (t.id === currentTicket.id ? currentTicket : t)));
    }
    closeModal();
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !currentTicket) return;
    const updatedTicket = {
      ...currentTicket,
      replies: [...currentTicket.replies, { user: 'me', message: newReply, time: 'Şimdi' }]
    };
    setCurrentTicket(updatedTicket);
    setTickets(tickets.map(t => (t.id === updatedTicket.id ? updatedTicket : t)));
    setNewReply('');
  };

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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">
                Destek Talepleri
              </h1>
              <p className="text-white mt-1">
                Kullanıcıların destek taleplerini burada listeleyebilir, yeni talep oluşturabilir veya mevcut talepleri görüntüleyip düzenleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Tablo Bölümü */}
        <div className="glass rounded-2xl shadow-xl neon-border overflow-hidden mb-6">
          <div className="p-4 border-b border-[#8A2BE2]/30">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Talepleriniz
              </h2>
              <div className="text-sm text-gray-300">
                Toplam: <span className="text-[#B026FF] font-medium">{tickets.length}</span> talep
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B1137]/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Talep No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Konu</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Durum</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Oluşturulma</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8A2BE2]/20">
                {tickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-[#8A2BE2]/10 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#B026FF]"></span>
                        {ticket.id}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'Açık' ? 'bg-[#8A2BE2]/20 text-[#B026FF]' : 
                        ticket.status === 'Yanıtlandı' ? 'bg-blue-900/20 text-blue-400' : 
                        'bg-gray-800/50 text-gray-400'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{ticket.createdAt}</td>
                    <td className="px-4 py-3 text-sm">
                      <button 
                        onClick={() => openModal('edit', ticket)}
                        className="px-3 py-1 bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 text-white rounded-lg transition-colors duration-150 flex items-center gap-1 text-xs"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        Görüntüle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Buton */}
        <div className="flex justify-end">
          <button
            onClick={() => openModal('create')}
            className="relative px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg cyber-scan overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
            <div className="relative flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Yeni Talep Oluştur
            </div>
          </button>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="glass rounded-xl shadow-xl neon-border max-w-lg w-full relative overflow-hidden animate-fadeIn">
              {/* Modal Header */}
              <div className="border-b border-[#8A2BE2]/30 p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">
                    {modalMode === 'create' ? 'Yeni Talep Oluştur' : 'Talep Detayları'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Modal Body */}
              <div className="p-4">
                <form className="grid gap-4" onSubmit={handleTicketFormSubmit}>
                  <input type="hidden" value={currentTicket?.id} readOnly />
                  
                  <div>
                    <label className="text-sm text-gray-300 font-medium block mb-1.5">Konu</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={currentTicket?.subject || ''}
                        onChange={(e) =>
                          setCurrentTicket(prev => prev ? { ...prev, subject: e.target.value } : null)
                        }
                        className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                        placeholder="Örn: Oturum açma sorunu"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                          <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 font-medium block mb-1.5">Durum</label>
                    <div className="relative">
                      <select
                        value={currentTicket?.status || 'Açık'}
                        onChange={(e) =>
                          setCurrentTicket(prev => prev ? { ...prev, status: e.target.value } : null)
                        }
                        className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors appearance-none"
                      >
                        <option value="Açık">Açık</option>
                        <option value="Yanıtlandı">Yanıtlandı</option>
                        <option value="Kapalı">Kapalı</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 font-medium block mb-1.5">Açıklama</label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={currentTicket?.content || ''}
                        onChange={(e) =>
                          setCurrentTicket(prev => prev ? { ...prev, content: e.target.value } : null)
                        }
                        className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                        placeholder="Detayları yazınız..."
                      ></textarea>
                      <div className="absolute right-3 top-6 text-[#B026FF] opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="relative px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg cyber-scan overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                      <div className="relative flex items-center gap-2">
                        {modalMode === 'create' ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                              <polyline points="17 21 17 13 7 13 7 21"></polyline>
                              <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            Oluştur
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                              <polyline points="17 21 17 13 7 13 7 21"></polyline>
                              <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            Kaydet
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>
                
                {/* Yanıtlar Bölümü */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Yanıtlar
                  </h3>
                  
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2 cyber-grid p-4 glass-dark rounded-xl">
                    {currentTicket && currentTicket.replies.length > 0 ? (
                      currentTicket.replies.map((r, index) => (
                        <div key={index} className={`p-3 rounded-lg ${r.user === 'admin' ? 'glass-dark border border-[#8A2BE2]/20' : 'bg-[#8A2BE2]/10 border border-[#8A2BE2]/30'}`}>
                          <div className="flex justify-between items-center mb-1">
                            <span className={`font-medium ${r.user === 'admin' ? 'text-[#B026FF]' : 'text-white'}`}>
                              {r.user === 'admin' ? 'Destek Yetkilisi' : 'Ben'}
                            </span>
                            <span className="text-xs text-gray-400">{r.time}</span>
                          </div>
                          <p className="text-sm text-white">{r.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <p className="text-sm">Henüz yanıt yok.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <label className="text-sm text-gray-300 font-medium block mb-1.5">Yeni Yanıt</label>
                    <div className="relative">
                      <textarea
                        rows={2}
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                        placeholder="Bu talebe cevap yazın..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleReplySubmit}
                      className="relative px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                      <div className="relative flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        Gönder
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <FooterDashboard />
    </div>
  );
};

export default SupportTickets;