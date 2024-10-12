import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProgramaInstructor = ({ documentoInstructor, fichas, asignaciones, instructores, jornadas, fechaInicio, fechaFin, onCrearAsignacion, onEliminarAsignacion }) => {
  const navigate = useNavigate(); 
  const [instructorActual, setInstructorActual] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState('');
  const [selectedDia, setSelectedDia] = useState('');
  const [selectedJornada, setSelectedJornada] = useState('');
  const [jornadaVisibility, setJornadaVisibility] = useState({});
  const [fechaAsignacionInicio, setFechaAsignacionInicio] = useState(''); // Nuevo estado para la fecha de inicio
  const [fechaAsignacionFin, setFechaAsignacionFin] = useState(''); // Nuevo estado para la fecha de fin
  const classes = useStyles();

  useEffect(() => {
    if (fichas.length > 0) {
      setSelectedFicha(fichas[0].codigo);
    }
  }, [fichas]);

  useEffect(() => {
    const instructor = instructores.find(i => i.documento === documentoInstructor);
    setInstructorActual(instructor);
  }, [documentoInstructor, instructores]);

  useEffect(() => {
    const initialVisibility = {};
    jornadas.forEach(jornada => {
      const asignacionesDelInstructor = asignaciones.filter(a => a.jornada === jornada.nombre && a.instructor === instructorActual?.nombre);
      initialVisibility[jornada.nombre] = asignacionesDelInstructor.length > 0;
    });
    setJornadaVisibility(initialVisibility);
  }, [jornadas, asignaciones, instructorActual]);

  const asignacionesInstructor = asignaciones.filter(a => {
    const inicioAsignacion = new Date(a.inicio);
    const finAsignacion = a.fin ? new Date(a.fin) : null;

    const rangoInstructorDentroDeAsignacion = 
      (fechaInicio && fechaFin) && 
      (
        (new Date(fechaInicio) <= finAsignacion && new Date(fechaFin) >= inicioAsignacion) ||
        (new Date(fechaInicio) <= inicioAsignacion && new Date(fechaFin) >= inicioAsignacion) ||
        (new Date(fechaInicio) <= finAsignacion && new Date(fechaFin) >= finAsignacion)
      );

    return a.instructor === instructorActual?.nombre && rangoInstructorDentroDeAsignacion;
  });

  const handleAbrirFormulario = (dia, jornada) => {
    setSelectedDia(dia);
    setSelectedJornada(jornada);
    setShowForm(true);
    setFechaAsignacionInicio(''); // Reiniciar la fecha de inicio al abrir el formulario
    setFechaAsignacionFin(''); // Reiniciar la fecha de fin al abrir el formulario
  };

  const handleCrear = () => {
    const nuevaAsignacion = {
      ficha: selectedFicha,
      instructor: instructorActual.nombre,
      inicio: fechaAsignacionInicio, // Usar la fecha de inicio del formulario
      fin: fechaAsignacionFin, // Usar la fecha de fin del formulario
      dia: selectedDia,
      jornada: selectedJornada,
    };
    onCrearAsignacion(nuevaAsignacion);
    setShowForm(false);
  };

  const handleEliminar = (idAsignacion) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta asignación?')) {
      onEliminarAsignacion(idAsignacion);
    }
  };

  const toggleJornadaVisibility = (jornada) => {
    setJornadaVisibility(prevState => ({
      ...prevState,
      [jornada]: !prevState[jornada],
    }));
  };

  const abrirConsulta = () => {
    console.log(instructorActual)
    navigate('/consultar-instructor', { 
      state: { instructorActual } 
    });
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.checkboxContainer}>
        {jornadas.map((jornada) => (
          <label key={jornada.id}>
            <input
              type="checkbox"
              checked={jornadaVisibility[jornada.nombre] || false}
              onChange={() => toggleJornadaVisibility(jornada.nombre)}
            />
            {jornada.nombre}
          </label>
        ))}
        <Button onClick={abrirConsulta}>
                        Ver en Calendario
        </Button>
      </div>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Jornada</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead>
        <tbody>
          {jornadas.map((jornada) => (
            jornadaVisibility[jornada.nombre] && (
              <tr key={jornada.id}>
                <td>{instructorActual ? instructorActual.nombre : 'Instructor no encontrado'}</td>
                <td>{jornada.nombre}</td>
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((dia) => {
                  const asignacion = asignacionesInstructor.find(
                    (a) => a.jornada === jornada.nombre && a.dia === dia
                  );

                  return (
                    <td key={dia} onClick={() => asignacion ? handleEliminar(asignacion.id) : handleAbrirFormulario(dia, jornada.nombre)}>
                      {asignacion ? (
                        <div className={classes.asignacion}>
                          <p><strong>{asignacion.fin}</strong></p>
                          <p>{asignacion.ficha}</p>
                          <p>{fichas.find(f => f.codigo === asignacion.ficha)?.programa}</p>
                          <p>{fichas.find(f => f.codigo === asignacion.ficha)?.municipio}</p>
                        </div>
                      ) : (
                        <p className={classes.noAsignado}>No asignado</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            )
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h3>Asignar Ficha</h3>
            <label>
              Ficha:
              <select value={selectedFicha} onChange={(e) => setSelectedFicha(e.target.value)}>
                {fichas.map(ficha => (
                  <option key={ficha.codigo} value={ficha.codigo}>
                    {ficha.codigo}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fecha de Inicio:
              <input 
                type="date" 
                value={fechaAsignacionInicio} 
                onChange={(e) => setFechaAsignacionInicio(e.target.value)} 
              />
            </label>
            <label>
              Fecha de Fin:
              <input 
                type="date" 
                value={fechaAsignacionFin} 
                onChange={(e) => setFechaAsignacionFin(e.target.value)} 
              />
            </label>
            <button onClick={handleCrear}>Asignar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    padding: '20px',
    backgroundColor: '#f3f7f0',
    color: '#333',
  },
  checkboxContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    '& th, & td': {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'center',
    },
    '& th': {
      backgroundColor: '#5eb219',
      color: '#fff',
    },
  },
  asignacion: {
    backgroundColor: '#d3f5bc',
    padding: '10px',
    borderRadius: '4px',
  },
  noAsignado: {
    color: '#999',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
});

export default ProgramaInstructor;
