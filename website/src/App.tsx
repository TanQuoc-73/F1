import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import { useAuthHook } from './hooks/useAuth';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthHook();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin Route component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuthHook();
  return isAuthenticated && user?.role === 'ADMIN' ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<div>Home Page</div>} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <div>Admin Panel</div>
                  </AdminRoute>
                }
              />
              {/* Add more routes here */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 
