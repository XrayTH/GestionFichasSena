import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Programa = ({ programa, onUpdate, onDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState(programa || {});

  const handleEditClick = () => {
    if (isEditable) {
      onUpdate(formState);
    }
    setIsEditable(!isEditable);
  };

  const handleDeleteClick = () => {
    onDelete(programa.id); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{
      display: 'grid',
      backgroundColor: '#f0f0f0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
      padding: '20px',
      borderRadius: '8px',
      //border: '2px solid #5eb219',
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
          }}
          name="nombre"
          value={formState.nombre || ''}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
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
          }}
          name="nombreCorto"
          value={formState.nombreCorto || ''}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
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
        <Button sx={{
          backgroundColor: '#5eb219',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#4cae14',
          },
          marginRight: '10px',
        }} onClick={handleEditClick}>
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button sx={{
          backgroundColor: '#b2195e',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#d81b60',
          },
        }} onClick={handleDeleteClick}>Borrar</Button>
      </div>
    </div>
  );
};

export default Programa;
