import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux'; 
import { selectUserPermisos } from '../features/userSlice'; 
import logo from '../assets/logo-sena-blanco.svg';

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  
  const permisos = useSelector(selectUserPermisos);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen); 
  };

  const MenuItem = ({ text, path, permiso }) => {
    if (!permiso) return null; 
    return (
      <ListItem className={classes.listItem} onClick={() => navigate(path)}>
        <ListItemText primary={text} />
      </ListItem>
    );
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#70B22D' }}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.toggleButton}
            color="inherit"
            onClick={handleToggle}
          >
            {open ? <ArrowBackIcon /> : <MenuIcon />}
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
            overflow: 'hidden',
          },
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: '50%', height: 'auto', padding: '50px', cursor: 'pointer', marginBottom: '-35px' }} 
          onClick={() => navigate('/')} 
        />
        <List>
          <MenuItem text="Inicio" path="/" permiso/>
          <MenuItem text="Gestión de Usuarios" path="/gestion-usuarios" permiso={permisos.gestionarUsuarios} />
          <MenuItem text="Programar por Ficha" path="/programar" permiso={permisos.verProgramacion} />
          <MenuItem text="Programar por Instructor" path="/programar-instructor" permiso={permisos.verProgramacion} />
          <MenuItem text="Crear Informe" path="/informe" permiso={permisos.verProgramacion} />
          <MenuItem text="Gestión de Fichas" path="/gestion-fichas" permiso={permisos.tablas} />
          <MenuItem text="Gestión de Coordinadores" path="/gestion-coordinadores" permiso={permisos.tablas} />
          <MenuItem text="Gestión de Instructores" path="/gestion-instructores" permiso={permisos.tablas} />
          <MenuItem text="Gestión de Programas" path="/gestion-programas" permiso={permisos.tablas} />
          <MenuItem text="Enviar Email" path="/enviar-email" permiso={permisos.email} />
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
