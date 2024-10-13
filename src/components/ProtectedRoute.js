import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserPermisos } from '../features/userSlice'; // Asegúrate de que la ruta sea correcta

export const ProtectedRoute = ({ children, requiredPermissions }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const permisos = useSelector(selectUserPermisos);

  // Verifica si el usuario está autenticado y tiene los permisos requeridos
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si se requieren permisos, verifica si el usuario tiene esos permisos
  if (requiredPermissions && !requiredPermissions.every(p => permisos[p])) {
    return <Navigate to="/Denegado" />;
  }

  return children;
};

export const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to="/" /> : children;
};
