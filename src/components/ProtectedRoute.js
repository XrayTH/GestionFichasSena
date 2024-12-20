import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectToken, selectUserPermisos, logout } from '../features/userSlice'; 
import { verificarTokenYPermisos } from '../service/userService'; 
import Cargando from './Cargando';

export const ProtectedRoute = ({ children, requiredPermissions }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectToken);
  const permisos = useSelector(selectUserPermisos);
  const [validando, setValidando] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const verificarAcceso = async () => {
      if (!token) {
        if (isAuthenticated) {
          dispatch(logout());
        }
        setValidando(false);
        //setError('No token');
        return;
      }

      try {
        const validacion = await verificarTokenYPermisos(token, permisos);
        
        if (validacion.tokenValido && validacion.permisosValidos) {
          setValidando(false);
        } else {
          if (isAuthenticated) {
            dispatch(logout());
          }
          setValidando(false);
        }
      } catch (error) {
        if (error.status === 401) {
          if(error.mensajeError === "Token expirado"){
            setError('Token expirado'); 
          }else{
            setError('Token inválido o expirado'); 
          }
        } else if (error.status === 403) {
          setError('Acceso denegado: no tiene los permisos requeridos');
        } else if (error.status === 404) {
          setError('Usuario no encontrado');
        } else {
          setError(error.mensajeError || 'Error del servidor');
        }
        if (isAuthenticated) {
          dispatch(logout());
        }
        setValidando(false);
      }
      
    };

    verificarAcceso();
  }, [token, permisos, isAuthenticated, dispatch, location]);

  if (validando) {
    return <Cargando/>;
  }

  if (error) {
    if(error === "Token expirado"){
      return <Navigate to="/Expired" />;
    }else{
      return <Navigate to="/error" />;
    }
  }

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