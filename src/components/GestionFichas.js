import React from 'react'
import FichaBasica from './FichaBasica';
import NewFichaBasica from './NewFichaBasica';

function GestionFichas() {

    const fichaPrueba = {
        id: 1,
        coordinador: '',
        programa: '',
        jornada: 'Mañana',
        ambiente: 'Laboratorio 101',
        inicio: '2024-10-01',
        fin: '2024-12-15',
        requerimientos: 'Proyector, PC con software especializado',
      }
      

  return (
    <div>
    
        <NewFichaBasica/>

    </div>
  )
}

export default GestionFichas
