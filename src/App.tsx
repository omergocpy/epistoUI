// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import { LoadingProvider } from './context/LoadingContext';
// (Opsiyonel) AuthProvider ile kullanıcı oturum yönetimi eklenebilir
// import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    // Global loading durumunu sağlayan context provider
    <LoadingProvider>
      {/* <AuthProvider> */}
      <Router>
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Router>
      {/* </AuthProvider> */}
    </LoadingProvider>
  );
};

export default App;
