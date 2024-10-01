import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-sena-naranja-png-2022.png';
import { makeStyles } from '@mui/styles';

function NotFound() {
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
      <h1 className={classes.message}>404 - Página no encontrada</h1>
      <p>Redirigiendo a la página principal...</p>
    </div>
  );
}
const useStyles = makeStyles({
    container: {
      backgroundColor: '#5eb219', // Color de fondo
      color: '#fff', // Color de texto
      height: '100vh', // Altura de la pantalla completa
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    logo: {
      width: '150px', // Ajusta el tamaño del logo según sea necesario
      marginBottom: '20px',
    },
    message: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
  });
  
export default NotFound;
