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

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Documento</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="documento"
          value={formState.documento}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Nombre</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="nombre"
          value={formState.nombre}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Email</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="email"
          value={formState.email}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Teléfono</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="telefono"
          value={formState.telefono}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Área Temática</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="areaTematica"
          value={formState.areaTematica}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div className={classes.buttonRow}>
        <Button
          sx={{
            backgroundColor: '#5eb219',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#4cae14',
            },
            marginRight: '10px',
          }}
          onClick={handleSave}
        >
          Guardar
        </Button>
        <Button
          sx={{
            backgroundColor: '#b2195e',
            color: '#fff',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    border: '2px solid #4cae14',
    maxWidth: '800px',
    width: '90%',
    margin: 'auto auto',
    padding: '10px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    alignItems: 'center',
    margin: 'auto',
  },
  label: {
    fontWeight: 'bold',
    color: '#5eb219',
    alignSelf: 'center',
    marginBottom: '5px',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px',
    gridColumn: '1 / -1',
  },
}));

export default NewInstructor;
