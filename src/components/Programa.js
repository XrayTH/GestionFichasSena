import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Programa = ({ programa, onUpdate, onDelete }) => {
  const classes = useStyles();

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
    <div className={classes.container}>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Nombre</label>
        <TextField
          className={classes.textField}
          name="nombre"
          value={formState.nombre || ''}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
        />
      </div>

      <div className={classes.fieldContainer}>
        <label className={classes.label}>Nombre Corto</label>
        <TextField
          className={classes.textField}
          name="nombreCorto"
          value={formState.nombreCorto || ''}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
        />
      </div>

      <div className={classes.buttonRow}>
        <Button className={classes.button} onClick={handleEditClick}>
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button className={classes.deleteButton} onClick={handleDeleteClick}>Borrar</Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #5eb219',
    maxWidth: '400px',
    width: '70%',
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

export default Programa;