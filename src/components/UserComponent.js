import React, { useState, useEffect } from 'react';
import { TextField, Button, Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';

const UserComponent = ({ user, onUpdate, onDelete }) => {
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState(user);

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

  useEffect(() => {
    setFormState(user);
  }, [user]);

  return (
    <div className={classes.container}>

      <div className={classes.textFields}>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Usuario</label>
          <TextField
            className={classes.textField}
            name="usuario"
            value={formState.usuario}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <div className={classes.labelWithButton}>
            <label className={classes.label}>Contraseña</label>
            <Button
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              className={classes.button}
            >
              👁️
            </Button>
          </div>
          <TextField
            className={classes.textField}
            name="contraseña"
            type={showPassword ? 'text' : 'password'}
            value={formState.contraseña}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Rol</label>
          <TextField
            className={classes.textField}
            name="rol"
            value={formState.rol}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.switches}>
        <div className={classes.switchContainer}>
          <label className={classes.label}>Gestión Tablas</label>
          <Switch
            className={classes.switch}
            checked={formState.tablas}
            disabled={!isEditable}
            onChange={() =>
              setFormState({ ...formState, tablas: !formState.tablas })
            }
          />
        </div>

        <div className={classes.switchContainer}>
          <label className={classes.label}>Ver Programación</label>
          <Switch
            className={classes.switch}
            checked={formState.verProgramacion}
            disabled={!isEditable}
            onChange={() =>
              setFormState({ ...formState, verProgramacion: !formState.verProgramacion })
            }
          />
        </div>

        <div className={classes.switchContainer}>
          <label className={classes.label}>Editar Programación</label>
          <Switch
            className={classes.switch}
            checked={formState.editProgramacion}
            disabled={!isEditable}
            onChange={() =>
              setFormState({ ...formState, editProgramacion: !formState.editProgramacion })
            }
          />
        </div>

        <div className={classes.switchContainer}>
          <label className={classes.label}>Enviar Emails</label>
          <Switch
            className={classes.switch}
            checked={formState.email}
            disabled={!isEditable}
            onChange={() =>
              setFormState({ ...formState, email: !formState.email })
            }
          />
        </div>

        <div className={classes.switchContainer}>
          <label className={classes.label}>Gestión Usuarios</label>
          <Switch
            className={classes.switch}
            checked={formState.gestionarUsuarios}
            disabled={!isEditable}
            onChange={() =>
              setFormState({
                ...formState,
                gestionarUsuarios: !formState.gestionarUsuarios,
              })
            }
          />
        </div>
      </div>

      <div className={classes.buttons}>
        <Button className={classes.button} onClick={handleEditClick}>
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button className={classes.deleteButton} onClick={() => onDelete(user.id)}>
          Borrar
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #5eb219',
    width: '100%',              
    maxWidth: '600px',           
    boxSizing: 'border-box',     
  },
  textFields: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
  switches: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    color: '#5eb219',
    marginBottom: '5px',
  },
  labelWithButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textField: {
    width: '100%',
  },
  switch: {
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  deleteButton: {
    backgroundColor: '#ae1499',
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
}));

export default UserComponent;
