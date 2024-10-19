import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-sena-blanco.svg';
import { makeStyles } from '@mui/styles';

function AccessDenied() {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={classes.container}>
      <img src={logo} alt="Logo Sena" className={classes.logo} />
      <h1 className={classes.message}>403 - Acceso Denegado</h1>
      <p>Redirigiendo a la página principal...</p>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    width: '150px', 
    marginBottom: '20px',
  },
  message: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
});

export default AccessDenied;
