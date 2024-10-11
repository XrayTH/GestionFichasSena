import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const NewInstructor = ({ onSave, onCancel }) => {
  const classes = useStyles();
  
  const [formState, setFormState] = useState({
    documento: '',
    nombre: '',
    email: '',
    telefono: '',
    areaTematica: ''
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
      {/* Documento */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Documento</label>
        <TextField
          className={classes.textField}
          name="documento"
          value={formState.documento}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      {/* Nombre */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Nombre</label>
        <TextField
          className={classes.textField}
          name="nombre"
          value={formState.nombre}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Email</label>
        <TextField
          className={classes.textField}
          name="email"
          value={formState.email}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      {/* Teléfono */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Teléfono</label>
        <TextField
          className={classes.textField}
          name="telefono"
          value={formState.telefono}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      {/* Área Temática */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Área Temática</label>
        <TextField
          className={classes.textField}
          name="areaTematica"
          value={formState.areaTematica}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      {/* Botones */}
      <div className={classes.buttonRow}>
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid black',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
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
  textField: {
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px',
    gridColumn: '1 / -1',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    marginRight: '10px',
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
