/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import Coordinador from '../components/Coordinador';
import NewCoordinador from '../components/NewCoordinador';
import { TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { getCoordinadores, createCoordinador, updateCoordinadorByDocumento, deleteCoordinadorByDocumento } from '../service/coordinadorService';
import Sidebar from '../components/Sidebar';

const GestionCoordinadores = () => {
  const [coordinadores, setCoordinadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCoordinadorForm, setShowNewCoordinadorForm] = useState(false);
  const [mensaje, setMensaje] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinadores = async () => {
      setLoading(true);
      try {
        const data = await getCoordinadores(); 
        setCoordinadores(data); 
      } catch (error) {
        console.error('Error al obtener los coordinadores:', error);
        setMensaje({ text: error.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinadores();
  }, []);

  const handleNewCoordinadorClick = () => setShowNewCoordinadorForm(true);

  const handleSaveNewCoordinador = async (newCoordinador) => {
    try {
      const createdCoordinador = await createCoordinador(newCoordinador);
      setCoordinadores((prevCoordinadores) => [newCoordinador, ...prevCoordinadores]);
      setShowNewCoordinadorForm(false);
      setMensaje({ text: 'Coordinador creado con éxito', severity: 'success' });
      setCoordinadores((prevCoordinadores) => [...prevCoordinadores]);
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
      await updateCoordinadorByDocumento(updatedCoordinador.documento, updatedCoordinador);
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
    return coordinadores.filter((coordinador) => {
      const areaTematica = coordinador.areaTematica?.toLowerCase() || "";
      const email = coordinador.email?.toLowerCase() || "";
      const nombre = coordinador.nombre?.toLowerCase() || "";
      const documento = coordinador.documento?.toString().toLowerCase() || "";
  
      return (
        areaTematica.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        nombre.includes(searchTerm.toLowerCase()) ||
        documento.includes(searchTerm.toLowerCase())
      );
    });
  }, [coordinadores, searchTerm]);
  
  return (
    <>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
          sx={{ width: '85%', marginBottom: '20px' }}
        />

        <Button 
          variant="contained" 
          onClick={handleNewCoordinadorClick} 
          sx={{ backgroundColor: '#5eb219', color: '#fff', '&:hover': { backgroundColor: '#4cae14' }, marginBottom: '20px' }}
        >
          Nuevo Coordinador
        </Button>

        {showNewCoordinadorForm && (
          <NewCoordinador 
            onSave={handleSaveNewCoordinador}
            onCancel={handleCancelNewCoordinador}
          />
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress sx={{ color: "#5eb219" }} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', width: '90%', maxWidth: '600px', boxSizing: 'border-box', marginTop: '20px' }}>
            {filteredCoordinadores.length > 0 ? (
              filteredCoordinadores.map((coordinador) => (
                <div key={coordinador.documento} style={{
                  marginBottom: '15px'}}> 
                  <Coordinador
                    key={coordinador.documento}
                    coordinador={coordinador}
                    onUpdate={handleUpdateCoordinador}
                    onDelete={handleDeleteCoordinador}
                  />
                </div>
              ))
            ) : (
              <p>No se encontraron coordinadores</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default GestionCoordinadores;
