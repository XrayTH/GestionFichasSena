/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import Instructor from '../components/Instructor';
import NewInstructor from '../components/NewInstructor';
import { TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { getInstructores, createInstructor, updateInstructorByDocumento, deleteInstructorByDocumento } from '../service/intructorService';
import Sidebar from '../components/Sidebar';

const GestionInstructores = () => {
  const [instructores, setInstructores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewInstructorForm, setShowNewInstructorForm] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructores = async () => {
      setLoading(true);
      try {
        const data = await getInstructores(); 
        setInstructores(data); 
      } catch (error) {
        console.error('Error al obtener los instructores:', error);
        setMensaje({ text: error.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchInstructores();
  }, []);

  const handleNewInstructorClick = () => setShowNewInstructorForm(true);

  const handleSaveNewInstructor = async (newInstructor) => {
    try {
      const createdInstructor = await createInstructor(newInstructor);
      setInstructores((prevInstructores) => [newInstructor, ...prevInstructores]);
      setShowNewInstructorForm(false);
      setMensaje({ text: 'Instructor creado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al crear el instructor en la base de datos:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const handleCancelNewInstructor = () => setShowNewInstructorForm(false);

  const handleUpdateInstructor = async (updatedInstructor) => {
    try {
      await updateInstructorByDocumento(updatedInstructor.documento, updatedInstructor);
      setInstructores((prevInstructores) =>
        prevInstructores.map((instructor) =>
          instructor.documento === updatedInstructor.documento ? updatedInstructor : instructor
        )
      );
      setMensaje({ text: 'Instructor actualizado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al actualizar el instructor en la base de datos:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const handleDeleteInstructor = async (documento) => {
    try {
      await deleteInstructorByDocumento(documento); 
      setInstructores((prevInstructores) =>
        prevInstructores.filter((instructor) => instructor.documento !== documento)
      ); 
      setMensaje({ text: 'Instructor eliminado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al eliminar el instructor:', error);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const filteredInstructores = useMemo(() => {
    return instructores.filter((instructor) => {
      const areaTematica = instructor.areaTematica?.toLowerCase() || "";
      const email = instructor.email?.toLowerCase() || "";
      const nombre = instructor.nombre?.toLowerCase() || "";
      const documento = instructor.documento?.toString().toLowerCase() || "";
  
      return (
        areaTematica.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        nombre.includes(searchTerm.toLowerCase()) ||
        documento.includes(searchTerm.toLowerCase())
      );
    });
  }, [instructores, searchTerm]);

  return (
    <>
      <Sidebar />
      <div style={{ 
        display: 'flex',                    
        flexDirection: 'column',           
        alignItems: 'center',           
        justifyContent: 'center',     
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        width: '100%',
      }}>
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
          sx={{
            width: '85%',
            marginBottom: '20px',
          }}
        />

        <Button 
          variant="contained" 
          onClick={handleNewInstructorClick} 
          sx={{
            backgroundColor: '#5eb219',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#4cae14',
            },
            marginBottom: '20px',
          }}
        >
          Nuevo Instructor
        </Button>

        {showNewInstructorForm && (
          <div style={{
            display: 'flex',                      
            flexDirection: 'column',              
            alignItems: 'center',                 
            width: '90%',                        
            maxWidth: '600px',     
            gridTemplateColumns: '1fr',
            gridGap: '10px',
            margin: 'auto'
          }}>
            <NewInstructor 
              onSave={handleSaveNewInstructor}
              onCancel={handleCancelNewInstructor}
            />
          </div>
        )}

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
            <CircularProgress sx={{
              color: "#5eb219",
            }} />
          </div>
        ) : (
          <div style={{
            display: 'flex',                      
            flexDirection: 'column',              
            alignItems: 'center',                 
            width: '90%',                        
            maxWidth: '600px',     
            gridTemplateColumns: '1fr',
            gridGap: '10px',
            margin: 'auto auto',
            marginTop: '10px',
          }}>
            {filteredInstructores.length > 0 ? (
              filteredInstructores.map((instructor) => (
                <div key={instructor.documento} style={{
                  marginBottom: '15px'}}> 
                  <Instructor
                    key={instructor.documento}
                    instructor={instructor}
                    onUpdate={handleUpdateInstructor}
                    onDelete={handleDeleteInstructor}
                  />
                </div>
              ))
            ) : (
              <p>No se encontraron instructores</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default GestionInstructores;
