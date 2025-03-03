import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/roles/RoleGroupManagement.tsx
import { useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
const RoleGroupManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [rolesData, setRolesData] = useState([
        { id: "1", name: "Yönetici", desc: "Tam yetki", permissions: ["perm_create_user", "perm_delete_user"] },
        { id: "2", name: "Kullanıcı", desc: "Sınırlı yetki", permissions: [] },
    ]);
    const [groupsData, setGroupsData] = useState([
        { id: "101", name: "Beta Test Grubu", memberCount: 12 },
        { id: "102", name: "Geliştiriciler", memberCount: 5 },
    ]);
    const usersData = [
        { userId: "u1", username: "ali.demir" },
        { userId: "u2", username: "ayse.kara" },
        { userId: "u3", username: "mehmet.can" },
    ];
    const allPermissions = [
        { id: "perm_create_user", label: "Kullanıcı Oluşturma" },
        { id: "perm_delete_user", label: "Kullanıcı Silme" },
        { id: "perm_view_reports", label: "Raporları Görüntüleme" },
        { id: "perm_edit_settings", label: "Ayarları Düzenleme" },
    ];
    const [userOverrides, setUserOverrides] = useState({
        u1: ["perm_view_reports"],
        u2: [],
    });
    const openModal = (mode, data) => {
        setModalMode(mode);
        if (mode === 'roleCreate') {
            setCurrentRole({ id: '', name: '', desc: '', permissions: [] });
        }
        else if (mode === 'roleEdit') {
            setCurrentRole(data);
        }
        else if (mode === 'groupCreate') {
            setCurrentGroup({ id: '', name: '', memberCount: 0 });
        }
        else if (mode === 'groupEdit') {
            setCurrentGroup(data);
        }
        else if (mode === 'groupAddUser') {
            setCurrentGroup(data);
        }
        else if (mode === 'roleSetPermissions') {
            setCurrentRole(data);
            setSelectedPermissions(data.permissions || []);
        }
        else if (mode === 'userOverridePermissions') {
            setSelectedPermissions([]);
            setSelectedUserId(usersData[0].userId);
        }
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setModalMode(null);
        setCurrentRole(null);
        setCurrentGroup(null);
    };
    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (!modalMode)
            return;
        // Örnek: ilgili mod için console.log ile verileri gösteriyoruz.
        if (modalMode === 'roleCreate') {
            console.log("Yeni Rol Ekle:", currentRole);
        }
        else if (modalMode === 'roleEdit') {
            console.log("Rol Düzenle:", currentRole);
        }
        else if (modalMode === 'groupCreate') {
            console.log("Yeni Grup Ekle:", currentGroup);
        }
        else if (modalMode === 'groupEdit') {
            console.log("Grup Düzenle:", currentGroup);
        }
        else if (modalMode === 'groupAddUser') {
            console.log("Gruba Kullanıcı Ekle:", currentGroup?.id, selectedUserId);
        }
        else if (modalMode === 'roleSetPermissions') {
            console.log("Rol Yetkileri:", currentRole?.id, selectedPermissions);
        }
        else if (modalMode === 'userOverridePermissions') {
            console.log("User override:", selectedUserId, selectedPermissions);
        }
        closeModal();
    };
    const renderModalContent = () => {
        switch (modalMode) {
            case 'roleCreate':
            case 'roleEdit':
                return (_jsxs("div", { id: "roleForm", className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "Rol Ad\u0131" }), _jsx("input", { type: "text", value: currentRole?.name || '', onChange: (e) => setCurrentRole(prev => prev ? { ...prev, name: e.target.value } : null), className: "w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "A\u00E7\u0131klama" }), _jsx("input", { type: "text", value: currentRole?.desc || '', onChange: (e) => setCurrentRole(prev => prev ? { ...prev, desc: e.target.value } : null), className: "w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2" })] })] }));
            case 'groupCreate':
            case 'groupEdit':
                return (_jsxs("div", { id: "groupForm", className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "Grup Ad\u0131" }), _jsx("input", { type: "text", value: currentGroup?.name || '', onChange: (e) => setCurrentGroup(prev => prev ? { ...prev, name: e.target.value } : null), className: "w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-[#cb9090] font-medium block mb-1", children: "\u00DCye Say\u0131s\u0131" }), _jsx("input", { type: "number", value: currentGroup?.memberCount || 0, onChange: (e) => setCurrentGroup(prev => prev ? { ...prev, memberCount: parseInt(e.target.value) } : null), className: "w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2" })] })] }));
            case 'groupAddUser':
                return (_jsxs("div", { id: "groupUserForm", className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-[#cb9090]", children: "Bu gruba eklenecek kullan\u0131c\u0131y\u0131 se\u00E7iniz:" }), _jsx("select", { id: "userAssignmentSelect", value: selectedUserId, onChange: (e) => setSelectedUserId(e.target.value), className: "w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", children: usersData.map(u => (_jsx("option", { value: u.userId, children: u.username }, u.userId))) })] }));
            case 'roleSetPermissions':
                return (_jsxs("div", { id: "permissionsForm", className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-[#cb9090]", children: "Bu rol\u00FCn sahip olaca\u011F\u0131 yetkileri se\u00E7iniz:" }), _jsx("div", { id: "permissionsList", className: "flex flex-col gap-2", children: allPermissions.map(p => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", value: p.id, checked: selectedPermissions.includes(p.id), onChange: (e) => {
                                            if (e.target.checked) {
                                                setSelectedPermissions(prev => [...prev, p.id]);
                                            }
                                            else {
                                                setSelectedPermissions(prev => prev.filter(id => id !== p.id));
                                            }
                                        }, className: "h-4 w-4 bg-[#492222] border-[#683131]" }), p.label] }, p.id))) })] }));
            case 'userOverridePermissions':
                return (_jsxs("div", { id: "userOverrideForm", className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-sm text-[#cb9090]", children: "Kullan\u0131c\u0131 se\u00E7in ve override yetkilerini i\u015Faretleyin." }), _jsx("select", { id: "userOverrideSelect", value: selectedUserId, onChange: (e) => setSelectedUserId(e.target.value), className: "w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2", children: usersData.map(u => (_jsx("option", { value: u.userId, children: u.username }, u.userId))) }), _jsx("div", { id: "userOverridePermissionsList", className: "flex flex-col gap-2", children: allPermissions.map(p => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", value: p.id, checked: selectedPermissions.includes(p.id), onChange: (e) => {
                                            if (e.target.checked) {
                                                setSelectedPermissions(prev => [...prev, p.id]);
                                            }
                                            else {
                                                setSelectedPermissions(prev => prev.filter(id => id !== p.id));
                                            }
                                        }, className: "h-4 w-4 bg-[#492222] border-[#683131]" }), p.label] }, p.id))) })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#231010] text-white", style: { fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }, children: [_jsx(HeaderDashboard, {}), _jsxs("main", { className: "px-10 py-5 max-w-[1200px] mx-auto w-full", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Rol & Grup Y\u00F6netimi + Yetki Atama" }), _jsx("p", { className: "text-sm text-[#cb9090] mb-6", children: "Rollere yetkiler atayabilir, gruplar olu\u015Fturabilir, kullan\u0131c\u0131 bazl\u0131 yetkiler tan\u0131mlayabilirsiniz." }), _jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Roller" }), _jsx("button", { onClick: () => openModal('roleCreate'), className: "bg-[#f20d0d] px-4 py-2 rounded-xl text-sm font-bold", children: "Yeni Rol Ekle" })] }), _jsx("div", { className: "bg-[#341818] p-4 rounded-xl border border-[#683131] mb-6", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-[#492222]", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "Rol Ad\u0131" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "A\u00E7\u0131klama" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "\u0130\u015Flem" })] }) }), _jsx("tbody", { children: rolesData.map(role => (_jsxs("tr", { className: "border-t border-[#683131]", children: [_jsx("td", { className: "px-4 py-2 text-sm", children: role.name }), _jsx("td", { className: "px-4 py-2 text-sm", children: role.desc }), _jsxs("td", { className: "px-4 py-2 text-sm text-[#cb9090] font-bold", children: [_jsx("button", { onClick: () => openModal('roleEdit', role), children: "D\u00FCzenle" }), _jsx("button", { onClick: () => openModal('roleSetPermissions', role), className: "ml-3", children: "Set Permissions" })] })] }, role.id))) })] }) }), _jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Gruplar" }), _jsx("button", { onClick: () => openModal('groupCreate'), className: "bg-[#f20d0d] px-4 py-2 rounded-xl text-sm font-bold", children: "Yeni Grup Ekle" })] }), _jsx("div", { className: "bg-[#341818] p-4 rounded-xl border border-[#683131]", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-[#492222]", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "Grup Ad\u0131" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "\u00DCye Say\u0131s\u0131" }), _jsx("th", { className: "px-4 py-3 text-left text-white text-sm font-medium", children: "\u0130\u015Flem" })] }) }), _jsx("tbody", { children: groupsData.map(group => (_jsxs("tr", { className: "border-t border-[#683131]", children: [_jsx("td", { className: "px-4 py-2 text-sm", children: group.name }), _jsx("td", { className: "px-4 py-2 text-sm", children: group.memberCount }), _jsxs("td", { className: "px-4 py-2 text-sm text-[#cb9090] font-bold", children: [_jsx("button", { onClick: () => openModal('groupEdit', group), children: "D\u00FCzenle" }), _jsx("button", { onClick: () => openModal('groupAddUser', group), className: "ml-3", children: "Kullan\u0131c\u0131 Ekle" })] })] }, group.id))) })] }) })] }), _jsx(FooterDashboard, {}), isModalOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: closeModal }), _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-[#341818] border border-[#683131] rounded-xl p-6 max-w-md w-full mx-4 relative", children: [_jsx("button", { className: "absolute top-2 right-2 text-white text-sm", onClick: closeModal, children: "X" }), _jsxs("h2", { className: "text-xl font-bold mb-4", children: [modalMode === 'roleCreate' && "Yeni Rol Ekle", modalMode === 'roleEdit' && "Rol Düzenle", modalMode === 'groupCreate' && "Yeni Grup Ekle", modalMode === 'groupEdit' && "Grup Düzenle", modalMode === 'groupAddUser' && `Gruba Kullanıcı Ekle (${currentGroup?.name})`, modalMode === 'roleSetPermissions' && `Rol Yetkileri (${currentRole?.name})`, modalMode === 'userOverridePermissions' && "Kullanıcı Bazlı Yetkiler"] }), _jsx("input", { type: "hidden", value: modalMode || '' }), renderModalContent(), _jsxs("button", { onClick: handleModalSubmit, className: "mt-4 px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl", children: [modalMode === 'roleCreate' && "Oluştur", modalMode === 'roleEdit' && "Kaydet", modalMode === 'groupCreate' && "Oluştur", modalMode === 'groupEdit' && "Kaydet", modalMode === 'groupAddUser' && "Ekle", modalMode === 'roleSetPermissions' && "Kaydet", modalMode === 'userOverridePermissions' && "Kaydet"] }), _jsx("footer", { className: "px-10 py-4 border-t border-[#492222] text-center text-sm text-[#cb9090]", children: _jsx("p", { children: "\u00A9 2025 Sandbox Projesi - T\u00FCm Haklar\u0131 Sakl\u0131d\u0131r." }) })] }) })] }))] }));
};
export default RoleGroupManagement;
