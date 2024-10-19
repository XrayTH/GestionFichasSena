import React, { useState } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';

const FichaBasica = ({ ficha, onUpdate, onDelete, coordinadores = [], programas = [], gestores = [], municipios = [] }) => {
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState(ficha || {});
  const [coordinadorInput, setCoordinadorInput] = useState(formState.coordinador || '');
  const [gestorInput, setGestorInput] = useState(formState.gestor || '');
  const [programaInput, setProgramaInput] = useState(formState.programa || '');
  const [municipioInput, setMunicipioInput] = useState(formState.municipio || '');

  const handleEditClick = () => {
    if (isEditable) {
      onUpdate(formState);
    }
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={classes.container}>

      <div className={classes.row}>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Código</label>
          <TextField
            className={classes.textField}
            name="codigo"
            value={formState.codigo || ''}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            style={{ maxWidth: '50%' }} 
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Coordinador</label>
          <Autocomplete
            value={formState.coordinador || ''}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                coordinador: newValue,
              }));
            }}
            inputValue={coordinadorInput}
            onInputChange={(event, newInputValue) => {
              setCoordinadorInput(newInputValue);
              if (!isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  coordinador: newInputValue,
                }));
              }
            }}
            options={coordinadores.map((coordinador) => coordinador.nombre)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="coordinador"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  readOnly: !isEditable,
                }}
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
            value={formState.gestor || ''}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                gestor: newValue,
              }));
            }}
            inputValue={gestorInput}
            onInputChange={(event, newInputValue) => {
              setGestorInput(newInputValue);
              if (!isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  gestor: newInputValue,
                }));
              }
            }}
            options={gestores.map((gestor) => gestor.nombre)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="gestor"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  readOnly: !isEditable,
                }}
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
            value={formState.programa || ''}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                programa: newValue,
              }));
            }}
            inputValue={programaInput}
            onInputChange={(event, newInputValue) => {
              setProgramaInput(newInputValue);
              if (!isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  programa: newInputValue,
                }));
              }
            }}
            options={programas.map((programa) => programa.nombre)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="programa"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  readOnly: !isEditable,
                }}
                style={{ minWidth: '350px', maxWidth: '100%' }}
              />
            )}
            freeSolo
            disableClearable
          />
        </div>
      </div>

      <div className={classes.row}>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Ambiente</label>
          <TextField
            className={classes.textField}
            name="ambiente"
            value={formState.ambiente || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Municipio</label>
          <Autocomplete
            value={formState.municipio || ''}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                municipio: newValue,
              }));
            }}
            inputValue={municipioInput}
            onInputChange={(event, newInputValue) => {
              setMunicipioInput(newInputValue);
              if (!isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  municipio: newInputValue,
                }));
              }
            }}
            options={municipios}
            renderInput={(params) => (
              <TextField
                {...params}
                name="municipio"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  readOnly: !isEditable,
                }}
                style={{ minWidth: '150px', maxWidth: '100%' }}
              />
            )}
            freeSolo
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Ubicación GPS</label>
          <TextField
            className={classes.textField}
            name="ubicacionGPS"
            value={formState.ubicacionGPS || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Inicio</label>
          <TextField
            className={classes.textField}
            name="inicio"
            type="date"
            value={formState.inicio || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
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
            value={formState.fin || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <div className={classes.row}>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Requerimientos</label>
          <TextField
            className={classes.textField}
            name="requerimientos"
            value={formState.requerimientos || ''}
            variant="outlined"
            multiline
            rows={4}
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.buttonRow}>
        <Button className={classes.button} onClick={handleEditClick}>
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button className={classes.deleteButton} onClick={() => onDelete(ficha.codigo)}>Borrar</Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid black',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    flex: '1 1 150px', // Permite que los campos se redimensionen
    margin: '5px',
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
  deleteButton: {
    backgroundColor: '#b2195e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
}));

export default FichaBasica;
