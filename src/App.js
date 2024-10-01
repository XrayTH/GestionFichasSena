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
import Programar from './pages/Programar';
import Consultas from './pages/Consultas';
import NotFound from './pages/NotFound'; // Importa el componente NotFound

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
          <ProtectedRoute>
            <GesUsu />
          </ProtectedRoute>
        } />
        
        <Route path="/programar" element={
          <ProtectedRoute>
            <Programar />
          </ProtectedRoute>
        } />
        
        <Route path="/consultas" element={
          <ProtectedRoute>
            <Consultas />
          </ProtectedRoute>
        } />
        
        <Route path="/gestion-fichas" element={
          <ProtectedRoute>
            <GesFicha />
          </ProtectedRoute>
        } />
        
        <Route path="/gestion-coordinadores" element={
          <ProtectedRoute>
            <GesCoo />
          </ProtectedRoute>
        } />
        
        <Route path="/gestion-instructores" element={
          <ProtectedRoute>
            <GesIns />
          </ProtectedRoute>
        } />
        
        <Route path="/enviar-email" element={
          <ProtectedRoute>
            <Email />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
