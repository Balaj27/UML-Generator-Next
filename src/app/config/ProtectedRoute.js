// ProtectedRoute.js
import React from 'react';
import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, restricted }) => {
  const { currentUser } = useAuth();

  if (!currentUser && !restricted) {
    return <Navigate to="/Pages/login" replace />;
  }

  if (currentUser && restricted) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
