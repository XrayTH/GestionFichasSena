import React, { useState, useMemo, useEffect } from 'react';
import Coordinador from '../components/Coordinador';
import NewCoordinador from '../components/NewCoordinador';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getCoordinadores, createCoordinador, updateCoordinadorByDocumento, deleteCoordinadorByDocumento } from '../service/coordinadorService';
import Sidebar from '../components/Sidebar';

const GestionCoordinadores = () => {
  const classes = useStyles();

  const [coordinadores, setCoordinadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCoordinadorForm, setShowNewCoordinadorForm] = useState(false);
  const [mensaje, setMensaje] = useState(null); 

  useEffect(() => {
    const fetchCoordinadores = async () => {
      try {
        const data = await getCoordinadores(); 
        setCoordinadores(data); 
      } catch (error) {
        console.error('Error al obtener los coordinadores:', error);
        setMensaje({ text: error.message, severity: 'error' });
      }
    };

    fetchCoordinadores();
  }, []);

  const handleNewCoordinadorClick = () => setShowNewCoordinadorForm(true);

  const handleSaveNewCoordinador = async (newCoordinador) => {
    try {
      const createdCoordinador = await createCoordinador(newCoordinador);
  
      setCoordinadores((prevCoordinadores) => [...prevCoordinadores, createdCoordinador]);
      setShowNewCoordinadorForm(false);
      setMensaje({ text: 'Coordinador creado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al crear el coordinador en la base de datos:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const handleDeleteCoordinador = async (documento) => {
    try {
      await deleteCoordinadorByDocumento(documento); 
      setCoordinadores((prevCoordinadores) =>
        prevCoordinadores.filter((coordinador) => coordinador.documento !== documento)
      );
  
      setMensaje({ text: 'Coordinador borrado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al borrar el coordinador en la base de datos:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const handleCancelNewCoordinador = () => setShowNewCoordinadorForm(false);

  const handleUpdateCoordinador = async (updatedCoordinador) => {
    try {
      // Actualizamos en la base de datos con el método correcto
      await updateCoordinadorByDocumento(updatedCoordinador.documento, updatedCoordinador);

      // Si la actualización en la base de datos es exitosa, actualizamos en el estado local
      setCoordinadores((prevCoordinadores) =>
        prevCoordinadores.map((coordinador) =>
          coordinador.documento === updatedCoordinador.documento ? updatedCoordinador : coordinador
        )
      );
      setMensaje({ text: 'Coordinador actualizado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al actualizar el coordinador en la base de datos:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const filteredCoordinadores = useMemo(() => {
    return coordinadores.filter((coordinador) =>
      coordinador.areaTematica?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinador.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinador.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinador.documento?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coordinadores, searchTerm]);

  return (
    <>
      <Sidebar />
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
          placeholder="Buscar por Documento o Nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchField}
        />

        <Button variant="contained" onClick={handleNewCoordinadorClick} className={classes.newCoordinadorButton}>
          Nuevo Coordinador
        </Button>

        {showNewCoordinadorForm && (
          <NewCoordinador 
            onSave={handleSaveNewCoordinador}
            onCancel={handleCancelNewCoordinador}
          />
        )}

        <div className={classes.coordinadorList}>
          {filteredCoordinadores.length > 0 ? (
            filteredCoordinadores.map((coordinador) => (
              <Coordinador
                key={coordinador.documento}
                coordinador={coordinador}
                onUpdate={handleUpdateCoordinador}
                onDelete={handleDeleteCoordinador}
              />
            ))
          ) : (
            <p>No se encontraron coordinadores</p>
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
  newCoordinadorButton: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    marginBottom: '20px',
  },
  coordinadorList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    margin: '10px'
  },
}));

export default GestionCoordinadores;
