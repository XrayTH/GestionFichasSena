import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const NewInstructor = ({ onSave, onCancel }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    documento: '',
    nombre: '',
    email: '',
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
      <TextField
        label="Documento"
        name="documento"
        value={formState.documento}
        onChange={handleChange}
        variant="outlined"
        className={classes.textField}
      />
      <TextField
        label="Nombre"
        name="nombre"
        value={formState.nombre}
        onChange={handleChange}
        variant="outlined"
        className={classes.textField}
      />
      <TextField
        label="Email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        variant="outlined"
        className={classes.textField}
      />

      <div className={classes.buttonRow}>
        <Button onClick={handleSave} className={classes.saveButton}>
          Guardar
        </Button>
        <Button onClick={onCancel} className={classes.cancelButton}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    border: '2px solid black',
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
  },
  textField: {
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  saveButton: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  cancelButton: {
    backgroundColor: '#b2195e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
}));

export default NewInstructor;
