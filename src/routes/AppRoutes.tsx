// src/routes/AppRoutes.tsx
import React, { JSX } from 'react';
// react-router-dom v6'ya göre importlar
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
// Dashboard sayfası, burada "Home" olarak adlandırılmış
import Home from '../pages/dashboard/Home';

// Örnek ProtectedRoute bileşeni (gerçek doğrulama eklenmeli)
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = false; // Gerçek oturum kontrolünü burada gerçekleştirin
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Giriş öncesi sayfalar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Giriş sonrası korumalı dashboard sayfası */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      
      {/* Bilinmeyen yollar için yönlendirme */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
