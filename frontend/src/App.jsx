import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';

// Pages
import Dashboard from './pages/Dashboard';
import AdminLinks from './pages/AdminLinks';
import Login from './pages/Login';

// Components
import Navbar from './components/Navbar';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/api/auth/current-user');
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole('user');
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (authLoading) {
    return (
      <Center h="100vh" bg="gray.900">
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  return (
    <Router>
      <Box minH="100vh" bg="gray.900" color="white">
        <Navbar 
          userRole={userRole}
        />
        <Box as="main" pt="60px">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {userRole === 'admin' && (
              <Route 
                path="/admin/links" 
                element={<AdminLinks />} 
              />
            )}
            {userRole !== 'admin' && (
              <Route path="/admin/links" element={<Navigate to="/" replace />} />
            )}
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App; 