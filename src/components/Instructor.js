import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Instructor = ({ instructor, onUpdate, onDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState(instructor || {});

  const handleEditClick = () => {
    if (isEditable) {
      onUpdate(formState);
    }
    setIsEditable(!isEditable);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(instructor.documento); 
    }
  }

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
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gridGap: '10px',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #5eb219',
      maxWidth: '700px',
      width: '90%',
      margin: 'auto auto',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
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
        }}>Documento</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="documento"
          value={formState.documento || ''}
          variant="outlined"
          InputProps={{
            readOnly: true,
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
        }}>Email</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="email"
          value={formState.email || ''}
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
        }}>Teléfono</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="telefono"
          value={formState.telefono || ''}
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
        }}>Área Temática</label>
        <TextField
          sx={{
            width: '100%',
          }}
          name="areaTematica"
          value={formState.areaTematica || ''}
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

export default Instructor;
