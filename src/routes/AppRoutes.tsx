import React, { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/dashboard/Home';
import Auth from '../pages/Auth';
import ProfileDetail from '../pages/dashboard/profile/ProfileDetail';
import RoleGroupManagement from '../pages/dashboard/roles/RoleGroupManagement';
import Scanner from '../pages/dashboard/scanner/Scanner';
import ScannerDetails from '../pages/dashboard/scanner/ScannerDetails';
import SupportTickets from '../pages/dashboard/support/SupportTickets';
import Users from '../pages/dashboard/users/Users';


const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = true; 
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Sayfaları */}
      <Route path="/login" element={<Auth />} />

      {/* Dashboard & Korumalı Sayfalar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile-detail"
        element={
          <ProtectedRoute>
            <ProfileDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoute>
            <RoleGroupManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scanner"
        element={
          <ProtectedRoute>
            <Scanner />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scanner-details/:id"
        element={
          <ProtectedRoute>
            <ScannerDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/supports"
        element={
          <ProtectedRoute>
            <SupportTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
