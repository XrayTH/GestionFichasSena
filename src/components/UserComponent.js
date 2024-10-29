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
            sx={{
              width: '100%',
            }}
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
              onClick={() => setShowPassword(!showPassword)}
              sx={{
                backgroundColor: '#5eb219',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#4cae14',
                },
              }}
            >
              {showPassword ? 'Ocultar' : 'Ver'}
            </Button>
          </div>
          <TextField
            sx={{
              width: '100%',
            }}
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
            sx={{
              width: '100%',
            }}
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
            sx={{
              alignSelf: 'center',
            }}
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
            sx={{
              alignSelf: 'center',
            }}
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
            sx={{
              alignSelf: 'center',
            }}
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
            sx={{
              alignSelf: 'center',
            }}
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
            sx={{
              alignSelf: 'center',
            }}
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
        <Button
          sx={{
            backgroundColor: '#5eb219',
            color: '#fff',
            marginTop: '10px',
            '&:hover': {
              backgroundColor: '#4cae14',
            },
          }}
          onClick={handleEditClick}
        >
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button
          sx={{
            backgroundColor: '#ae1499',
            color: '#fff',
            marginTop: '10px',
            '&:hover': {
              backgroundColor: '#d81b60',
            },
          }}
          onClick={() => onDelete(user.id)}
        >
          Borrar
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #5eb219',
    width: '100%',                
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
}));

export default UserComponent;
