import React, { useState } from 'react'
import { TextField, Button, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'

const FichaBasica = ({ ficha, onUpdate }) => {
  const classes = useStyles()

  const [isEditable, setIsEditable] = useState(false)
  const [formState, setFormState] = useState(ficha)

  const handleEditClick = () => {
    if (isEditable) {
      onUpdate(formState)
    }
    setIsEditable(!isEditable)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className={classes.container}>
      {/* ID */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>ID</label>
        <TextField
          className={classes.textField}
          name="id"
          value={formState.id}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>

      {/* Coordinador */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Coordinador</label>
        <TextField
          className={classes.textField}
          name="coordinador"
          value={formState.coordinador}
          select
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
        >
          {/* Opciones vacías por ahora */}
        </TextField>
      </div>

      {/* Programa */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Programa</label>
        <TextField
          className={classes.textField}
          name="programa"
          value={formState.programa}
          select
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
        >
          {/* Opciones vacías por ahora */}
        </TextField>
      </div>

      {/* Jornada */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Jornada</label>
        <TextField
          className={classes.textField}
          name="jornada"
          value={formState.jornada}
          select
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
        >
          <MenuItem value="Mañana">Mañana</MenuItem>
          <MenuItem value="Tarde">Tarde</MenuItem>
          <MenuItem value="Noche">Noche</MenuItem>
        </TextField>
      </div>

      {/* Ambiente */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Ambiente</label>
        <TextField
          className={classes.textField}
          name="ambiente"
          value={formState.ambiente}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
        />
      </div>

      {/* Inicio */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Inicio</label>
        <TextField
          className={classes.textField}
          name="inicio"
          type="date"
          value={formState.inicio}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true, // Mantiene el label visible cuando se selecciona la fecha
          }}
        />
      </div>

      {/* Fin */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Fin</label>
        <TextField
          className={classes.textField}
          name="fin"
          type="date"
          value={formState.fin}
          variant="outlined"
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true, // Mantiene el label visible cuando se selecciona la fecha
          }}
        />
      </div>

      {/* Requerimientos */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Requerimientos</label>
        <TextField
          className={classes.textField}
          name="requerimientos"
          value={formState.requerimientos}
          variant="outlined"
          multiline
          rows={4}
          InputProps={{
            readOnly: !isEditable,
          }}
          onChange={handleChange}
        />
      </div>

      {/* Botones */}
      <div className={classes.buttonContainer}>
        <Button className={classes.button} onClick={handleEditClick}>
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid black',
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#b2195e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
}))

export default FichaBasica


