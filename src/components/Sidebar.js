import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import logo from '../assets/logo-sena-naranja-svg-2022.svg';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#70B22D',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: 'rgba(112,178,45, 0.8)',
    color: 'white',
  },
  logo: {
    width: '50%',
    height: 'auto',
    padding: '50px',
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      cursor: "pointer",
    },
  },
  toggleButton: {
    position: 'absolute',
    left: '10px', // Ajustar la posición del botón según sea necesario
    top: '10px', // Ajustar la posición del botón según sea necesario
    zIndex: 1300, // Asegúrate de que esté por encima de otros componentes
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // El menú está cerrado por defecto
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen); // Alternar el estado
  };

  const MenuItem = ({ text, path }) => (
    <ListItem button className={classes.listItem} onClick={() => navigate(path)}>
      <ListItemText primary={text} />
    </ListItem>
  );

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.toggleButton} color="inherit" onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper }}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <List>
          <MenuItem text="Home" path="/" />
          <MenuItem text="Gestión de Usuarios" path="/gestion-usuarios" />
          <MenuItem text="Programar" path="/programar" />
          <MenuItem text="Consultas" path="/consultas" />
          <MenuItem text="Gestión de Fichas" path="/gestion-fichas" />
          <MenuItem text="Gestión de Coordinadores" path="/gestion-coordinadores" />
          <MenuItem text="Gestión de Instructores" path="/gestion-instructores" />
          <MenuItem text="Enviar Email" path="/enviar-email" />
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
