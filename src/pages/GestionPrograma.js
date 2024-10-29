import React, { useState, useMemo, useEffect } from 'react';
import Programa from '../components/Programa';
import { TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { obtenerProgramas, crearPrograma, actualizarProgramaPorId, eliminarProgramaPorId } from '../service/programaService';
import NewPrograma from '../components/NewPrograma';
import Sidebar from '../components/Sidebar';

const GestionPrograma = () => {
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
      <div
        sx={{
          display: 'flex',                    
          flexDirection: 'column',           
          alignItems: 'center',           
          justifyContent: 'center',     
          backgroundColor: '#f5f5f5',
          width: '100%',
        }}
      >
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
          sx={{
            width: '85%', 
            margin: '10px auto',
          }}
        />

        <Button
          variant="contained"
          onClick={handleNewProgramaClick}
          sx={{
            backgroundColor: '#5eb219',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#4cae14',
            },
            margin: '20px 10px',
          }}
        >
          Nuevo Programa
        </Button>

        {showNewProgramaForm && (
          <NewPrograma
            onSave={handleSaveNewPrograma}
            onCancel={() => setShowNewProgramaForm(false)}
          />
        )}

        <div 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 20px',
            width: '100%',
          }}
        >
          {loading ? (
              <CircularProgress
                sx={{
                  color: "#5eb219",
                }}
              />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GestionPrograma;
