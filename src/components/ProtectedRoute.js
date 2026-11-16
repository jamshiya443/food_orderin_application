
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole, children }) => {
  let auth = null;

  try {
    auth = JSON.parse(localStorage.getItem('auth'));
  } catch (error) {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
  }

  if (!auth || !auth.isLoggedIn || !auth.role) {
    return <Navigate to="/login" replace />;
  }

  const userRole = auth.role.toLowerCase();
  const expectedRole = allowedRole.toLowerCase();

  if (userRole !== expectedRole) {
    return <Navigate to={`/${userRole}-panel`} replace />;
  }

  return children;
};

export default ProtectedRoute;
