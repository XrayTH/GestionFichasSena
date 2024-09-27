import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const NewFichaBasica = ({ onSave, onCancel }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    id: '',
    coordinador: '',
    programa: '',
    ambiente: '',
    inicio: '',
    fin: '',
    requerimientos: '',
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
      {/* Campos en una fila, pero con flex-wrap y centrado */}
      <div className={classes.fieldsRow}>
        {/* 1. ID */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>ID</label>
          <TextField
            className={classes.textField}
            name="id"
            type="text"
            inputMode="numeric"
            value={formState.id}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        {/* 2. Coordinador */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Coordinador</label>
          <TextField
            className={classes.textField}
            name="coordinador"
            value={formState.coordinador}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        {/* 3. Programa */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Programa</label>
          <TextField
            className={classes.textField}
            name="programa"
            value={formState.programa}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        {/* 4. Ambiente */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Ambiente</label>
          <TextField
            className={classes.textField}
            name="ambiente"
            value={formState.ambiente}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        {/* 5. Inicio */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Inicio</label>
          <TextField
            className={classes.textField}
            name="inicio"
            type="date"
            value={formState.inicio}
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        {/* 6. Fin */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Fin</label>
          <TextField
            className={classes.textField}
            name="fin"
            type="date"
            value={formState.fin}
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      {/* Requerimientos centrado */}
      <div className={classes.fieldContainerLarge}>
        <label className={classes.label}>Requerimientos</label>
        <TextField
          className={classes.textFieldLarge}
          name="requerimientos"
          value={formState.requerimientos}
          multiline
          rows={4}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      {/* Botones centrados */}
      <div className={classes.buttonContainer}>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid black',
  },
  fieldsRow: {
    display: 'flex',
    justifyContent: 'center', // Centramos los campos
    alignItems: 'center',
    flexWrap: 'wrap', // Hace que los campos se adapten en responsividad
    width: '100%',
    gap: '15px', // Espacio entre los campos
    marginBottom: '20px',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '15%',
    minWidth: '200px', // Define un ancho mínimo para que los campos se reorganicen correctamente
    alignItems: 'center',
  },
  fieldContainerLarge: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
    color: '#5eb219',
    marginBottom: '5px',
  },
  textField: {
    width: '100%',
  },
  textFieldLarge: {
    width: '80%', // Más espacio para Requerimientos
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
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

export default NewFichaBasica;
