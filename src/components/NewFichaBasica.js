import React, { useState } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';

const NewFichaBasica = ({ onSave, onCancel, coordinadores = [], programas = [], gestores = [], municipios = [] }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    codigo: '',
    coordinador: '',
    programa: '',
    gestor: '',
    municipio: '',
    ubicacionGPS: '',
    ambiente: '',
    inicio: '',
    fin: '',
    requerimientos: '',
  });

  const [coordinadorInput, setCoordinadorInput] = useState('');
  const [programaInput, setProgramaInput] = useState('');
  const [gestorInput, setGestorInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formState);
    setFormState({
      codigo: '',
      coordinador: '',
      programa: '',
      gestor: '',
      municipio: '',
      ubicacionGPS: '',
      ambiente: '',
      inicio: '',
      fin: '',
      requerimientos: '',
    });
  };

  return (
    <div className={classes.container}>

      <div className={classes.fieldRow}>
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Código</label>
          <TextField
            className={classes.textField}
            name="codigo"
            value={formState.codigo}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Coordinador</label>
          <Autocomplete
            value={formState.coordinador}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                coordinador: newValue,
              }));
            }}
            inputValue={coordinadorInput}
            onInputChange={(event, newInputValue) => {
              setCoordinadorInput(newInputValue);
            }}
            options={coordinadores.map((coordinador) => coordinador.nombre)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="coordinador"
                variant="outlined"
                style={{ minWidth: '150px', maxWidth: '100%' }}
              />
            )}
            freeSolo
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Programa</label>
          <Autocomplete
            value={formState.programa}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                programa: newValue,
              }));
            }}
            inputValue={programaInput}
            onInputChange={(event, newInputValue) => {
              setProgramaInput(newInputValue);
            }}
            options={programas.map((programa) => programa.nombre)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="programa"
                variant="outlined"
                style={{ minWidth: '150px', maxWidth: '100%' }}
              />
            )}
            freeSolo
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Gestor</label>
          <Autocomplete
            value={formState.gestor}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                gestor: newValue,
              }));
            }}
            inputValue={gestorInput}
            onInputChange={(event, newInputValue) => {
              setGestorInput(newInputValue);
            }}
            options={gestores.map((gestor) => gestor.nombre)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="gestor"
                variant="outlined"
                style={{ minWidth: '150px', maxWidth: '100%' }}
              />
            )}
            freeSolo
            disableClearable
          />
        </div>
      </div>

      <div className={classes.fieldRow}>
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
          <label className={classes.label}>Ubicación GPS</label>
          <TextField
            className={classes.textField}
            name="ubicacionGPS"
            value={formState.ubicacionGPS}
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
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Requerimientos</label>
        <TextField
          className={classes.textField}
          name="requerimientos"
          value={formState.requerimientos}
          variant="outlined"
          multiline
          rows={4}
          onChange={handleChange}
        />
      </div>

      <div className={classes.buttonRow}>
        <Button className={classes.button} onClick={handleSave}>
          Guardar
        </Button>
        <Button className={classes.button} onClick={onCancel}>
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #4cae14',
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gridGap: '10px',
    justifyItems: 'center',
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
}));

export default NewFichaBasica;
