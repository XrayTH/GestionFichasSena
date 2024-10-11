import React, { useState, useEffect } from 'react';
import { getJornadas, createJornada, updateJornadaById, deleteJornadaById } from '../service/jornadaService';
import { makeStyles } from '@mui/styles';

const Jornadas = () => {
  const classes = useStyles();
  const [jornadas, setJornadas] = useState([]);
  const [selectedJornadaId, setSelectedJornadaId] = useState('');
  const [jornadaName, setJornadaName] = useState('');

  useEffect(() => {
    const fetchJornadas = async () => {
      try {
        const data = await getJornadas();
        setJornadas(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchJornadas();
  }, []);

  const handleCreate = async () => {
    try {
      const newJornada = await createJornada({ nombre: jornadaName });
      setJornadas([...jornadas, newJornada]);
      setJornadaName('');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdate = async () => {
    if (!selectedJornadaId) return;
    try {
      const updatedJornada = await updateJornadaById(selectedJornadaId, { nombre: jornadaName });
      setJornadas(jornadas.map(j => (j.id === updatedJornada.id ? updatedJornada : j)));
      setJornadaName('');
      setSelectedJornadaId('');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedJornadaId) return;
    try {
      await deleteJornadaById(selectedJornadaId);
      setJornadas(jornadas.filter(j => j.id !== selectedJornadaId));
      setJornadaName('');
      setSelectedJornadaId('');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSelectJornada = (e) => {
    const selectedId = e.target.value;
    const selectedJornada = jornadas.find(j => j.id === selectedId);
    setSelectedJornadaId(selectedId);
    setJornadaName(selectedJornada ? selectedJornada.nombre : '');
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        className={classes.input}
        placeholder="Nombre de la jornada"
        value={jornadaName}
        onChange={(e) => setJornadaName(e.target.value)}
      />
      <select
        className={classes.dropdown}
        value={selectedJornadaId}
        onChange={handleSelectJornada}
      >
        <option value="">Seleccionar jornada</option>
        {jornadas.map((jornada) => (
          <option key={jornada.id} value={jornada.id}>
            {jornada.nombre}
          </option>
        ))}
      </select>
      <button className={classes.button} onClick={handleCreate}>Crear</button>
      <button className={classes.button} onClick={handleUpdate}>Actualizar</button>
      <button className={classes.button} onClick={handleDelete}>Borrar</button>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap', // Permite que los elementos se envuelvan en varias líneas
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '1rem', // Espacio entre los elementos
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
      flexDirection: 'column', // Cambia a columnas cuando la pantalla es más pequeña
      alignItems: 'stretch',
    },
    button: {
      width: '100%', // Los botones ocupan todo el ancho disponible
    },
  },
}));

export default Jornadas;
