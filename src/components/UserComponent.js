import React, { useState, useEffect } from 'react';
import { TextField, Button, Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';

const UserComponent = ({ user, onUpdate }) => {
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

  // Actualiza formState cuando el usuario prop cambia
  useEffect(() => {
    setFormState(user);
  }, [user]);

  return (
    <div className={classes.container}>
      {/* 1. Usuario */}
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

      {/* 2. Contraseña */}
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

      {/* 3. Rol */}
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

      {/* 4. Editar */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Editar</label>
        <Switch
          className={classes.switch}
          checked={formState.editar}
          disabled={!isEditable}
          onChange={() =>
            setFormState({ ...formState, editar: !formState.editar })
          }
        />
      </div>

      {/* 5. Crear */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Crear</label>
        <Switch
          className={classes.switch}
          checked={formState.crear}
          disabled={!isEditable}
          onChange={() =>
            setFormState({ ...formState, crear: !formState.crear })
          }
        />
      </div>

      {/* 6. Gestionar Usuarios */}
      <div className={classes.fieldContainer}>
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

      {/* 7. Botones */}
      <div className={classes.fieldContainer}>
        <Button className={classes.button} onClick={handleEditClick}>
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button className={classes.deleteButton}>Borrar</Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #5eb219',
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
  labelWithButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textField: {
    width: '100%',
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
  switch: {
    alignSelf: 'center',
  },
}));

export default UserComponent;
