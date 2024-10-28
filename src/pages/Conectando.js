import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-sena-blanco.svg';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

function Conectando() {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={classes.container}>
      <img src={logo} alt="Logo Sena" className={classes.logo} />
      <h1 className={classes.message}>Conectando...</h1>
      <CircularProgress className={classes.spinner} />
      <p>Esperando respuesta del servidor</p>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: '#5eb219', 
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
  spinner: {
    marginTop: '20px',
    color: "white"
  }
});

export default Conectando;
