import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import Email from '../src/pages/Email';
import GesUsu from '../src/pages/GestionUsuarios';
import GesFicha from '../src/components/GestionFichas';
import GesCoo from '../src/components/GestionCoordinadores';
import GesIns from '../src/components/GestionInstructores';
import Programar from '../src/pages/Programar';
import Consultas from '../src/pages/Consultas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gestion-usuarios" element={<GesUsu />} />
        <Route path="/programar" element={<Programar />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/gestion-fichas" element={<GesFicha />} />
        <Route path="/gestion-coordinadores" element={<GesCoo />} />
        <Route path="/gestion-instructores" element={<GesIns />} />
        <Route path="/enviar-email" element={<Email />} />

      </Routes>
    </Router>
  );
}

export default App;
