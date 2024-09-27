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

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Requerimientos</label>
        <TextField
          className={classes.textField}
          name="requerimientos"
          value={formState.requerimientos}
          multiline
          rows={3}
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
    border: '2px solid black',
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
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  cancelButton: {
    backgroundColor: '#b2195e',
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
}));

export default NewFichaBasica;
