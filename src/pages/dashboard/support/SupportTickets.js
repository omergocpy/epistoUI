import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/support/SupportTickets.tsx
import { useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
const initialTickets = [
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
const SupportTickets = () => {
    const [tickets, setTickets] = useState(initialTickets);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentTicket, setCurrentTicket] = useState(null);
    const [newReply, setNewReply] = useState('');
    const openModal = (mode, ticketData) => {
        setModalMode(mode);
        if (mode === 'edit' && ticketData) {
            setCurrentTicket({ ...ticketData });
        }
        else {
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
    const handleTicketFormSubmit = (e) => {
        e.preventDefault();
        if (!currentTicket)
            return;
        if (modalMode === 'create') {
            const newTicket = {
                ...currentTicket,
                id: `TCK-${Math.floor(Math.random() * 1000)}`,
                createdAt: 'Şimdi'
            };
            setTickets([...tickets, newTicket]);
        }
        else {
            setTickets(tickets.map(t => (t.id === currentTicket.id ? currentTicket : t)));
        }
        closeModal();
    };
    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (!newReply.trim() || !currentTicket)
            return;
        const updatedTicket = {
            ...currentTicket,
            replies: [...currentTicket.replies, { user: 'me', message: newReply, time: 'Şimdi' }]
        };
        setCurrentTicket(updatedTicket);
        setTickets(tickets.map(t => (t.id === updatedTicket.id ? updatedTicket : t)));
        setNewReply('');
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#231010] text-white", style: { fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }, children: [_jsx(HeaderDashboard, {}), _jsxs("main", { className: "px-10 py-5 max-w-[1200px] mx-auto w-full", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Destek Talepleri" }), _jsx("p", { className: "text-sm text-[#cb9090] mb-6", children: "Kullan\u0131c\u0131lar\u0131n destek taleplerini burada listeleyebilir, yeni talep olu\u015Fturabilir veya mevcut talepleri g\u00F6r\u00FCnt\u00FCleyip d\u00FCzenleyebilirsiniz." }), _jsx("div", { className: "overflow-hidden rounded-xl border border-[#683131] bg-[#341818]", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-[#492222]", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "Konu" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "Durum" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "Olu\u015Fturulma" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "\u0130\u015Flem" })] }) }), _jsx("tbody", { children: tickets.map(ticket => (_jsxs("tr", { className: "border-t border-[#683131]", children: [_jsx("td", { className: "px-4 py-2 text-sm", children: ticket.subject }), _jsx("td", { className: "px-4 py-2 text-sm", children: ticket.status }), _jsx("td", { className: "px-4 py-2 text-sm", children: ticket.createdAt }), _jsx("td", { className: "px-4 py-2 text-sm text-[#cb9090] font-bold cursor-pointer", children: _jsx("button", { onClick: () => openModal('edit', ticket), children: "G\u00F6r\u00FCnt\u00FCle" }) })] }, ticket.id))) })] }) }), _jsx("div", { className: "mt-4", children: _jsx("button", { id: "newTicketBtn", onClick: () => openModal('create'), className: "inline-flex items-center px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl", children: "Yeni Talep Olu\u015Ftur" }) })] }), isModalOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: closeModal }), _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-[#341818] border border-[#683131] rounded-xl p-6 max-w-md w-full mx-4 relative", children: [_jsx("button", { id: "closeModalBtn", className: "absolute top-2 right-2 text-white text-sm", onClick: closeModal, children: "X" }), _jsx("h2", { id: "ticketFormTitle", className: "text-xl font-bold mb-4", children: modalMode === 'create' ? 'Yeni Talep Oluştur' : 'Talep Görüntüle / Düzenle' }), _jsxs("form", { className: "flex flex-col gap-4", onSubmit: handleTicketFormSubmit, children: [_jsx("input", { type: "hidden", id: "ticketId", value: currentTicket?.id, readOnly: true }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "Konu" }), _jsx("input", { type: "text", id: "ticketSubject", value: currentTicket?.subject || '', onChange: (e) => setCurrentTicket(prev => prev ? { ...prev, subject: e.target.value } : null), className: "form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", placeholder: "\u00D6rn: Oturum a\u00E7ma sorunu" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "Durum" }), _jsxs("select", { id: "ticketStatus", value: currentTicket?.status || 'Açık', onChange: (e) => setCurrentTicket(prev => prev ? { ...prev, status: e.target.value } : null), className: "form-select w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", children: [_jsx("option", { value: "A\u00E7\u0131k", children: "A\u00E7\u0131k" }), _jsx("option", { value: "Yan\u0131tland\u0131", children: "Yan\u0131tland\u0131" }), _jsx("option", { value: "Kapal\u0131", children: "Kapal\u0131" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "A\u00E7\u0131klama" }), _jsx("textarea", { id: "ticketContent", rows: 3, value: currentTicket?.content || '', onChange: (e) => setCurrentTicket(prev => prev ? { ...prev, content: e.target.value } : null), className: "form-textarea w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", placeholder: "Detaylar\u0131 yaz\u0131n\u0131z..." })] }), _jsx("button", { id: "ticketFormBtn", type: "submit", className: "mt-2 px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl", children: modalMode === 'create' ? 'Oluştur' : 'Kaydet' })] }), _jsxs("div", { className: "mt-6 bg-[#492222] p-3 rounded-xl", children: [_jsx("h3", { className: "text-base font-bold mb-2", children: "Yan\u0131tlar" }), _jsx("div", { id: "ticketRepliesList", className: "flex flex-col gap-2 mb-3", children: currentTicket && currentTicket.replies.length > 0 ? (currentTicket.replies.map((r, index) => (_jsxs("div", { className: "bg-[#492222] p-2 rounded-md text-white text-sm", children: [_jsxs("p", { children: [_jsx("strong", { children: r.user }), ' ', _jsxs("span", { className: "text-xs text-[#cb9090]", children: ["(", r.time, ")"] })] }), _jsx("p", { children: r.message })] }, index)))) : (_jsx("p", { className: "text-sm text-[#cb9090]", children: "Hen\u00FCz yan\u0131t yok." })) }), _jsxs("div", { children: [_jsx("label", { htmlFor: "newReply", className: "text-sm text-[#cb9090] font-medium", children: "Yeni Yan\u0131t" }), _jsx("textarea", { id: "newReply", rows: 2, value: newReply, onChange: (e) => setNewReply(e.target.value), className: "form-textarea w-full mt-1 bg-[#341818] text-white border border-[#683131] rounded-xl px-2 py-1", placeholder: "Bu talebe cevap yaz\u0131n..." })] }), _jsx("button", { id: "replySubmitBtn", onClick: handleReplySubmit, className: "mt-2 px-4 py-1 bg-[#f20d0d] text-white text-sm font-bold rounded-xl", children: "G\u00F6nder" })] }), _jsx("footer", { className: "px-10 py-4 border-t border-[#492222] text-center text-sm text-[#cb9090]", children: _jsx("p", { children: "\u00A9 2025 Sandbox Projesi - T\u00FCm Haklar\u0131 Sakl\u0131d\u0131r." }) })] }) })] })), _jsx(FooterDashboard, {})] }));
};
export default SupportTickets;
