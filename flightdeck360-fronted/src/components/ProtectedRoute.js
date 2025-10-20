import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../utils/auth';

export default function ProtectedRoute({ children, role }) {
  const token = getToken();
  const user = getUser();
  if (!token) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return children;
}
