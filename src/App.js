import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, RedirectIfAuthenticated } from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Email from './pages/Email';
import GesUsu from './pages/GestionUsuarios';
import GesFicha from './components/GestionFichas';
import GesCoo from './components/GestionCoordinadores';
import GesIns from './components/GestionInstructores';
import GesPro from './components/GestionPrograma'
import Programar from './pages/Programar';
import ProIns from "./pages/ProgramarPorInstructor";
import NotFound from './pages/NotFound';
import ConFicha from './components/ConsultaPorFicha'
import ConIns from './components/ConsultaPorInstructor'
import AccessDenied from './pages/AccessDenied';

function App() {
  return (
    <Router>
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
          <ProtectedRoute requiredPermissions={['gestionUsuarios']}>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
