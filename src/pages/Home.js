import React from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleGestionUsuarios = () => {
    navigate('/gestion-usuarios');
  };

  const handleConsultas = () => {
    navigate('/consultas');
  };

  const handleCerrarSesion = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={handleGestionUsuarios}>
        Gestionar Usuarios
      </button>
      <button className={classes.button} onClick={handleConsultas}>
        Consultar/Editar Fichas
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


