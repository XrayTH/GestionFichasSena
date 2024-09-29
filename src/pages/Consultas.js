import React from 'react'
import Calendario from './../components/Calendario'
import PanelGestion from './../components/PanelGestion'
import { makeStyles } from '@mui/styles'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'

const Consultas = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Box className={classes.panel}>
        <div className={classes.filtros}>
          <label className={classes.label}>Filtrar por:</label>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter1-label">Filtro 1</InputLabel>
            <Select labelId="filter1-label" defaultValue="">
              <MenuItem value={10}>Opción 1</MenuItem>
              <MenuItem value={20}>Opción 2</MenuItem>
              <MenuItem value={30}>Opción 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter2-label">Filtro 2</InputLabel>
            <Select labelId="filter2-label" defaultValue="">
              <MenuItem value={10}>Opción A</MenuItem>
              <MenuItem value={20}>Opción B</MenuItem>
              <MenuItem value={30}>Opción C</MenuItem>
            </Select>
          </FormControl>
        </div>
        <PanelGestion />
      </Box>

      <div className={classes.content}>
        <Calendario />
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: '20px',
    gap: '20px',
  },
  filtros: {
    flex: '1 1 60%', // Permite que ocupe del 60% al 80% del espacio
    minWidth: '300px',
    maxWidth: '400px',
    backgroundColor: '#f0f0f0', // Color de fondo para diferenciar
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
    flex: '1 1 40%', // El contenido del calendario ocupa el resto
  },
})

export default Consultas
