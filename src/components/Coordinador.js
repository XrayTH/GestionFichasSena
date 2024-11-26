import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Coordinador = ({ coordinador, onUpdate, onDelete }) => {
  const classes = useStyles();
  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState(coordinador || {});

  const handleEditClick = () => {
    if (isEditable) {
      onUpdate(formState);
    }
    setIsEditable(!isEditable);
  };

  const handleDeleteOrCancelClick = () => {
    if (isEditable) {
      setIsEditable(false);
      setFormState(coordinador || {});
    } else {
      onDelete(coordinador.documento);
    }
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
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Documento</label>
        <TextField
          disabled={!isEditable}
          sx={{ width: '100%' }}
          name="documento"
          value={formState.documento || ''}
          variant="outlined"
          InputProps={{ readOnly: true }}
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Nombre</label>
        <TextField
          disabled={!isEditable}
          sx={{ width: '100%' }}
          name="nombre"
          value={formState.nombre || ''}
          variant="outlined"
          InputProps={{ readOnly: !isEditable }}
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Email</label>
        <TextField
          disabled={!isEditable}
          sx={{ width: '100%' }}
          name="email"
          value={formState.email || ''}
          variant="outlined"
          InputProps={{ readOnly: !isEditable }}
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Teléfono</label>
        <TextField
          disabled={!isEditable}
          sx={{ width: '100%' }}
          name="telefono"
          value={formState.telefono || ''}
          variant="outlined"
          InputProps={{ readOnly: !isEditable }}
          onChange={handleChange}
        />
      </div>

      <div className={classes.buttonRow}>
        <Button
          sx={{
            backgroundColor: '#5eb219',
            color: '#fff',
            '&:hover': { backgroundColor: '#4cae14' },
            marginRight: '10px',
          }}
          onClick={handleEditClick}
        >
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button
          sx={{
            backgroundColor: isEditable ? '#d81b60' : '#b2195e',
            color: '#fff',
            '&:hover': {
              backgroundColor: isEditable ? '#4cae14' : '#d81b60',
            },
          }}
          onClick={handleDeleteOrCancelClick}
        >
          {isEditable ? 'Cancelar' : 'Borrar'}
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
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '700px',
    width: '90%',
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
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px',
    gridColumn: '1 / -1',
  },
}));

export default Coordinador;
