import React from 'react';

const ProtectedRoute = ({ children }) => {
  // With authentication bypassed, we always render the children
  return children;
};

export default ProtectedRoute; 