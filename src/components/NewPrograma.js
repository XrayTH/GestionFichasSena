import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const NewPrograma = ({ onSave, onCancel }) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    nombre: '',
    nombreCorto: ''
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

      {/* Nombre Corto */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Nombre Corto</label>
        <TextField
          className={classes.textField}
          name="nombreCorto"
          value={formState.nombreCorto}
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
    maxWidth: '300px',
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

export default NewPrograma;
