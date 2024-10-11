import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importar el ícono de flecha
import { makeStyles } from '@mui/styles';
import logo from '../assets/logo-sena-blanco.svg';

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // El menú está cerrado por defecto
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen); // Alternar el estado
  };

  const MenuItem = ({ text, path }) => (
    <ListItem className={classes.listItem} onClick={() => navigate(path)}>
      <ListItemText primary={text} />
    </ListItem>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#70B22D' }}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.toggleButton}
            color="inherit"
            onClick={handleToggle}
          >
            {open ? <ArrowBackIcon /> : <MenuIcon />} {/* Alternar entre íconos */}
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.title}>
            SISTEMA DE GESTIÓN DE FICHAS - SENA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'rgba(112,178,45, 0.8)',
            color: 'white',
          },
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: '50%', height: 'auto', padding: '50px', cursor: 'pointer' }} // Añadir cursor pointer
          onClick={() => navigate('/')} // Redirigir al hacer click en el logo
        />
        <List>
          <MenuItem text="Home" path="/" />
          <MenuItem text="Gestión de Usuarios" path="/gestion-usuarios" />
          <MenuItem text="Programar por Ficha" path="/programar" />
          <MenuItem text="Programar por Instructor" path="/programar-instructor" />
          <MenuItem text="Gestión de Fichas" path="/gestion-fichas" />
          <MenuItem text="Gestión de Coordinadores" path="/gestion-coordinadores" />
          <MenuItem text="Gestión de Instructores" path="/gestion-instructores" />
          <MenuItem text="Gestión de Programas" path="/gestion-programas" />
        </List>
      </Drawer>
    </>
  );
};

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
  },
  toggleButton: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 1300,
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      cursor: "pointer",
    },
  },
}));

export default Sidebar;
