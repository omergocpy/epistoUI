// src/pages/users/Users.tsx
import React, { useState } from 'react';
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
  { id: '2', username: 'ayse.kara', email: 'ayse.kara@example.com', role: 'Kullanıcı' }
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
    role: 'user',
    password: ''
  });

  const openModal = (mode: 'create' | 'edit', userData?: User) => {
    setModalMode(mode);
    if (mode === 'create') {
      setFormData({ id: '', username: '', email: '', role: 'user', password: '' });
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

  return (
    <div className="min-h-screen bg-[#231010] text-white" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      <HeaderDashboard />
      <main className="px-10 py-5 max-w-[1200px] mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Kullanıcılar</h1>
        <p className="text-sm text-[#cb9090] mb-6">
          Sistemdeki tüm kullanıcıların listesi.
        </p>
        <div className="overflow-hidden rounded-xl border border-[#683131] bg-[#341818]">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#492222]">
              <tr>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Kullanıcı Adı</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">E-Posta</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Rol</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-[#683131]">
                  <td className="px-4 py-2 text-sm">{user.username}</td>
                  <td className="px-4 py-2 text-sm">{user.email}</td>
                  <td className="px-4 py-2 text-sm">{user.role}</td>
                  <td className="px-4 py-2 text-sm text-[#cb9090] font-bold cursor-pointer">
                    <button onClick={() => openModal('edit', user)}>Düzenle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button
            id="newUserBtn"
            onClick={() => openModal('create')}
            className="inline-flex items-center px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl"
          >
            Yeni Kullanıcı Ekle
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
                id="modalCloseBtn"
                className="absolute top-2 right-2 text-white text-sm"
                onClick={closeModal}
              >
                X
              </button>
              <h2 id="userFormTitle" className="text-xl font-bold mb-4">
                {modalMode === 'create' ? 'Yeni Kullanıcı Ekle' : 'Kullanıcı Düzenle'}
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                <input type="hidden" id="userId" value={formData.id} readOnly />
                <div>
                  <label className="text-sm text-[#cb9090] font-medium block mb-1">Kullanıcı Adı</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2 focus:outline-none"
                    placeholder="ali.demir"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#cb9090] font-medium block mb-1">E-Posta</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
                    placeholder="ali.demir@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#cb9090] font-medium block mb-1">Rol</label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    className="form-select w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
                  >
                    <option value="user">Kullanıcı</option>
                    <option value="admin">Yönetici</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#cb9090] font-medium block mb-1">Şifre</label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password || ''}
                    onChange={handleFormChange}
                    className="form-input w-full bg-[#492222] text-white border border-[#492222] rounded-xl px-3 py-2"
                    placeholder="******"
                  />
                </div>
                <button
                  id="userFormSubmit"
                  type="submit"
                  className="mt-2 px-4 py-2 bg-[#f20d0d] text-white text-sm font-bold rounded-xl"
                >
                  Kaydet
                </button>
              </form>
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

export default Users;
