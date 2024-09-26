import React from 'react';
import { TextField, Button, TextareaAutosize, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImageList from '../components/ImageList'; // Componente para manejar la lista de imágenes SVG

const Email = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* Contenedor principal */}
      <div className={classes.formContainer}>
        {/* Sección Izquierda */}
        <div className={classes.leftSection}>
          <label className={classes.label}>Asunto:</label><br/>
          <TextField variant="outlined" className={classes.textField} /><br/>

          <label className={classes.label}>Contenido:</label><br/>
          <TextareaAutosize
            className={classes.textAreaEditable}
            minRows={6}
            maxRows={6}
            placeholder="Escribe el contenido aquí"
          />

          <div className={classes.imageListWrapper}>
            <ImageList />
            <Button className={classes.addButton}>+</Button>
          </div>
        </div>

        {/* Sección Derecha */}
        <div className={classes.rightSection}>
          <label className={classes.label}>Enviar a:</label>
          <div className={classes.dropdownWrapper}>
            <Select
              variant="outlined"
              className={classes.dropdown}
              displayEmpty
            >
              {/* Opciones vacías por ahora */}
              <MenuItem value="">
                <em>Seleccionar destinatario</em>
              </MenuItem>
            </Select>
            <Button className={classes.addButton}>+</Button>
          </div>

          <TextareaAutosize
            className={classes.textAreaReadOnly}
            minRows={6}
            maxRows={6}
            placeholder="Texto no editable"
            disabled
          />

          <Button variant="contained" color="primary" className={classes.sendButton}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

// useStyles definido debajo del componente
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '1000px',
  },
  leftSection: {
    flex: 1,
    marginRight: '20px',
  },
  rightSection: {
    flex: 1,
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
  },
  textField: {
    marginBottom: '20px',
  },
  textAreaEditable: {
    borderRadius: '4px',
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    resize: 'none',
    fontSize: '16px',
    width: '100%',
  },
  textAreaReadOnly: {
    borderRadius: '4px',
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    backgroundColor: '#f5f5f5',
    resize: 'none',
    fontSize: '16px',
  },
  imageListWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  addButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#5eb219',
    color: '#fff',
    fontSize: '24px',
    minWidth: 'unset',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  dropdown: {
    flexGrow: 1,
  },
  sendButton: {
    backgroundColor: '#5eb219',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    color: '#fff',
    padding: '10px',
  },
}));

export default Email;

