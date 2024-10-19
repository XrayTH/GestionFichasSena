import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserPermisos } from '../features/userSlice'; 

export const ProtectedRoute = ({ children, requiredPermissions }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const permisos = useSelector(selectUserPermisos);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredPermissions && !requiredPermissions.every(p => permisos[p])) {
    return <Navigate to="/Denegado" />;
  }

  return children;
};

export const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to="/" /> : children;
};
