import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { selectUserPermisos } from '../features/userSlice'; 
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PhoneDialer from './PhoneDialer';

const ProgramaInstructor = ({ documentoInstructor, fichas, asignaciones, instructores, jornadas, fechaInicio, fechaFin, onCrearAsignacion, onEliminarAsignacion }) => {
  const navigate = useNavigate(); 
  const [instructorActual, setInstructorActual] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState('');
  const [selectedDia, setSelectedDia] = useState('');
  const [selectedJornada, setSelectedJornada] = useState('');
  const [jornadaVisibility, setJornadaVisibility] = useState({});
  const [fechaAsignacionInicio, setFechaAsignacionInicio] = useState(fechaInicio); 
  const [fechaAsignacionFin, setFechaAsignacionFin] = useState(fechaFin); 

  const permisos = useSelector(selectUserPermisos);

  const classes = useStyles({permisos});

  const [fichasFiltradas, setFichasFiltradas] = useState([]);

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

  useEffect(() => {
    const filtradas = permisos.editProgramacion === "Todos" 
        ? fichas 
        : fichas.filter(ficha => ficha.coordinador === permisos.editProgramacion);
    setFichasFiltradas(filtradas);
  }, [fichas, permisos.editProgramacion]);

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
    if (permisos.editProgramacion === "Ninguno") return; 
    setSelectedDia(dia);
    setSelectedJornada(jornada);
    setShowForm(true);
    setFechaAsignacionInicio(fechaInicio); 
    setFechaAsignacionFin(fechaFin); 
  };

  const handleCrear = () => {
    const nuevaAsignacion = {
      ficha: selectedFicha,
      instructor: instructorActual.nombre,
      inicio: fechaAsignacionInicio,
      fin: fechaAsignacionFin,
      dia: selectedDia,
      jornada: selectedJornada,
    };
    onCrearAsignacion(nuevaAsignacion);
    setShowForm(false);
  };

  const handleEliminar = (asignacion) => {
    if (permisos.editProgramacion === "Ninguno") return; 
  
    const tienePermiso = fichasFiltradas.some(ficha => ficha.codigo === asignacion.ficha);
  
    if (!tienePermiso) {
      alert("No tienes permisos sobre esta ficha");
      return;
    }
  
    if (window.confirm('¿Estás seguro de que deseas eliminar esta asignación?')) {
      onEliminarAsignacion(asignacion.id);
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

  const handleCancelar = () => {
    setShowForm(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.checkboxContainer}>
        <Button
          sx={{
            backgroundColor: '#5eb219', 
            color: '#fff', 
            borderRadius: '4px', 
            padding: '8px 16px', 
            marginRight: '10px', 
            '&:hover': {
              backgroundColor: '#4a9e17', 
            },
          }}
          onClick={abrirConsulta}
        >
          Ver en Calendario
        </Button>
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
        <PhoneDialer phoneNumber={instructorActual?.telefono || ""}/>
      </div>

      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Instructor: {instructorActual?.nombre || ""}</th>
              <th>Jornada</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sabado</th>
            </tr>
          </thead>
          <tbody>
            {jornadas.map((jornada) => (
              jornadaVisibility[jornada.nombre] && (
                <tr key={jornada.id}>
                  <td>{instructorActual ? instructorActual.nombre : 'Instructor no encontrado'}</td>
                  <td>{jornada.nombre}</td>
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'].map((dia) => {
                    const asignacion = asignacionesInstructor.find(
                      (a) => a.jornada === jornada.nombre && a.dia === dia
                    );

                    return (
                      <td 
                        key={dia} 
                        onClick={() => asignacion ? handleEliminar(asignacion) : handleAbrirFormulario(dia, jornada.nombre)}
                      >
                        {asignacion ? (
                          <div className={classes.asignacion}>
                            <p><strong>{asignacion.inicio}</strong></p>
                            <p>{asignacion.ficha}</p>
                            <p>{fichas.find(f => f.codigo === asignacion.ficha)?.programa}</p>
                            <p>{fichas.find(f => f.codigo === asignacion.ficha)?.municipio}</p>
                            <p><strong>{asignacion.fin}</strong></p>
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
      </div>

      {showForm && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h3>Asignar Ficha</h3>
            <label>
              Ficha:<br/>
              <Autocomplete
                options={fichasFiltradas}
                getOptionLabel={(option) => option.codigo}
                value={fichasFiltradas.find(ficha => ficha.codigo === selectedFicha) || null}
                onChange={(event, newValue) => {
                  setSelectedFicha(newValue ? newValue.codigo : '');
                }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Selecciona una ficha" 
                    variant="outlined" 
                    sx={{
                      marginBottom: '16px',
                    }}
                  />
                )}
              />
            </label><br/>
            <label>
              Fecha de Inicio: <br/>
              <input 
                type="date" 
                value={fechaAsignacionInicio} 
                onChange={(e) => setFechaAsignacionInicio(e.target.value)} 
              />
            </label><br/>
            <label>
              Fecha de Fin: <br/>
              <input 
                type="date" 
                value={fechaAsignacionFin} 
                onChange={(e) => setFechaAsignacionFin(e.target.value)} 
              />
            </label><br/>
            <Button 
              onClick={handleCrear}
              sx={{
                marginRight: '10px',
              }}
            >
              Asignar
            </Button>
            <Button onClick={handleCancelar} color="secondary">Cancelar</Button>
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
    marginLeft: '5px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px', 
  },
  tableContainer: {
    overflowX: 'auto', 
    '&::-webkit-scrollbar': {
      width: '10px', 
    },
    '&::-webkit-scrollbar-track': {
      background: '#83e335', 
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#5eb219', 
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#195eb2', 
    },
  },
  table: {
    width: '90%', 
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
    cursor: (props) =>
      props.permisos.editProgramacion === 'Ninguno'
        ? 'default' 
        : 'url("https://downloads.totallyfreecursors.com/thumbnails/trashcan.gif"), auto', 
  },
  noAsignado: {
    color: '#999',
    cursor: (props) =>
      props.permisos.editProgramacion === 'Ninguno'
        ? 'default' 
        : 'pointer', 
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
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
});

export default ProgramaInstructor;
