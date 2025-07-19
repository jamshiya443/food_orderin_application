import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole, children }) => {
  const auth = JSON.parse(localStorage.getItem('auth')) || null;

  if (!auth || !auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const userRole = auth.role.toLowerCase();
  const expectedRole = allowedRole.toLowerCase();

  if (userRole !== expectedRole) {
    
    // If wrong role, redirect to the correct panel
    return <Navigate to={`/${userRole}-panel`} replace />;
  }

  return children;
};

export default ProtectedRoute;
