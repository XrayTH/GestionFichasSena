import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { selectUserPermisos } from '../features/userSlice';
import { crearAmbiente, obtenerAmbientes, actualizarAmbientePorId, eliminarAmbientePorId } from '../service/ambienteService';
import { makeStyles } from '@mui/styles';

const Ambientes = () => {
  const classes = useStyles();
  const permisos = useSelector(selectUserPermisos);
  
  const [ambientes, setAmbientes] = useState([]);
  const [selectedAmbienteId, setSelectedAmbienteId] = useState('');
  const [ambienteName, setAmbienteName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const data = await obtenerAmbientes();
        setAmbientes(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAmbientes();
  }, []);

  if (!permisos.tablas) {
    return null;
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCreate = async () => {
    if (!ambienteName) return;
    try {
      const nuevoAmbiente = ambienteName;
      const createdAmbiente = await crearAmbiente(nuevoAmbiente);
      setAmbientes([...ambientes, createdAmbiente]);
      setAmbienteName('');
      showSnackbar('Ambiente creado exitosamente', 'success');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      showSnackbar('Error al crear el ambiente', 'error');
    }
  };

  const handleUpdate = async () => {
    if (!selectedAmbienteId) return;
    try {
      const updatedAmbiente = await actualizarAmbientePorId(selectedAmbienteId, ambienteName);
      setAmbientes(ambientes.map(a => (a.id === updatedAmbiente.id ? updatedAmbiente : a)));
      setAmbienteName('');
      setSelectedAmbienteId('');
      showSnackbar('Ambiente actualizado exitosamente', 'success');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      showSnackbar('Error al actualizar el ambiente', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedAmbienteId) return;
    try {
      await eliminarAmbientePorId(selectedAmbienteId);
      setAmbientes(ambientes.filter(a => a.id !== selectedAmbienteId));
      setAmbienteName('');
      setSelectedAmbienteId('');
      showSnackbar('Ambiente eliminado exitosamente', 'success');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      showSnackbar('Error al eliminar el ambiente', 'error');
    }
  };

  const handleSelectAmbiente = (e) => {
    const selectedId = e.target.value;
    const selectedAmbiente = ambientes.find(a => a.id === selectedId);
    setSelectedAmbienteId(selectedId);
    setAmbienteName(selectedAmbiente ? selectedAmbiente.nombre : '');
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        className={classes.input}
        placeholder="Nombre del ambiente"
        value={ambienteName}
        onChange={(e) => setAmbienteName(e.target.value)}
      />
      <select
        className={classes.dropdown}
        value={selectedAmbienteId}
        onChange={handleSelectAmbiente}
      >
        <option value="">Seleccionar ambiente</option>
        {ambientes.map((ambiente) => (
          <option key={ambiente.id} value={ambiente.id}>
            {ambiente.nombre}
          </option>
        ))}
      </select>
      <button className={classes.button} onClick={handleCreate}>Crear</button>
      <button className={classes.button} onClick={handleUpdate}>Actualizar</button>
      <button className={classes.button} onClick={handleDelete}>Borrar</button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: 1,
    minWidth: '200px',
  },
  dropdown: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minWidth: '200px',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#4cae15',
    },
  },
  '@media (max-width: 600px)': {
    container: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    button: {
      width: '100%',
    },
  },
}));

export default Ambientes;
