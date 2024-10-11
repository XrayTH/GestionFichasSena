import React from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux'; // Importa useDispatch
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import { logout } from '../features/userSlice'; // Importa la acción logout
import { Typography } from '@mui/material';

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch(); // Inicializa el dispatch
  const navigate = useNavigate(); // Inicializa el hook useNavigate

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

  const handleCerrarSesion = () => {
    dispatch(logout()); // Realiza el logout
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.title}>
        SISTEMA DE GESTIÓN DE FICHAS - SENA
      </Typography>
      <br/>
      <button className={classes.button} onClick={handleGestionUsuarios}>
        Gestionar Usuarios
      </button>
      <button className={classes.button} onClick={handleProgramas}>
        Ver Programas
      </button>
      <button className={classes.button} onClick={handleInstructores}>
        Ver Instructores
      </button>
      <button className={classes.button} onClick={handleCoordinadores}>
        Ver Coordinadores
      </button>
      <button className={classes.button} onClick={handleFichas}>
        Ver Fichas
      </button>
      <button className={classes.button} onClick={handleProFicha}>
        Programacion Por Ficha
      </button>
      <button className={classes.button} onClick={handleProIns}>
        Programacion Por Instructor
      </button>
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
