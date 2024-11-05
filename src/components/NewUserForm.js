import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const NewUserForm = ({ onSave, onCancel }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    usuario: '',
    contraseña: '',
    rol: '',
    editar: false,
    crear: false,
    gestionarUsuarios: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formState);
  };

  return (
    <div className={classes.container}>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Usuario</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="usuario"
          value={formState.usuario}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Contraseña</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="contraseña"
          type="password"
          value={formState.contraseña}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Rol</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="rol"
          value={formState.rol}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <Button
          sx={{
            backgroundColor: '#5eb219',
            color: '#fff',
            marginTop: '10px',
            '&:hover': {
              backgroundColor: '#4cae14',
            },
          }}
          onClick={handleSave}
        >
          Guardar
        </Button>
        <Button
          sx={{
            backgroundColor: '#ae1499',
            color: '#fff',
            marginTop: '10px',
            '&:hover': {
              backgroundColor: '#d81b60',
            },
          }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
    gridGap: '10px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '8px',
    //border: '2px solid #4cae14',
    maxWidth: "70%"
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#5eb219',
    alignSelf: 'center',
    marginBottom: '5px',
  },
}));

export default NewUserForm;
