import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/users/Users.tsx
import { useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
const initialUsers = [
    { id: '1', username: 'ali.demir', email: 'ali.demir@example.com', role: 'Yönetici' },
    { id: '2', username: 'ayse.kara', email: 'ayse.kara@example.com', role: 'Kullanıcı' }
];
const Users = () => {
    const [users, setUsers] = useState(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        email: '',
        role: 'user',
        password: ''
    });
    const openModal = (mode, userData) => {
        setModalMode(mode);
        if (mode === 'create') {
            setFormData({ id: '', username: '', email: '', role: 'user', password: '' });
        }
        else if (mode === 'edit' && userData) {
            setFormData({ ...userData, password: '' });
        }
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'create') {
            // Basit örnek için yeni kullanıcıya rastgele id atıyoruz
            const newUser = { ...formData, id: (users.length + 1).toString() };
            setUsers([...users, newUser]);
        }
        else if (modalMode === 'edit') {
            setUsers(users.map(u => (u.id === formData.id ? formData : u)));
        }
        closeModal();
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#231010] text-white", style: { fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }, children: [_jsx(HeaderDashboard, {}), _jsxs("main", { className: "px-10 py-5 max-w-[1200px] mx-auto w-full", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Kullan\u0131c\u0131lar" }), _jsx("p", { className: "text-sm text-[#cb9090] mb-6", children: "Sistemdeki t\u00FCm kullan\u0131c\u0131lar\u0131n listesi." }), _jsx("div", { className: "overflow-hidden rounded-xl border border-[#683131] bg-[#341818]", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-[#492222]", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "Kullan\u0131c\u0131 Ad\u0131" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "E-Posta" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "Rol" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "\u0130\u015Flem" })] }) }), _jsx("tbody", { children: users.map(user => (_jsxs("tr", { className: "border-t border-[#683131]", children: [_jsx("td", { className: "px-4 py-2 text-sm", children: user.username }), _jsx("td", { className: "px-4 py-2 text-sm", children: user.email }), _jsx("td", { className: "px-4 py-2 text-sm", children: user.role }), _jsx("td", { className: "px-4 py-2 text-sm text-[#cb9090] font-bold cursor-pointer", children: _jsx("button", { onClick: () => openModal('edit', user), children: "D\u00FCzenle" }) })] }, user.id))) })] }) }), _jsx("div", { className: "mt-4", children: _jsx("button", { id: "newUserBtn", onClick: () => openModal('create'), className: "inline-flex items-center px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl", children: "Yeni Kullan\u0131c\u0131 Ekle" }) })] }), isModalOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: closeModal }), _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-[#341818] border border-[#683131] rounded-xl p-6 max-w-md w-full mx-4 relative", children: [_jsx("button", { id: "modalCloseBtn", className: "absolute top-2 right-2 text-white text-sm", onClick: closeModal, children: "X" }), _jsx("h2", { id: "userFormTitle", className: "text-xl font-bold mb-4", children: modalMode === 'create' ? 'Yeni Kullanıcı Ekle' : 'Kullanıcı Düzenle' }), _jsxs("form", { className: "flex flex-col gap-4", onSubmit: handleFormSubmit, children: [_jsx("input", { type: "hidden", id: "userId", value: formData.id, readOnly: true }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "Kullan\u0131c\u0131 Ad\u0131" }), _jsx("input", { type: "text", id: "username", value: formData.username, onChange: handleFormChange, className: "form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none", placeholder: "ali.demir" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "E-Posta" }), _jsx("input", { type: "email", id: "email", value: formData.email, onChange: handleFormChange, className: "form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", placeholder: "ali.demir@example.com" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "Rol" }), _jsxs("select", { id: "role", value: formData.role, onChange: handleFormChange, className: "form-select w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", children: [_jsx("option", { value: "user", children: "Kullan\u0131c\u0131" }), _jsx("option", { value: "admin", children: "Y\u00F6netici" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "\u015Eifre" }), _jsx("input", { type: "password", id: "password", value: formData.password || '', onChange: handleFormChange, className: "form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", placeholder: "******" })] }), _jsx("button", { id: "userFormSubmit", type: "submit", className: "mt-2 px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl", children: "Kaydet" })] }), _jsx("footer", { className: "px-10 py-4 border-t border-[#492222] text-center text-sm text-[#cb9090]", children: _jsx("p", { children: "\u00A9 2025 Sandbox Projesi - T\u00FCm Haklar\u0131 Sakl\u0131d\u0131r." }) })] }) })] })), _jsx(FooterDashboard, {})] }));
};
export default Users;
