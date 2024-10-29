import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const NewPrograma = ({ onSave, onCancel }) => {
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
    <div style={{
      display: 'grid',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #5eb219',
      width: '30%',
      minWidth: '300px',
      margin: '10px auto',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}>
        <label style={{
          fontWeight: 'bold',
          color: '#5eb219',
          alignSelf: 'center',
          marginBottom: '5px',
        }}>Nombre</label>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#5eb219',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5eb219',
              },
            },
          }}
          name="nombre"
          value={formState.nombre}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}>
        <label style={{
          fontWeight: 'bold',
          color: '#5eb219',
          alignSelf: 'center',
          marginBottom: '5px',
        }}>Nombre Corto</label>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#5eb219',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5eb219',
              },
            },
          }}
          name="nombreCorto"
          value={formState.nombreCorto}
          variant="outlined"
          onChange={handleChange}
        />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10px',
        gridColumn: '1 / -1',
      }}>
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

export default NewPrograma;
