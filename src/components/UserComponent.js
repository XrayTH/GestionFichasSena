import React, { useState } from 'react'
import { TextField, Button, Switch } from '@mui/material'
import { makeStyles } from '@mui/styles'

const UserComponent = () => {
  const classes = useStyles()

  const [isEditable, setIsEditable] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState({
    username: 'user123',
    password: 'password123',
    role: 'Admin',
    canEdit: false,
    canCreate: false,
    canManageUsers: false,
  })

  const handleEditClick = () => {
    setIsEditable(!isEditable)
  }

  return (
    <div className={classes.container}>
      {/* 1. Usuario */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Usuario:</label>
        <TextField
          className={classes.textField}
          value={formState.username}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
        />
      </div>

      {/* 2. Contraseña */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Contraseña:</label>
        <div className={classes.passwordWrapper}>
          <TextField
            className={classes.textField}
            type={showPassword ? 'text' : 'password'}
            value={formState.password}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
          />
          <Button
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            className={classes.button}
          >
            👁️
          </Button>
        </div>
      </div>

      {/* 3. Rol */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Rol:</label>
        <TextField
          className={classes.textField}
          value={formState.role}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
        />
      </div>

      {/* 4. Editar */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Editar:</label>
        <Switch
          className={classes.switch}
          checked={formState.canEdit}
          disabled={!isEditable}
          onChange={() =>
            setFormState({ ...formState, canEdit: !formState.canEdit })
          }
        />
      </div>

      {/* 5. Crear */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Crear:</label>
        <Switch
          className={classes.switch}
          checked={formState.canCreate}
          disabled={!isEditable}
          onChange={() =>
            setFormState({ ...formState, canCreate: !formState.canCreate })
          }
        />
      </div>

      {/* 6. Gestionar Usuarios */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Gestionar Usuarios:</label>
        <Switch
          className={classes.switch}
          checked={formState.canManageUsers}
          disabled={!isEditable}
          onChange={() =>
            setFormState({
              ...formState,
              canManageUsers: !formState.canManageUsers,
            })
          }
        />
      </div>

      {/* 7. Botones */}
      <div className={classes.fieldContainer}>
        <Button
          className={classes.button}
          onClick={handleEditClick}
        >
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button className={classes.deleteButton}>Borrar</Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: 'span 7', // Ocupa las 7 columnas
  },
  label: {
    fontWeight: 'bold',
    color: '#2914ae',
    alignSelf: 'flex-start', // Alinea las etiquetas al inicio
    marginBottom: '5px',
  },
  textField: {
    width: '100%',
  },
  passwordWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2914ae',
    color: '#fff',
    marginTop: '10px', // Espaciado superior para los botones
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  deleteButton: {
    backgroundColor: '#ae1499',
    color: '#fff',
    marginTop: '10px', // Espaciado superior para el botón de borrar
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
  switch: {
    alignSelf: 'center',
  },
}))

export default UserComponent
