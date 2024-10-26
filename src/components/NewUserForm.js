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
          className={classes.textField}
          name="usuario"
          value={formState.usuario}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Contraseña</label>
        <TextField
          className={classes.textField}
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
          className={classes.textField}
          name="rol"
          value={formState.rol}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <Button className={classes.button} onClick={handleSave}>
          Guardar
        </Button>
        <Button className={classes.cancelButton} onClick={onCancel}>
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #4cae14',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#2914ae',
    alignSelf: 'center',
    marginBottom: '5px',
  },
  textField: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2914ae',
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  cancelButton: {
    backgroundColor: '#ae1499',
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
}));

export default NewUserForm;

