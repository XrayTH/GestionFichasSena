import React from 'react';
import logo from '../assets/logo-sena-verde-complementario-svg-2022.svg';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

function Cargando() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img src={logo} alt="Logo Sena" className={classes.logo} />
      <h1 className={classes.message}>Cargando...</h1>
      <CircularProgress sx={{ mt: '20px', color: "#5eb219" }} />
      <p>Por favor espera un momento</p>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
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
  }
});

export default Cargando;
