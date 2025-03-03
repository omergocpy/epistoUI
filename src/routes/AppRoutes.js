import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = true;
    return isAuthenticated ? children : _jsx(Navigate, { to: "/login", replace: true });
};
const AppRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(Auth, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: "/profile-detail", element: _jsx(ProtectedRoute, { children: _jsx(ProfileDetail, {}) }) }), _jsx(Route, { path: "/roles", element: _jsx(ProtectedRoute, { children: _jsx(RoleGroupManagement, {}) }) }), _jsx(Route, { path: "/scanner", element: _jsx(ProtectedRoute, { children: _jsx(Scanner, {}) }) }), _jsx(Route, { path: "/scanner-details/:id", element: _jsx(ProtectedRoute, { children: _jsx(ScannerDetails, {}) }) }), _jsx(Route, { path: "/supports", element: _jsx(ProtectedRoute, { children: _jsx(SupportTickets, {}) }) }), _jsx(Route, { path: "/users", element: _jsx(ProtectedRoute, { children: _jsx(Users, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
};
export default AppRoutes;
