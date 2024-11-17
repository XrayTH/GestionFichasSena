import React from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { logout, selectUserPermisos } from '../features/userSlice'; 
import { Typography, useMediaQuery } from '@mui/material';

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const permisos = useSelector(selectUserPermisos);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleGestionUsuarios = () => navigate('/gestion-usuarios');
  const handleProgramas = () => navigate('/gestion-programas');
  const handleInstructores = () => navigate('/gestion-instructores');
  const handleInformes = () => navigate('/informe');
  const handleCoordinadores = () => navigate('/gestion-coordinadores');
  const handleFichas = () => navigate('/gestion-fichas');
  const handleProFicha = () => navigate('/programar');
  const handleProIns = () => navigate('/programar-instructor');
  const handleEmail = () => navigate('/enviar-email');
  const handleCerrarSesion = () => dispatch(logout());

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", color:'#5eb219', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}
      >
        {isSmallScreen ? 'SFG - SENA' : 'SISTEMA DE GESTIÓN DE FICHAS - SENA'}
      </Typography>
      <br />

      {(!permisos.email && !permisos.tablas && !permisos.verProgramacion && !permisos.editProgramacion && !permisos.gestionarUsuarios && (
          <div sx={{ justifyContent: 'center' }}>
              <Typography
              variant="h6"
                sx={{ textAlign: "center"}}
              >
                No tienes ningun permiso.
            </Typography>
          </div>
        ))}

      <div className={classes.buttonContainer}>
        {permisos.gestionarUsuarios && (
          <button className={classes.button} onClick={handleGestionUsuarios}>
            Gestionar Usuarios
          </button>
        )}

        {(permisos.verProgramacion) && (
          <>
            <button className={classes.button} onClick={handleProFicha}>
              Programación Por Ficha
            </button>
            <button className={classes.button} onClick={handleProIns}>
              Programación Por Instructor
            </button>
            <button className={classes.button} onClick={handleInformes}>
              Crear Informes
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
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
    gap: '16px', 
    width: '100%', 
    maxWidth: '800px', 
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    padding: '20px 40px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%', 
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
    '@media (max-width: 600px)': { 
      position: 'static', 
      bottom: 'auto',     
      right: 'auto'      
    }
  },
}));

export default Home;
