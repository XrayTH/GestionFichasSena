import React from 'react';
import GesFicha from '../src/components/GestionFichas';
import GesCoo from '../src/components/GestionCoordinadores';
import GesIns from '../src/components/GestionInstructores';

const Tablas = ({ tabla }) => {
  switch (tabla) {
    case 'Fichas':
      return <div><GesFicha /></div>;
    case 'Coordinadores':
      return <div><GesCoo /></div>;
    case 'Instructores':
      return <div><GesIns /></div>;
    case 'Programa':
      return null;
    default:
      return <div>Tabla no encontrada</div>;
  }
};

export default Tablas;
