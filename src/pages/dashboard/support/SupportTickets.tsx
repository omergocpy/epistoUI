// src/pages/support/SupportTickets.tsx
import React, { useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';

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
    <div className="min-h-screen bg-[#231010] text-white" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      <HeaderDashboard />
      <main className="px-10 py-5 max-w-[1200px] mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Destek Talepleri</h1>
        <p className="text-sm text-[#cb9090] mb-6">
          Kullanıcıların destek taleplerini burada listeleyebilir, yeni talep oluşturabilir veya mevcut talepleri görüntüleyip düzenleyebilirsiniz.
        </p>
        <div className="overflow-hidden rounded-xl border border-[#683131] bg-[#341818]">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#492222]">
              <tr>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Konu</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Durum</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Oluşturulma</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id} className="border-t border-[#683131]">
                  <td className="px-4 py-2 text-sm">{ticket.subject}</td>
                  <td className="px-4 py-2 text-sm">{ticket.status}</td>
                  <td className="px-4 py-2 text-sm">{ticket.createdAt}</td>
                  <td className="px-4 py-2 text-sm text-[#cb9090] font-bold cursor-pointer">
                    <button onClick={() => openModal('edit', ticket)}>Görüntüle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button
            id="newTicketBtn"
            onClick={() => openModal('create')}
            className="inline-flex items-center px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl"
          >
            Yeni Talep Oluştur
          </button>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-[#341818] border border-[#683131] rounded-xl p-6 max-w-md w-full mx-4 relative">
              <button
                id="closeModalBtn"
                className="absolute top-2 right-2 text-white text-sm"
                onClick={closeModal}
              >
                X
              </button>
              <h2 id="ticketFormTitle" className="text-xl font-bold mb-4">
                {modalMode === 'create' ? 'Yeni Talep Oluştur' : 'Talep Görüntüle / Düzenle'}
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleTicketFormSubmit}>
                <input type="hidden" id="ticketId" value={currentTicket?.id} readOnly />
                <div>
                  <label className="text-sm text-[#cb9090] font-medium block mb-1">Konu</label>
                  <input
                    type="text"
                    id="ticketSubject"
                    value={currentTicket?.subject || ''}
                    onChange={(e) =>
                      setCurrentTicket(prev => prev ? { ...prev, subject: e.target.value } : null)
                    }
                    className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
                    placeholder="Örn: Oturum açma sorunu"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#cb9090] font-medium block mb-1">Durum</label>
                  <select
                    id="ticketStatus"
                    value={currentTicket?.status || 'Açık'}
                    onChange={(e) =>
                      setCurrentTicket(prev => prev ? { ...prev, status: e.target.value } : null)
                    }
                    className="form-select w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
                  >
                    <option value="Açık">Açık</option>
                    <option value="Yanıtlandı">Yanıtlandı</option>
                    <option value="Kapalı">Kapalı</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#cb9090] font-medium block mb-1">Açıklama</label>
                  <textarea
                    id="ticketContent"
                    rows={3}
                    value={currentTicket?.content || ''}
                    onChange={(e) =>
                      setCurrentTicket(prev => prev ? { ...prev, content: e.target.value } : null)
                    }
                    className="form-textarea w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
                    placeholder="Detayları yazınız..."
                  ></textarea>
                </div>
                <button
                  id="ticketFormBtn"
                  type="submit"
                  className="mt-2 px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl"
                >
                  {modalMode === 'create' ? 'Oluştur' : 'Kaydet'}
                </button>
              </form>
              <div className="mt-6 bg-[#492222] p-3 rounded-xl">
                <h3 className="text-base font-bold mb-2">Yanıtlar</h3>
                <div id="ticketRepliesList" className="flex flex-col gap-2 mb-3">
                  {currentTicket && currentTicket.replies.length > 0 ? (
                    currentTicket.replies.map((r, index) => (
                      <div key={index} className="bg-[#492222] p-2 rounded-md text-white text-sm">
                        <p>
                          <strong>{r.user}</strong>{' '}
                          <span className="text-xs text-[#cb9090]">({r.time})</span>
                        </p>
                        <p>{r.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#cb9090]">Henüz yanıt yok.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="newReply" className="text-sm text-[#cb9090] font-medium">
                    Yeni Yanıt
                  </label>
                  <textarea
                    id="newReply"
                    rows={2}
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="form-textarea w-full mt-1 bg-[#341818] text-white border border-[#683131] rounded-xl px-2 py-1"
                    placeholder="Bu talebe cevap yazın..."
                  ></textarea>
                </div>
                <button
                  id="replySubmitBtn"
                  onClick={handleReplySubmit}
                  className="mt-2 px-4 py-1 bg-[#f20d0d] text-white text-sm font-bold rounded-xl"
                >
                  Gönder
                </button>
              </div>
              {/* Modal içindeki footer (isteğe bağlı) */}
              <footer className="px-10 py-4 border-t border-[#492222] text-center text-sm text-[#cb9090]">
                <p>© 2025 Sandbox Projesi - Tüm Hakları Saklıdır.</p>
              </footer>
            </div>
          </div>
        </>
      )}
      <FooterDashboard />
    </div>
  );
};

export default SupportTickets;
