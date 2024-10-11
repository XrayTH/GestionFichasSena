import React, { useState, useMemo, useEffect } from 'react';
import Programa from './Programa';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { obtenerProgramas, crearPrograma, actualizarProgramaPorId, eliminarProgramaPorId } from '../service/programaService';
import NewPrograma from './NewPrograma';
import Sidebar from './Sidebar';

const GestionPrograma = () => {
  const classes = useStyles();
  const [programas, setProgramas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewProgramaForm, setShowNewProgramaForm] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const data = await obtenerProgramas();
        setProgramas(data);
      } catch (error) {
        setMensaje({ text: error.message, severity: 'error' });
      }
    };

    fetchProgramas();
  }, []);

  const handleNewProgramaClick = () => setShowNewProgramaForm(true);

  const handleSaveNewPrograma = async (newPrograma) => {
    try {
      const createdPrograma = await crearPrograma(newPrograma);
      setProgramas((prevProgramas) => [...prevProgramas, createdPrograma]);
      setShowNewProgramaForm(false);
      setMensaje({ text: 'Programa creado con éxito', severity: 'success' });
    } catch (error) {
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const handleDeletePrograma = async (id) => {
    try {
      await eliminarProgramaPorId(id);
      setProgramas((prevProgramas) => prevProgramas.filter((programa) => programa.id !== id));
      setMensaje({ text: 'Programa eliminado con éxito', severity: 'success' });
    } catch (error) {
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const handleUpdatePrograma = async (updatedPrograma) => {
    try {
      await actualizarProgramaPorId(updatedPrograma.id, updatedPrograma);
      setProgramas((prevProgramas) =>
        prevProgramas.map((programa) => (programa.id === updatedPrograma.id ? updatedPrograma : programa))
      );
      setMensaje({ text: 'Programa actualizado con éxito', severity: 'success' });
    } catch (error) {
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const filteredProgramas = useMemo(() => {
    return programas.filter((programa) =>
      programa.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      programa.nombreCorto?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [programas, searchTerm]);

  return (
    <>
    <Sidebar/>
    <div className={classes.container}>
      {mensaje && (
        <Snackbar open={Boolean(mensaje)} autoHideDuration={6000} onClose={() => setMensaje(null)}>
          <Alert onClose={() => setMensaje(null)} severity={mensaje.severity}>
            {mensaje.text}
          </Alert>
        </Snackbar>
      )}

      <TextField
        variant="outlined"
        placeholder="Buscar por Nombre o Nombre Corto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.searchField}
      />

      <Button variant="contained" onClick={handleNewProgramaClick} className={classes.newProgramaButton}>
        Nuevo Programa
      </Button>

      {showNewProgramaForm && (
        <NewPrograma
          onSave={handleSaveNewPrograma}
          onCancel={() => setShowNewProgramaForm(false)}
        />
      )}

      <div className={classes.programaList}>
        {filteredProgramas.length > 0 ? (
          filteredProgramas.map((programa) => (
            <Programa
              key={programa.id}
              programa={programa}
              onUpdate={handleUpdatePrograma}
              onDelete={handleDeletePrograma}
            />
          ))
        ) : (
          <p>No se encontraron programas</p>
        )}
      </div>
    </div>
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    width: '100%',
    margin: '0 auto',
  },
  searchField: {
    width: '85%',
    marginBottom: '20px',
  },
  newProgramaButton: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    marginBottom: '20px',
  },
  programaList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    // Media query para cambiar a columnas apiladas en pantallas pequeñas
    '@media (max-width: 600px)': {
      gridTemplateColumns: 'repeat(1, 1fr)', // Solo una columna
    },
  },
}));

export default GestionPrograma;
