import React, { useState } from "react";
import { makeStyles } from "@mui/styles"; 
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo-sena-verde-complementario-svg-2022.svg";
import { useDispatch } from 'react-redux'; // Importa useDispatch
import { setUser } from '../features/userSlice';
import { verificarUsuario } from '../service/userService';

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Inicializa el dispatch
  const [usuario, setUsuario] = useState(''); // Estado para el usuario
  const [contraseña, setContraseña] = useState(''); // Estado para la contraseña
  const [error, setError] = useState(''); // Estado para manejar errores

  const handleLoginClick = async () => {
    setError(''); // Reinicia el error al hacer clic
    try {
      // Verificar el usuario con la función de servicio
      const userData = await verificarUsuario({ usuario, contraseña });
      dispatch(setUser(userData.usuario)); // Almacena la información del usuario
      navigate("/home"); // Navega a la página de inicio
    } catch (err) {
      setError(err.message); // Maneja el error
      console.error("Error de login:", err.message);
    }
  };

  return (
    <div className={classes.container}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <form className={classes.form}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          className={classes.input}
          value={usuario} // Vincula el estado
          onChange={(e) => setUsuario(e.target.value)} // Maneja el cambio
        />
        <input
          type="password"
          placeholder="Contraseña"
          className={classes.input}
          value={contraseña} // Vincula el estado
          onChange={(e) => setContraseña(e.target.value)} // Maneja el cambio
        />
        {error && <p className={classes.error}>{error}</p>} {/* Muestra el error */}
        <button 
          type="button"
          className={classes.button}
          onClick={handleLoginClick}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "0 20px",
  },
  logo: {
    width: "200px",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    marginBottom: "16px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    fontSize: "16px",
    '&:focus': {
      borderColor: "#5eb219",
    },
  },
  button: {
    backgroundColor: "#5eb219",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    '&:hover': {
      backgroundColor: "#4cae14",
    },
  },
  error: {
    color: 'red', // Estilo para el mensaje de error
    marginBottom: '16px',
  },
}));

export default Login;
