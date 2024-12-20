import React, { useState } from "react";
import { makeStyles } from "@mui/styles"; 
import { useNavigate } from "react-router-dom"; 
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../assets/logo-sena-verde-complementario-svg-2022.svg";
import { useDispatch } from 'react-redux'; 
import { setUser } from '../features/userSlice'; 
import { verificarUsuario } from '../service/userService';
import { encryptPassword } from '../utils/encryption'; 

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [usuario, setUsuario] = useState(''); 
  const [contraseña, setContraseña] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = async () => {
    setError(''); 
    setIsLoading(true);
    try {
      const encryptedPassword = encryptPassword(contraseña);
      const userData = await verificarUsuario({ usuario, contraseña: encryptedPassword });
      dispatch(setUser({
        id: userData.usuario.id, 
        usuario: userData.usuario.usuario, 
        rol: userData.usuario.rol, 
        tablas: userData.usuario.tablas, 
        verProgramacion: userData.usuario.verProgramacion, 
        editProgramacion: userData.usuario.editProgramacion, 
        email: userData.usuario.email, 
        gestionarUsuarios: userData.usuario.gestionarUsuarios,
        token: userData.token 
      }));
      navigate("/home");
    } catch (err) {
      setError(err.message); 
      console.error("Error de login:", err.message);
    } finally {
      setIsLoading(false);
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
          value={usuario} 
          onChange={(e) => setUsuario(e.target.value)} 
        />
        <div className={classes.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className={classes.inputPassword}
            value={contraseña} 
            onChange={(e) => setContraseña(e.target.value)} 
          />
          <button
            type="button"
            className={classes.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "ocultar" : "ver"}
          </button>
        </div>
        {error && <p className={classes.error}>{error}</p>} 
        <button 
          type="button"
          className={classes.button}
          onClick={handleLoginClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Iniciar Sesión"
          )}
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
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputPassword: {
    width: "100%",
    padding: "12px 40px 12px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    fontSize: "16px",
    '&:focus': {
      borderColor: "#5eb219",
    },
  },
  toggleButton: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#5eb219",
    padding: "0",
  },
  button: {
    backgroundColor: "#5eb219",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '&:hover': {
      backgroundColor: "#4cae14",
    },
    '&:disabled': {
      backgroundColor: "#8bc34a",
    },
  },
  error: {
    color: 'red', 
    marginBottom: '16px',
  },
}));

export default Login;
