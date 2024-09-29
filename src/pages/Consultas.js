import React from 'react'
import Calendario from './../components/Calendario'
import PanelGestion from './../components/PanelGestion'
import { makeStyles } from '@mui/styles'
import { FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material'

const Consultas = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Box className={classes.panel}>
          <PanelGestion />
        <div className={classes.filtros}>
          <label className={classes.label}>Filtrar por:</label>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter1-label">Filtro 1</InputLabel>
            <Select labelId="filter1-label" defaultValue="">
              <MenuItem value={10}>Ficha</MenuItem>
              <MenuItem value={20}>Instructor</MenuItem>
              <MenuItem value={30}>Coordinador</MenuItem>
              <MenuItem value={30}>Gestor</MenuItem>
              <MenuItem value={30}>Programa</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter2-label">Filtro 2</InputLabel>
            <Select labelId="filter2-label" defaultValue="">
            </Select>
          </FormControl>
        </div>
      </Box>

      <div className={classes.content}>
        <Calendario />
      </div>

      <Button variant="contained" className={classes.enviarButton}>
        Enviar por correo
      </Button>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    position: 'relative', // Añadido para posicionar el botón
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: '20px',
    gap: '20px',
    alignItems: 'center',
    '@media (max-width: 600px)': { // Cambia a columna en pantallas pequeñas
      flexDirection: 'column',
    },
  },
  filtros: {
    flex: '1 1 60%',
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '8px',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: '10px',
  },
  content: {
    flex: '1 1 40%',
    minWidth: '80%',
  },
  enviarButton: {
    margin: '20px',  // Espaciado desde la derecha
  },
})

export default Consultas


