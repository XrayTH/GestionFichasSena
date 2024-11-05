import React, { useState } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';

const FichaBasica = ({ ficha, onUpdate, onDelete, coordinadores = [], programas = [], gestores = [], municipios = [], ambientes = [] }) => {
  const classes = useStyles();
  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState(ficha || {});
  const [coordinadorInput, setCoordinadorInput] = useState(formState.coordinador || '');
  const [gestorInput, setGestorInput] = useState(formState.gestor || '');
  const [programaInput, setProgramaInput] = useState(formState.programa || '');
  const [municipioInput, setMunicipioInput] = useState(formState.municipio || '');
  const [ambienteInput, setAmbienteInput] = useState(formState.ambiente || '');

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
    <div className={classes.container} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px', border: '2px solid #5eb219' }}>
      <div className={classes.grid} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridGap: '10px', width: '100%' }}>
        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Código</label>
          <TextField
            className={classes.textField} 
            name="codigo"
            value={formState.codigo || ''}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Coordinador</label>
          <Autocomplete
            value={formState.coordinador || ''}
            onChange={(event, newValue) => {
              if (isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  coordinador: newValue,
                }));
              }
            }}
            inputValue={coordinadorInput}
            onInputChange={(event, newInputValue) => {
              if (isEditable) {
                setCoordinadorInput(newInputValue);
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
                fullWidth
              />
            )}
            freeSolo={!isEditable}
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Gestor</label>
          <Autocomplete
            value={formState.gestor || ''}
            onChange={(event, newValue) => {
              if (isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  gestor: newValue,
                }));
              }
            }}
            inputValue={gestorInput}
            onInputChange={(event, newInputValue) => {
              if (isEditable) {
                setGestorInput(newInputValue);
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
                fullWidth
              />
            )}
            freeSolo={!isEditable}
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Programa</label>
          <Autocomplete
            value={formState.programa || ''}
            onChange={(event, newValue) => {
              if (isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  programa: newValue,
                }));
              }
            }}
            inputValue={programaInput}
            onInputChange={(event, newInputValue) => {
              if (isEditable) {
                setProgramaInput(newInputValue);
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
                fullWidth
              />
            )}
            freeSolo={!isEditable}
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Ambiente</label>
          <Autocomplete
            value={formState.ambiente || ''}
            onChange={(event, newValue) => {
              if (isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  ambiente: newValue,
                }));
              }
            }}
            inputValue={ambienteInput}
            onInputChange={(event, newInputValue) => {
              if (isEditable) {
                setAmbienteInput(newInputValue);
              }
            }}
            options={ambientes.map((ambiente) => ambiente.nombre)} 
            renderInput={(params) => (
              <TextField
                {...params}
                name="ambiente"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  readOnly: !isEditable,
                }}
                fullWidth
              />
            )}
            freeSolo={!isEditable}
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Municipio</label>
          <Autocomplete
            value={formState.municipio || ''}
            onChange={(event, newValue) => {
              if (isEditable) {
                setFormState((prevState) => ({
                  ...prevState,
                  municipio: newValue,
                }));
              }
            }}
            inputValue={municipioInput}
            onInputChange={(event, newInputValue) => {
              if (isEditable) {
                setMunicipioInput(newInputValue);
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
                fullWidth
              />
            )}
            freeSolo={!isEditable}
            disableClearable
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Avenida</label>
          <TextField
            className={classes.textField} 
            name="avenida"
            value={formState.avenida || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Ubicación GPS</label>
          <TextField
            className={classes.textField} 
            name="ubicacionGPS"
            value={formState.ubicacionGPS || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Inicio</label>
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
            fullWidth
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Fin</label>
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
            fullWidth
          />
        </div>

        <div className={classes.fieldContainer} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
          <label className={classes.label} sx={{ marginBottom: '5px' }}>Requerimientos</label>
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
            fullWidth
          />
        </div>
      </div>

      <div className={classes.buttonRow} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button className={classes.button} sx={{ backgroundColor: '#5eb219', color: '#fff' }} onClick={handleEditClick}>
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button className={classes.deleteButton} sx={{ backgroundColor: '#d32f2f', color: '#fff' }} onClick={() => onDelete(ficha.codigo)}>Borrar</Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    //border: '2px solid #5eb219',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridGap: '10px',
    width: '100%',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'stretch',
  },
  label: {
    marginBottom: '5px',
  },
  textField: {
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: '#fff',
  },
}));

export default FichaBasica;
