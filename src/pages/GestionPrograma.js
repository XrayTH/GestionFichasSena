import React, { useState, useMemo, useEffect } from 'react';
import Programa from '../components/Programa';
import { TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { obtenerProgramas, crearPrograma, actualizarProgramaPorId, eliminarProgramaPorId } from '../service/programaService';
import NewPrograma from '../components/NewPrograma';
import Sidebar from '../components/Sidebar';

const GestionPrograma = () => {
  const classes = useStyles();
  const [programas, setProgramas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewProgramaForm, setShowNewProgramaForm] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramas = async () => {
      setLoading(true);
      try {
        const data = await obtenerProgramas();
        setProgramas(data);
      } catch (error) {
        setMensaje({ text: error.message, severity: 'error' });
      } finally {
        setLoading(false);
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
    return programas.filter((programa) => {
      const nombre = programa.nombre?.toLowerCase() || "";
      const nombreCorto = programa.nombreCorto?.toLowerCase() || "";
  
      return (
        nombre.includes(searchTerm.toLowerCase()) ||
        nombreCorto.includes(searchTerm.toLowerCase())
      );
    });
  }, [programas, searchTerm]);

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

        {loading ? (
          <div className={classes.loaderContainer}>
            <CircularProgress className={classes.loader} />
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',                    
    flexDirection: 'column',           
    alignItems: 'center',           
    justifyContent: 'center',     
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    width: '100%',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
    gap: '10px',
    width: '100%'
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loader: {
    color: "#5eb219",
  },
}));

export default GestionPrograma;
