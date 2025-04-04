import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// Pages
import Dashboard from './pages/Dashboard';
import AdminLinks from './pages/AdminLinks';
import Login from './pages/Login';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Mock authentication object to replace Keycloak
const mockAuth = {
  authenticated: true,
  login: () => console.log('Login clicked - Authentication bypassed'),
  logout: () => console.log('Logout clicked - Authentication bypassed'),
  token: 'mock-token',
  hasRealmRole: (role) => true, // Always return true for any role check
  // Add any other methods your app might be using
};

function App() {
  const [authenticated, setAuthenticated] = useState(true); // Always authenticated
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState(['admin', 'user']); // Give all roles

  // No need for authentication initialization
  useEffect(() => {
    // Set up mock auth immediately
    setAuthenticated(true);
    setLoading(false);
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Router>
      <Box minH="100vh" bg="gray.900" color="white">
        <Navbar 
          authenticated={authenticated}
          login={() => mockAuth.login()}
          logout={() => mockAuth.logout()}
          userRoles={userRoles}
        />
        <Box as="main" pt="60px">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/links" element={
              <ProtectedRoute authenticated={authenticated} requiredRole="admin">
                <AdminLinks keycloak={mockAuth} />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login keycloak={mockAuth} />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App; 