import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './components/layout/PrivateRoute';
import AnimatedBackground from './components/AnimatedBackground';

// Lazy loaded pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bins" element={<div className="p-4">Bins Management Under Construction</div>} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path="/users" element={<div className="p-4">Users Management</div>} />
          <Route path="/settings" element={<div className="p-4">Settings</div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedBackground />
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <AnimatedRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
