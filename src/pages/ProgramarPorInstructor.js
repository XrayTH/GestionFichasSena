import { useState, useEffect } from 'react';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import ProgramaInstructor from './../components/ProgramaInstructor';
import { getFichas } from '../service/fichaService';
import { getJornadas } from '../service/jornadaService';
import { getInstructores } from '../service/intructorService';
import { getAllAsignaciones, createAsignacion, deleteAsignacionById } from '../service/asignacionService';
import Jornadas from '../components/Jornadas';
import Sidebar from '../components/Sidebar';
import { getStartOfMonth, getEndOfMonth } from '../utils/date';
import { makeStyles } from '@mui/styles';

const ProgramarPorInstructor = () => {
  const classes = useStyles();

  const [fichas, setFichas] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [fetchedFichas, fetchedJornadas, fetchedInstructores, fetchedAsignaciones] = await Promise.all([
                getFichas(),
                getJornadas(),
                getInstructores(),
                getAllAsignaciones()
            ]);

            setFichas(fetchedFichas);
            setJornadas(fetchedJornadas);
            setInstructores(fetchedInstructores);
            setAsignaciones(fetchedAsignaciones);
        } catch (error) {
            setMensaje({ text: error.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

  useEffect(() => {
    setFechaInicio(getStartOfMonth());
    setFechaFin(getEndOfMonth());
  }, []);

  const handleCrearAsignacion = async (nuevaAsignacion) => {
    try {
      const response = await createAsignacion(nuevaAsignacion);
      setAsignaciones([...asignaciones, response]);
      setMensaje({ text: 'Asignación creada con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al crear asignación:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const handleEliminarAsignacion = async (idAsignacion) => {
    try {
      await deleteAsignacionById(idAsignacion);
      setAsignaciones(asignaciones.filter(a => a.id !== idAsignacion));
      setMensaje({ text: 'Asignación eliminada con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al eliminar asignación:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const filteredInstructores = instructores.filter((instructor) =>
    instructor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar />
      {mensaje && (
        <Snackbar
          open={Boolean(mensaje)}
          autoHideDuration={6000}
          onClose={() => setMensaje(null)}
          sx={{ '& .MuiAlert-root': { width: '100%' } }}
        >
          <Alert onClose={() => setMensaje(null)} severity={mensaje.severity} sx={{ width: '100%' }}>
            {mensaje.text}
          </Alert>
        </Snackbar>
      )}

      <input
        type="text"
        placeholder="Buscar por nombre del instructor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.inputSearch}
      />
      
      <Jornadas className={classes.jornadas} />

      <div className={classes.dateInputsContainer}>
        <p className={classes.dateLabel}>Inicio: </p>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className={classes.dateInput}
        />
        <p className={classes.dateLabel}>Fin: </p>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className={classes.dateInput}
        />
      </div>

      {loading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress sx={{ color: "#5eb219" }} />
        </div>
      ) : (
        filteredInstructores.map((instructor) => (
          <ProgramaInstructor
            key={instructor.documento}
            documentoInstructor={instructor.documento}
            fichas={fichas}
            asignaciones={asignaciones}
            instructores={instructores}
            jornadas={jornadas}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            onCrearAsignacion={handleCrearAsignacion}
            onEliminarAsignacion={handleEliminarAsignacion}
          />
        ))
      )}
    </div>
  );
};

const useStyles = makeStyles({
  inputSearch: {
    marginTop: '20px',
    padding: '10px',
    width: '98%',
    marginBottom: '20px', 
  },
  jornadas: {
    marginTop: '20px', 
  },
  dateInputsContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  dateInput: {
    padding: '10px',
    marginRight: '10px',
  },
  dateLabel: {
    margin: '0 10px',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default ProgramarPorInstructor;
