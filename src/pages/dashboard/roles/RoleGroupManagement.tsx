// src/pages/roles/RoleGroupManagement.tsx
import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
import '../../../styles/MetaverseStyles.css'; // CSS dosyasını import ediyoruz

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
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-300 font-medium block mb-1.5">Rol Adı</label>
              <div className="relative">
                <input
                  type="text"
                  value={currentRole?.name || ''}
                  onChange={(e) =>
                    setCurrentRole(prev => prev ? { ...prev, name: e.target.value } : null)
                  }
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
              <label className="text-sm text-gray-300 font-medium block mb-1.5">Açıklama</label>
              <div className="relative">
                <input
                  type="text"
                  value={currentRole?.desc || ''}
                  onChange={(e) =>
                    setCurrentRole(prev => prev ? { ...prev, desc: e.target.value } : null)
                  }
                  className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      case 'groupCreate':
      case 'groupEdit':
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-300 font-medium block mb-1.5">Grup Adı</label>
              <div className="relative">
                <input
                  type="text"
                  value={currentGroup?.name || ''}
                  onChange={(e) =>
                    setCurrentGroup(prev => prev ? { ...prev, name: e.target.value } : null)
                  }
                  className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-300 font-medium block mb-1.5">Üye Sayısı</label>
              <div className="relative">
                <input
                  type="number"
                  value={currentGroup?.memberCount || 0}
                  onChange={(e) =>
                    setCurrentGroup(prev => prev ? { ...prev, memberCount: parseInt(e.target.value) } : null)
                  }
                  className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      case 'groupAddUser':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-300">Bu gruba eklenecek kullanıcıyı seçiniz:</p>
            <div className="relative">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors appearance-none"
              >
                {usersData.map(u => (
                  <option key={u.userId} value={u.userId}>
                    {u.username}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        );
      case 'roleSetPermissions':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-300 mb-2">
              Bu rolün sahip olacağı yetkileri seçiniz:
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 glass-dark p-4 rounded-xl">
              {allPermissions.map(p => (
                <label key={p.id} className="flex items-center gap-3 py-2 px-3 hover:bg-[#8A2BE2]/10 rounded-lg transition-colors">
                  <div className="relative h-5 w-5">
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
                      className="absolute opacity-0 h-0 w-0"
                    />
                    <div className={`h-5 w-5 border rounded flex items-center justify-center ${selectedPermissions.includes(p.id) ? 'bg-[#8A2BE2] border-[#8A2BE2]' : 'border-[#8A2BE2]/30 bg-dark-medium/20'}`}>
                      {selectedPermissions.includes(p.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white text-sm">{p.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'userOverridePermissions':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-300 mb-2">Kullanıcı seçin ve override yetkilerini işaretleyin.</p>
            <div className="relative mb-4">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full glass-dark text-white border border-[#8A2BE2]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8A2BE2]/70 transition-colors appearance-none"
              >
                {usersData.map(u => (
                  <option key={u.userId} value={u.userId}>
                    {u.username}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B026FF] opacity-50 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 glass-dark p-4 rounded-xl">
              {allPermissions.map(p => (
                <label key={p.id} className="flex items-center gap-3 py-2 px-3 hover:bg-[#8A2BE2]/10 rounded-lg transition-colors">
                  <div className="relative h-5 w-5">
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
                      className="absolute opacity-0 h-0 w-0"
                    />
                    <div className={`h-5 w-5 border rounded flex items-center justify-center ${selectedPermissions.includes(p.id) ? 'bg-[#8A2BE2] border-[#8A2BE2]' : 'border-[#8A2BE2]/30 bg-dark-medium/20'}`}>
                      {selectedPermissions.includes(p.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white text-sm">{p.label}</span>
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">
                Rol & Grup Yönetimi + Yetki Atama
              </h1>
              <p className="text-white mt-1">
                Rollere yetkiler atayabilir, gruplar oluşturabilir, kullanıcı bazlı yetkiler tanımlayabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Roller Bölümü */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
              Roller
            </h2>
            <button 
              onClick={() => openModal('roleCreate')} 
              className="relative px-4 py-2 rounded-xl text-white font-bold text-sm shadow-lg cyber-scan overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
              <div className="relative flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Yeni Rol Ekle
              </div>
            </button>
          </div>
          <div className="glass rounded-2xl shadow-xl neon-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1B1137]/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Rol Adı</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Açıklama</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Yetkiler</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8A2BE2]/20">
                  {rolesData.map(role => (
                    <tr key={role.id} className="hover:bg-[#8A2BE2]/10 transition-colors duration-150">
                      <td className="px-4 py-3 text-sm font-medium">{role.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{role.desc}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-1 flex-wrap">
                          {role.permissions.length > 0 ? role.permissions.map(perm => (
                            <span key={perm} className="inline-block px-2 py-0.5 bg-[#8A2BE2]/20 text-[#B026FF] text-xs rounded-full">{perm.split('_')[1]}</span>
                          )) : (
                            <span className="text-gray-400 text-xs">Yetki atanmamış</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openModal('roleEdit', role)}
                            className="px-3 py-1 bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 text-white rounded-lg transition-colors duration-150 flex items-center gap-1 text-xs"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Düzenle
                          </button>
                          <button 
                            onClick={() => openModal('roleSetPermissions', role)}
                            className="px-3 py-1 bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 text-white rounded-lg transition-colors duration-150 flex items-center gap-1 text-xs"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            Yetkiler
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

   {/* Gruplar Bölümü */}
   <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Gruplar
            </h2>
            <button 
              onClick={() => openModal('groupCreate')} 
              className="relative px-4 py-2 rounded-xl text-white font-bold text-sm shadow-lg cyber-scan overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
              <div className="relative flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Yeni Grup Ekle
              </div>
            </button>
          </div>
          <div className="glass rounded-2xl shadow-xl neon-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1B1137]/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Grup Adı</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Üye Sayısı</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8A2BE2]/20">
                  {groupsData.map(group => (
                    <tr key={group.id} className="hover:bg-[#8A2BE2]/10 transition-colors duration-150">
                      <td className="px-4 py-3 text-sm font-medium">{group.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span className="bg-[#8A2BE2]/20 px-2 py-0.5 rounded-full text-xs text-[#B026FF]">{group.memberCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openModal('groupEdit', group)}
                            className="px-3 py-1 bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 text-white rounded-lg transition-colors duration-150 flex items-center gap-1 text-xs"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Düzenle
                          </button>
                          <button 
                            onClick={() => openModal('groupAddUser', group)}
                            className="px-3 py-1 bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 text-white rounded-lg transition-colors duration-150 flex items-center gap-1 text-xs"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="8.5" cy="7" r="4"></circle>
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            Kullanıcı Ekle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <FooterDashboard />

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
                    {modalMode === 'roleCreate' && "Yeni Rol Ekle"}
                    {modalMode === 'roleEdit' && "Rol Düzenle"}
                    {modalMode === 'groupCreate' && "Yeni Grup Ekle"}
                    {modalMode === 'groupEdit' && "Grup Düzenle"}
                    {modalMode === 'groupAddUser' && `Gruba Kullanıcı Ekle (${currentGroup?.name})`}
                    {modalMode === 'roleSetPermissions' && `Rol Yetkileri (${currentRole?.name})`}
                    {modalMode === 'userOverridePermissions' && "Kullanıcı Bazlı Yetkiler"}
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
                <form onSubmit={handleModalSubmit}>
                  {renderModalContent()}
                  
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="relative px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg cyber-scan overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF]"></div>
                      <div className="relative flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {modalMode === 'roleCreate' || modalMode === 'groupCreate' ? (
                            <><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></>
                          ) : (
                            <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></>
                          )}
                        </svg>
                        {modalMode === 'roleCreate' && "Oluştur"}
                        {modalMode === 'roleEdit' && "Kaydet"}
                        {modalMode === 'groupCreate' && "Oluştur"}
                        {modalMode === 'groupEdit' && "Kaydet"}
                        {modalMode === 'groupAddUser' && "Ekle"}
                        {modalMode === 'roleSetPermissions' && "Kaydet"}
                        {modalMode === 'userOverridePermissions' && "Kaydet"}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleGroupManagement;