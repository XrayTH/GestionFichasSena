import React from 'react'
import { Button, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const PanelGestion = () => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.buttonContainer}>
        <Button className={classes.button}>Fichas</Button>
        <Button className={classes.button}>Instructores</Button>
        <Button className={classes.button}>Coordinadores</Button>
        <Button className={classes.button}>Programas</Button>
        <Button className={classes.button}>Horarios</Button>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles({
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#195eb2',
    },
    fontWeight: 'bold',
    padding: '10px 20px',
    flexGrow: 1,
    flexBasis: '200px',
    maxWidth: '300px',
  },
})

export default PanelGestion

