// src/pages/users/Users.tsx
import React, { useState } from 'react';
import '../../../styles/MetaverseStyles.css';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

const initialUsers: User[] = [
  { id: '1', username: 'ali.demir', email: 'ali.demir@example.com', role: 'Yönetici' },
  { id: '2', username: 'ayse.kara', email: 'ayse.kara@example.com', role: 'Kullanıcı' },
  { id: '3', username: 'mehmet.yilmaz', email: 'mehmet.yilmaz@example.com', role: 'Analist' },
  { id: '4', username: 'zeynep.aksoy', email: 'zeynep.aksoy@example.com', role: 'Kullanıcı' }
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: '',
    username: '',
    email: '',
    role: 'Kullanıcı',
    password: ''
  });
  const [searchTerm, setSearchTerm] = useState<string>('');

  const openModal = (mode: 'create' | 'edit', userData?: User) => {
    setModalMode(mode);
    if (mode === 'create') {
      setFormData({ id: '', username: '', email: '', role: 'Kullanıcı', password: '' });
    } else if (mode === 'edit' && userData) {
      setFormData({ ...userData, password: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      // Basit örnek için yeni kullanıcıya rastgele id atıyoruz
      const newUser = { ...formData, id: (users.length + 1).toString() };
      setUsers([...users, newUser]);
    } else if (modalMode === 'edit') {
      setUsers(users.map(u => (u.id === formData.id ? formData : u)));
    }
    closeModal();
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0921] text-white flex flex-col">
      <HeaderDashboard />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold font-orbitron mb-2 flex items-center">
                <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">Kullanıcı</span>
                <span className="text-white">Yönetimi</span>
                <div className="ml-3 size-6 bg-[#8A2BE2]/20 rounded-full flex items-center justify-center text-xs text-white">
                  {users.length}
                </div>
              </h1>
              <p className="text-sm text-gray-400 font-rajdhani">
                Sistemdeki tüm kullanıcıların listesi ve yönetimi
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={() => openModal('create')}
                className="relative flex items-center justify-center rounded-xl h-10 px-4 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] transition-all duration-300"></div>
                <span className="relative text-white text-sm font-bold font-orbitron flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <line x1="19" x2="19" y1="8" y2="14"></line>
                    <line x1="16" x2="22" y1="11" y2="11"></line>
                  </svg>
                  Yeni Kullanıcı
                </span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 glass-dark p-4 rounded-xl border border-[#8A2BE2]/20">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Kullanıcı ara..." 
                  className="w-full pl-10 pr-3 py-2 rounded-xl text-sm bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select className="py-2 px-3 rounded-xl text-sm bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200">
                <option value="">Tüm Roller</option>
                <option value="admin">Yönetici</option>
                <option value="user">Kullanıcı</option>
                <option value="analyst">Analist</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="glass-dark rounded-xl border border-[#8A2BE2]/20 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B1137]/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-[#8A2BE2]/20">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-[#8A2BE2]/20">Kullanıcı Adı</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-[#8A2BE2]/20">E-posta</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-[#8A2BE2]/20">Rol</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-[#8A2BE2]/20">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8A2BE2]/20">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-[#8A2BE2]/5 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="size-8 rounded-full bg-[#8A2BE2]/20 flex items-center justify-center text-[#B026FF] font-medium text-sm mr-3">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-white">{user.username}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'Yönetici' 
                          ? 'bg-[#B026FF]/20 text-[#B026FF]' 
                          : user.role === 'Analist'
                          ? 'bg-blue-400/20 text-blue-400'
                          : 'bg-green-400/20 text-green-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openModal('edit', user)}
                          className="text-[#B026FF] hover:text-[#B026FF]/80 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#8A2BE2]/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B026FF]">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Kullanıcı bulunamadı.</p>
              </div>
            )}
          </div>
          
          {filteredUsers.length > 0 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-[#8A2BE2]/20 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#1B1137] border border-[#8A2BE2]/20 rounded-xl">
                  Önceki
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#1B1137] border border-[#8A2BE2]/20 rounded-xl">
                  Sonraki
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Toplam <span className="font-medium">{filteredUsers.length}</span> kullanıcı
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-xl border border-[#8A2BE2]/20 bg-[#1B1137] text-sm font-medium text-white hover:bg-[#8A2BE2]/10">
                      <span className="sr-only">Önceki</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-[#8A2BE2]/20 bg-[#8A2BE2]/20 text-sm font-medium text-white">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-[#8A2BE2]/20 bg-[#1B1137] text-sm font-medium text-white hover:bg-[#8A2BE2]/10">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-xl border border-[#8A2BE2]/20 bg-[#1B1137] text-sm font-medium text-white hover:bg-[#8A2BE2]/10">
                      <span className="sr-only">Sonraki</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="glass border border-[#8A2BE2]/30 rounded-xl w-full max-w-md p-6 mx-4 relative overflow-hidden cyber-scan">
              <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 size-16 bg-gradient-to-tr from-[#8A2BE2]/20 to-[#B026FF]/10 blur-xl rounded-full"></div>
              
              <button
                className="absolute top-4 right-4 text-white hover:text-[#B026FF] transition-colors"
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <h2 className="text-xl font-bold font-orbitron mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#B026FF]">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  {modalMode === 'create' && (
                    <>
                      <line x1="19" x2="19" y1="8" y2="14"></line>
                      <line x1="16" x2="22" y1="11" y2="11"></line>
                    </>
                  )}
                  {modalMode === 'edit' && (
                    <path d="M17 11l2 2-2 2"></path>
                  )}
                </svg>
                <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] bg-clip-text text-transparent">
                  {modalMode === 'create' ? 'Yeni Kullanıcı' : 'Kullanıcı Düzenle'}
                </span>
              </h2>
              <p className="text-sm text-gray-400 font-rajdhani mb-6">
                {modalMode === 'create' 
                  ? 'Sisteme yeni bir kullanıcı eklemek için aşağıdaki formu doldurun.' 
                  : 'Kullanıcı bilgilerini güncellemek için formu düzenleyin.'}
              </p>
              
              <form onSubmit={handleFormSubmit}>
                <input type="hidden" id="id" value={formData.id} />
                
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium mb-1 font-rajdhani">Kullanıcı Adı</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={handleFormChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500"
                      placeholder="ali.demir"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1 font-rajdhani">E-posta</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500"
                      placeholder="ali.demir@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium mb-1 font-rajdhani">Rol</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                      </svg>
                    </div>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      className="appearance-none w-full pl-10 pr-8 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200"
                      required
                    >
                      <option value="Kullanıcı">Kullanıcı</option>
                      <option value="Yönetici">Yönetici</option>
                      <option value="Analist">Analist</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#B026FF]" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium mb-1 font-rajdhani">
                    {modalMode === 'create' ? 'Şifre' : 'Şifre (Boş bırakırsanız değişmez)'}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B026FF]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={formData.password || ''}
                      onChange={handleFormChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#1B1137] text-white border border-[#8A2BE2]/20 focus:border-[#8A2BE2]/50 focus:outline-none transition-all duration-200 placeholder-gray-500"
                      placeholder="••••••"
                      {...(modalMode === 'create' ? { required: true } : {})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <button 
                    type="submit" 
                    className="relative w-full flex items-center justify-center rounded-xl h-12 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#B026FF] transition-all duration-300"></div>
                    <span className="relative text-white text-base font-bold font-orbitron">
                      {modalMode === 'create' ? 'Kullanıcı Ekle' : 'Değişiklikleri Kaydet'}
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full flex items-center justify-center rounded-xl h-12 bg-[#1B1137] border border-[#8A2BE2]/30 text-white text-sm font-bold font-orbitron transition-all duration-300 hover:bg-[#8A2BE2]/20"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <FooterDashboard />
    </div>
  );
};

export default Users;