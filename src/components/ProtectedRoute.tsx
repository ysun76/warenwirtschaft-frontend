import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// 确保只保留这一个函数，并且有 export default
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 必须 return，否则会报 TS2786 (void) 错误
  return <>{children}</>;
}