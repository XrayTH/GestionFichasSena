import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import ProgramaInstructor from './../components/ProgramaInstructor';
import { getFichas } from '../service/fichaService';
import { getJornadas } from '../service/jornadaService';
import { getInstructores } from '../service/intructorService';
import { getAllAsignaciones, createAsignacion, deleteAsignacionById } from '../service/asignacionService';
import Jornadas from '../components/Jornadas';
import Sidebar from '../components/Sidebar';
import { getStartOfMonth, getEndOfMonth } from '../utils/date'

const ProgramarPorInstructor = () => {
  const [fichas, setFichas] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFichas = await getFichas();
        setFichas(fetchedFichas);

        const fetchedJornadas = await getJornadas();
        setJornadas(fetchedJornadas);

        const fetchedInstructores = await getInstructores();
        setInstructores(fetchedInstructores);

        const fetchedAsignaciones = await getAllAsignaciones();
        setAsignaciones(fetchedAsignaciones);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setMensaje({ text: error.message, severity: 'error' });
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
        <Snackbar open={Boolean(mensaje)} autoHideDuration={6000} onClose={() => setMensaje(null)}>
          <Alert onClose={() => setMensaje(null)} severity={mensaje.severity}>
            {mensaje.text}
          </Alert>
        </Snackbar>
      )}

      <input
        type="text"
        placeholder="Buscar por nombre del instructor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
            
      <Jornadas />

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <p>Inicio: </p>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          style={{ marginRight: '10px', padding: '10px' }}
        />
        <p>Fin: </p>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          style={{ padding: '10px' }}
        />
      </div>

      {filteredInstructores.map((instructor) => (
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
      ))}
    </div>
  );
};

export default ProgramarPorInstructor;
