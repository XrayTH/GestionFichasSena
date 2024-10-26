import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute, RedirectIfAuthenticated } from './components/ProtectedRoute';
import { checkBackendStatus } from './service/statusService'; 
import Login from './pages/Login';
import Home from './pages/Home';
import Email from './pages/Email';
import GesUsu from './pages/GestionUsuarios';
import GesFicha from './pages/GestionFichas';
import GesCoo from './pages/GestionCoordinadores';
import GesIns from './pages/GestionInstructores';
import GesPro from './pages/GestionPrograma';
import Programar from './pages/Programar';
import ProIns from "./pages/ProgramarPorInstructor";
import NotFound from './pages/NotFound';
import ConFicha from './components/ConsultaPorFicha';
import ConIns from './components/ConsultaPorInstructor';
import AccessDenied from './pages/AccessDenied';
import Conectando from './pages/Conectando';
import AuthError from './pages/AuthError';
import Cargando from './components/Cargando';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [isConnected, setIsConnected] = useState(null);
  const location = useLocation();

  const checkConnection = async () => {
    try {
      await checkBackendStatus();
      setIsConnected(true);
    } catch {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, [location]);

  if (isConnected === false) {
    return <Conectando />;
  }

  if (isConnected === null) {
    return <Cargando/>;
  }

  return (
    <Routes>
      <Route path="/login" element={
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/gestion-usuarios" element={
        <ProtectedRoute requiredPermissions={['gestionarUsuarios']}>
          <GesUsu />
        </ProtectedRoute>
      } />
      <Route path="/programar" element={
        <ProtectedRoute requiredPermissions={['verProgramacion']}>
          <Programar />
        </ProtectedRoute>
      } />
      <Route path="/programar-instructor" element={
        <ProtectedRoute requiredPermissions={['verProgramacion']}>
          <ProIns />
        </ProtectedRoute>
      } />
      <Route path="/gestion-fichas" element={
        <ProtectedRoute requiredPermissions={['tablas']}>
          <GesFicha />
        </ProtectedRoute>
      } />
      <Route path="/gestion-coordinadores" element={
        <ProtectedRoute requiredPermissions={['tablas']}>
          <GesCoo />
        </ProtectedRoute>
      } />
      <Route path="/gestion-instructores" element={
        <ProtectedRoute requiredPermissions={['tablas']}>
          <GesIns />
        </ProtectedRoute>
      } />
      <Route path="/enviar-email" element={
        <ProtectedRoute requiredPermissions={['email']}>
          <Email />
        </ProtectedRoute>
      } />
      <Route path="/gestion-programas" element={
        <ProtectedRoute requiredPermissions={['tablas']}>
          <GesPro />
        </ProtectedRoute>
      } />
      <Route path="/consultar-ficha" element={
        <ProtectedRoute requiredPermissions={['verProgramacion']}>
          <ConFicha />
        </ProtectedRoute>
      } />
      <Route path="/consultar-instructor" element={
        <ProtectedRoute requiredPermissions={['verProgramacion']}>
          <ConIns />
        </ProtectedRoute>
      } />
      <Route path="/Denegado" element={<AccessDenied />} />
      <Route path="/error" element={<AuthError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


export default App;
