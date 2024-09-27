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
      <label className={classes.label}>Usuario:</label>
      <TextField
        className={classes.textField}
        value={formState.username}
        variant="outlined"
        InputProps={{
          readOnly: !isEditable,
        }}
      />

      {/* 2. Contraseña */}
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

      {/* 3. Rol */}
      <label className={classes.label}>Rol:</label>
      <TextField
        className={classes.textField}
        value={formState.role}
        variant="outlined"
        InputProps={{
          readOnly: !isEditable,
        }}
      />

      {/* 4. Editar */}
      <label className={classes.label}>Editar:</label>
      <Switch
        className={classes.switch}
        checked={formState.canEdit}
        disabled={!isEditable}
        onChange={() =>
          setFormState({ ...formState, canEdit: !formState.canEdit })
        }
      />

      {/* 5. Crear */}
      <label className={classes.label}>Crear:</label>
      <Switch
        className={classes.switch}
        checked={formState.canCreate}
        disabled={!isEditable}
        onChange={() =>
          setFormState({ ...formState, canCreate: !formState.canCreate })
        }
      />

      {/* 6. Gestionar Usuarios */}
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

      {/* 7. Botones */}
      <Button
        className={classes.button}
        onClick={handleEditClick}
      >
        {isEditable ? 'Guardar' : 'Editar'}
      </Button>
      <Button className={classes.deleteButton}>Borrar</Button>
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
    label: {
      fontWeight: 'bold',
      color: '#2914ae',
      alignSelf: 'center',
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
      '&:hover': {
        backgroundColor: '#4cae14',
      },
    },
    deleteButton: {
      backgroundColor: '#ae1499',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#d81b60',
      },
    },
    switch: {
      alignSelf: 'center',
    }
  }))
  
export default UserComponent
