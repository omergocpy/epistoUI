// src/pages/roles/RoleGroupManagement.tsx
import React, { useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';

interface Role {
  id: string;
  name: string;
  desc: string;
  permissions: string[];
}

interface Group {
  id: string;
  name: string;
  memberCount: number;
}

interface User {
  userId: string;
  username: string;
}

interface Permission {
  id: string;
  label: string;
}

type ModalMode =
  | 'roleCreate'
  | 'roleEdit'
  | 'groupCreate'
  | 'groupEdit'
  | 'groupAddUser'
  | 'roleSetPermissions'
  | 'userOverridePermissions'
  | null;

const RoleGroupManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const [rolesData, setRolesData] = useState<Role[]>([
    { id: "1", name: "Yönetici", desc: "Tam yetki", permissions: ["perm_create_user", "perm_delete_user"] },
    { id: "2", name: "Kullanıcı", desc: "Sınırlı yetki", permissions: [] },
  ]);
  const [groupsData, setGroupsData] = useState<Group[]>([
    { id: "101", name: "Beta Test Grubu", memberCount: 12 },
    { id: "102", name: "Geliştiriciler", memberCount: 5 },
  ]);

  const usersData: User[] = [
    { userId: "u1", username: "ali.demir" },
    { userId: "u2", username: "ayse.kara" },
    { userId: "u3", username: "mehmet.can" },
  ];
  const allPermissions: Permission[] = [
    { id: "perm_create_user", label: "Kullanıcı Oluşturma" },
    { id: "perm_delete_user", label: "Kullanıcı Silme" },
    { id: "perm_view_reports", label: "Raporları Görüntüleme" },
    { id: "perm_edit_settings", label: "Ayarları Düzenleme" },
  ];
  const [userOverrides, setUserOverrides] = useState<{ [key: string]: string[] }>({
    u1: ["perm_view_reports"],
    u2: [],
  });

  const openModal = (mode: ModalMode, data?: Role | Group) => {
    setModalMode(mode);
    if (mode === 'roleCreate') {
      setCurrentRole({ id: '', name: '', desc: '', permissions: [] });
    } else if (mode === 'roleEdit') {
      setCurrentRole(data as Role);
    } else if (mode === 'groupCreate') {
      setCurrentGroup({ id: '', name: '', memberCount: 0 });
    } else if (mode === 'groupEdit') {
      setCurrentGroup(data as Group);
    } else if (mode === 'groupAddUser') {
      setCurrentGroup(data as Group);
    } else if (mode === 'roleSetPermissions') {
      setCurrentRole(data as Role);
      setSelectedPermissions((data as Role).permissions || []);
    } else if (mode === 'userOverridePermissions') {
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

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalMode) return;
    // Örnek: ilgili mod için console.log ile verileri gösteriyoruz.
    if (modalMode === 'roleCreate') {
      console.log("Yeni Rol Ekle:", currentRole);
    } else if (modalMode === 'roleEdit') {
      console.log("Rol Düzenle:", currentRole);
    } else if (modalMode === 'groupCreate') {
      console.log("Yeni Grup Ekle:", currentGroup);
    } else if (modalMode === 'groupEdit') {
      console.log("Grup Düzenle:", currentGroup);
    } else if (modalMode === 'groupAddUser') {
      console.log("Gruba Kullanıcı Ekle:", currentGroup?.id, selectedUserId);
    } else if (modalMode === 'roleSetPermissions') {
      console.log("Rol Yetkileri:", currentRole?.id, selectedPermissions);
    } else if (modalMode === 'userOverridePermissions') {
      console.log("User override:", selectedUserId, selectedPermissions);
    }
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalMode) {
      case 'roleCreate':
      case 'roleEdit':
        return (
          <div id="roleForm" className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">Rol Adı</label>
              <input
                type="text"
                value={currentRole?.name || ''}
                onChange={(e) =>
                  setCurrentRole(prev => prev ? { ...prev, name: e.target.value } : null)
                }
                className="w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">Açıklama</label>
              <input
                type="text"
                value={currentRole?.desc || ''}
                onChange={(e) =>
                  setCurrentRole(prev => prev ? { ...prev, desc: e.target.value } : null)
                }
                className="w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
              />
            </div>
          </div>
        );
      case 'groupCreate':
      case 'groupEdit':
        return (
          <div id="groupForm" className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">Grup Adı</label>
              <input
                type="text"
                value={currentGroup?.name || ''}
                onChange={(e) =>
                  setCurrentGroup(prev => prev ? { ...prev, name: e.target.value } : null)
                }
                className="w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-[#cb9090] font-medium block mb-1">Üye Sayısı</label>
              <input
                type="number"
                value={currentGroup?.memberCount || 0}
                onChange={(e) =>
                  setCurrentGroup(prev => prev ? { ...prev, memberCount: parseInt(e.target.value) } : null)
                }
                className="w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
              />
            </div>
          </div>
        );
      case 'groupAddUser':
        return (
          <div id="groupUserForm" className="flex flex-col gap-4">
            <p className="text-sm text-[#cb9090]">Bu gruba eklenecek kullanıcıyı seçiniz:</p>
            <select
              id="userAssignmentSelect"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
            >
              {usersData.map(u => (
                <option key={u.userId} value={u.userId}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>
        );
      case 'roleSetPermissions':
        return (
          <div id="permissionsForm" className="flex flex-col gap-4">
            <p className="text-sm text-[#cb9090]">
              Bu rolün sahip olacağı yetkileri seçiniz:
            </p>
            <div id="permissionsList" className="flex flex-col gap-2">
              {allPermissions.map(p => (
                <label key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={p.id}
                    checked={selectedPermissions.includes(p.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPermissions(prev => [...prev, p.id]);
                      } else {
                        setSelectedPermissions(prev =>
                          prev.filter(id => id !== p.id)
                        );
                      }
                    }}
                    className="h-4 w-4 bg-[#492222] border-[#683131]"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
        );
      case 'userOverridePermissions':
        return (
          <div id="userOverrideForm" className="flex flex-col gap-4">
            <p className="text-sm text-[#cb9090]">Kullanıcı seçin ve override yetkilerini işaretleyin.</p>
            <select
              id="userOverrideSelect"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
            >
              {usersData.map(u => (
                <option key={u.userId} value={u.userId}>
                  {u.username}
                </option>
              ))}
            </select>
            <div id="userOverridePermissionsList" className="flex flex-col gap-2">
              {allPermissions.map(p => (
                <label key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={p.id}
                    checked={selectedPermissions.includes(p.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPermissions(prev => [...prev, p.id]);
                      } else {
                        setSelectedPermissions(prev =>
                          prev.filter(id => id !== p.id)
                        );
                      }
                    }}
                    className="h-4 w-4 bg-[#492222] border-[#683131]"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#231010] text-white"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <HeaderDashboard />
      <main className="px-10 py-5 max-w-[1200px] mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Rol & Grup Yönetimi + Yetki Atama</h1>
        <p className="text-sm text-[#cb9090] mb-6">
          Rollere yetkiler atayabilir, gruplar oluşturabilir, kullanıcı bazlı yetkiler tanımlayabilirsiniz.
        </p>

        {/* Roller */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Roller</h2>
          <button onClick={() => openModal('roleCreate')} className="bg-[#f20d0d] px-4 py-2 rounded-xl text-sm font-bold">
            Yeni Rol Ekle
          </button>
        </div>
        <div className="bg-[#341818] p-4 rounded-xl border border-[#683131] mb-6">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#492222]">
              <tr>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Rol Adı</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Açıklama</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {rolesData.map(role => (
                <tr key={role.id} className="border-t border-[#683131]">
                  <td className="px-4 py-2 text-sm">{role.name}</td>
                  <td className="px-4 py-2 text-sm">{role.desc}</td>
                  <td className="px-4 py-2 text-sm text-[#cb9090] font-bold">
                    <button onClick={() => openModal('roleEdit', role)}>Düzenle</button>
                    <button onClick={() => openModal('roleSetPermissions', role)} className="ml-3">
                      Set Permissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gruplar */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Gruplar</h2>
          <button onClick={() => openModal('groupCreate')} className="bg-[#f20d0d] px-4 py-2 rounded-xl text-sm font-bold">
            Yeni Grup Ekle
          </button>
        </div>
        <div className="bg-[#341818] p-4 rounded-xl border border-[#683131]">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#492222]">
              <tr>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Grup Adı</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Üye Sayısı</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {groupsData.map(group => (
                <tr key={group.id} className="border-t border-[#683131]">
                  <td className="px-4 py-2 text-sm">{group.name}</td>
                  <td className="px-4 py-2 text-sm">{group.memberCount}</td>
                  <td className="px-4 py-2 text-sm text-[#cb9090] font-bold">
                    <button onClick={() => openModal('groupEdit', group)}>Düzenle</button>
                    <button onClick={() => openModal('groupAddUser', group)} className="ml-3">
                      Kullanıcı Ekle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <FooterDashboard />

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-[#341818] border border-[#683131] rounded-xl p-6 max-w-md w-full mx-4 relative">
              <button className="absolute top-2 right-2 text-white text-sm" onClick={closeModal}>
                X
              </button>
              <h2 className="text-xl font-bold mb-4">
                {modalMode === 'roleCreate' && "Yeni Rol Ekle"}
                {modalMode === 'roleEdit' && "Rol Düzenle"}
                {modalMode === 'groupCreate' && "Yeni Grup Ekle"}
                {modalMode === 'groupEdit' && "Grup Düzenle"}
                {modalMode === 'groupAddUser' && `Gruba Kullanıcı Ekle (${currentGroup?.name})`}
                {modalMode === 'roleSetPermissions' && `Rol Yetkileri (${currentRole?.name})`}
                {modalMode === 'userOverridePermissions' && "Kullanıcı Bazlı Yetkiler"}
              </h2>
              <input type="hidden" value={modalMode || ''} />
              {renderModalContent()}
              <button
                onClick={handleModalSubmit}
                className="mt-4 px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl"
              >
                {modalMode === 'roleCreate' && "Oluştur"}
                {modalMode === 'roleEdit' && "Kaydet"}
                {modalMode === 'groupCreate' && "Oluştur"}
                {modalMode === 'groupEdit' && "Kaydet"}
                {modalMode === 'groupAddUser' && "Ekle"}
                {modalMode === 'roleSetPermissions' && "Kaydet"}
                {modalMode === 'userOverridePermissions' && "Kaydet"}
              </button>
              <footer className="px-10 py-4 border-t border-[#492222] text-center text-sm text-[#cb9090]">
                <p>© 2025 Sandbox Projesi - Tüm Hakları Saklıdır.</p>
              </footer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleGroupManagement;
