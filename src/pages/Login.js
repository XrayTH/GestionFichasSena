import React from "react";
import { makeStyles } from "@mui/styles"; 
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import logo from "../assets/logo-sena-verde-complementario-svg-2022.svg";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleLoginClick = () => {
    // Aquí puedes añadir la lógica de autenticación (si es necesario)
    navigate("/home"); // Navega a la página de inicio
  };

  return (
    <div className={classes.container}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <form className={classes.form}> {/* Quita el onSubmit del form */}
        <input
          type="text"
          placeholder="Nombre de usuario"
          className={classes.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className={classes.input}
        />
        <button 
          type="button" // Cambia el tipo de botón a "button" para que no intente enviar el formulario
          className={classes.button}
          onClick={handleLoginClick} // Añade el evento onClick
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
}));

export default Login;





