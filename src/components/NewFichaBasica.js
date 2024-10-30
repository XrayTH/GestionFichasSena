import React, { useState } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';

const NewFichaBasica = ({ onSave, onCancel, coordinadores = [], programas = [], gestores = [], municipios = [], ambientes = [] }) => {
  const [formState, setFormState] = useState({
    codigo: '',
    coordinador: '',
    programa: '',
    gestor: '',
    municipio: '',
    avenida: '',
    ubicacionGPS: '',
    ambiente: '',
    inicio: '',
    fin: '',
    requerimientos: '',
  });

  const [coordinadorInput, setCoordinadorInput] = useState('');
  const [programaInput, setProgramaInput] = useState('');
  const [gestorInput, setGestorInput] = useState('');
  const [ambienteInput, setAmbienteInput] = useState('');

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
      avenida: '',
      ubicacionGPS: '',
      ambiente: '',
      inicio: '',
      fin: '',
      requerimientos: '',
    });
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '10px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px', 
        border: '2px solid #5eb219', 
        width: '90%',
        margin: 'auto auto',
      }}
    >
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '10px' 
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Código</label>
          <TextField
            sx={{ width: '100%' }}
            name="codigo"
            value={formState.codigo}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Coordinador</label>
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
                fullWidth
              />
            )}
            freeSolo
            disableClearable
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Programa</label>
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
                fullWidth
              />
            )}
            freeSolo
            disableClearable
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Gestor</label>
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
                fullWidth
              />
            )}
            freeSolo
            disableClearable
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Ambiente</label>
          <Autocomplete
            value={formState.ambiente}
            onChange={(event, newValue) => {
              setFormState((prevState) => ({
                ...prevState,
                ambiente: newValue,
              }));
            }}
            inputValue={ambienteInput}
            onInputChange={(event, newInputValue) => {
              setAmbienteInput(newInputValue);
            }}
            options={ambientes.map((ambiente) => ambiente.nombre)} 
            renderInput={(params) => (
              <TextField
                {...params}
                name="ambiente"
                variant="outlined"
                fullWidth
              />
            )}
            freeSolo
            disableClearable
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Avenida</label>
          <TextField
            sx={{ width: '100%' }}
            name="avenida"
            value={formState.avenida}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Ubicación GPS</label>
          <TextField
            sx={{ width: '100%' }}
            name="ubicacionGPS"
            value={formState.ubicacionGPS}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Inicio</label>
          <TextField
            sx={{ width: '100%' }}
            name="inicio"
            type="date"
            value={formState.inicio}
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Fin</label>
          <TextField
            sx={{ width: '100%' }}
            name="fin"
            type="date"
            value={formState.fin}
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ fontWeight: 'bold', color: '#5eb219', marginBottom: '5px' }}>Requerimientos</label>
          <TextField
            sx={{ width: '100%' }}
            name="requerimientos"
            value={formState.requerimientos}
            variant="outlined"
            multiline
            rows={4}
            onChange={handleChange}
          />
        </div>
      </div>

      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '20px' 
        }}
      >
        <Button 
          sx={{ 
            backgroundColor: '#5eb219', 
            color: '#fff', 
            '&:hover': { backgroundColor: '#4cae14' }, 
            marginRight: '10px' 
          }} 
          onClick={handleSave}
        >
          Guardar
        </Button>
        <Button 
          sx={{ 
            backgroundColor: '#d32f2f', 
            color: '#fff', 
            '&:hover': { backgroundColor: '#c62828' } 
          }} 
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default NewFichaBasica;
