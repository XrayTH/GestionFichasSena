import React from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { logout, selectUserPermisos } from '../features/userSlice'; 
import { Typography } from '@mui/material';

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const permisos = useSelector(selectUserPermisos);

  const handleGestionUsuarios = () => {
    navigate('/gestion-usuarios');
  };

  const handleProgramas = () => {
    navigate('/gestion-programas');
  };

  const handleInstructores = () => {
    navigate('/gestion-instructores');
  };

  const handleCoordinadores = () => {
    navigate('/gestion-coordinadores');
  };

  const handleFichas = () => {
    navigate('/gestion-fichas');
  };

  const handleProFicha = () => {
    navigate('/programar');
  };

  const handleProIns = () => {
    navigate('/programar-instructor');
  };

  const handleEmail = () => {
    navigate('/enviar-email');
  };

  const handleCerrarSesion = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.title}>
        SISTEMA DE GESTIÓN DE FICHAS - SENA
      </Typography>
      <br />
      
      {permisos.gestionarUsuarios && (
        <button className={classes.button} onClick={handleGestionUsuarios}>
          Gestionar Usuarios
        </button>
      )}

      {(permisos.verProgramacion || permisos.editProgramacion) && (
        <>
          <button className={classes.button} onClick={handleProFicha}>
            Programacion Por Ficha
          </button>
          <button className={classes.button} onClick={handleProIns}>
            Programacion Por Instructor
          </button>
        </>
      )}
      
      {permisos.tablas && (
        <>
          <button className={classes.button} onClick={handleProgramas}>
            Gestión Programas
          </button>
          <button className={classes.button} onClick={handleInstructores}>
            Gestión Instructores
          </button>
          <button className={classes.button} onClick={handleCoordinadores}>
            Gestión Coordinadores
          </button>
          <button className={classes.button} onClick={handleFichas}>
            Gestión Fichas
          </button>
        </>
      )}

      {permisos.email && (
        <button className={classes.button} onClick={handleEmail}>
          Enviar Correo
        </button>
      )}

      <button className={classes.smallButton} onClick={handleCerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '0 20px',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    padding: '20px 40px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '16px',
    width: '100%',
    maxWidth: '300px',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  smallButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#fff',
    color: '#5eb219',
    padding: '10px 20px',
    border: '1px solid #5eb219',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#5eb219',
      color: '#fff',
    },
  },
}));

export default Home;
