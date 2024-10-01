import { useState, useMemo, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
import UserComponent from '../components/UserComponent';
import NewUserForm from '../components/NewUserForm';
import { makeStyles } from '@mui/styles';
import { getUsuarios, createUsuario, updateUsuarioById } from '../service/userService'; // Importa la función para actualizar usuarios
import Sidebar from '../components/Sidebar';

const GestionUsuarios = () => {
  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormularioNuevoUsuario, setMostrarFormularioNuevoUsuario] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState(null); // Manejar mensajes del sistema

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const usuariosDesdeApi = await getUsuarios();
        setUsuarios(usuariosDesdeApi);
      } catch (error) {
        console.error("Error al cargar usuarios:", error.message);
        setMensaje({ text: error.message, severity: 'error' });
      }
    };

    cargarUsuarios();
  }, []);

  const manejarNuevoUsuarioClick = () => setMostrarFormularioNuevoUsuario(true);
  
  const manejarGuardarNuevoUsuario = async (nuevoUsuario) => {
    try {
      await createUsuario(nuevoUsuario); // Llama al método para agregar el nuevo usuario en la base de datos
      const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(usuario => usuario.id)) + 1 : 1; // Obtiene el ID más alto y le suma 1
      const usuarioConId = { ...nuevoUsuario, id: nuevoId }; // Crea el nuevo usuario con el ID asignado
      setUsuarios((usuariosPrevios) => [...usuariosPrevios, usuarioConId]); // Agrega el nuevo usuario al estado
      setMostrarFormularioNuevoUsuario(false);
      setMensaje({ text: 'Usuario creado con éxito', severity: 'success' });
    } catch (error) {
      console.error("Error al guardar el nuevo usuario:", error.message);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };
  
  const manejarCancelarNuevoUsuario = () => setMostrarFormularioNuevoUsuario(false);

  const manejarActualizarUsuario = async (usuarioActualizado) => {
    try {
      await updateUsuarioById(usuarioActualizado.id, usuarioActualizado); // Actualiza en la base de datos
      setUsuarios((usuariosPrevios) =>
        usuariosPrevios.map(usuario => (usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario))
      );
      setMensaje({ text: 'Usuario actualizado con éxito', severity: 'success' });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const roles = useMemo(() => {
    const rolesUnicos = new Set(usuarios.map(usuario => usuario.rol));
    return Array.from(rolesUnicos);
  }, [usuarios]);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const coincideBusqueda = usuario.usuario.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideRol = rolSeleccionado ? usuario.rol === rolSeleccionado : true;
      return coincideBusqueda && coincideRol;
    });
  }, [usuarios, textoBusqueda, rolSeleccionado]);

  return (
    <>
    <Sidebar/>
    <div className={classes.container}>
      {/* Componente de mensajes del sistema */}
      {mensaje && (
        <Snackbar open={Boolean(mensaje)} autoHideDuration={6000} onClose={() => setMensaje(null)}>
          <Alert onClose={() => setMensaje(null)} severity={mensaje.severity}>
            {mensaje.text}
          </Alert>
        </Snackbar>
      )}

      <div className={classes.filters}>
        <div className={classes.filterLeft}>
          <TextField
            fullWidth
            placeholder="Filtrar por usuario"
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            InputProps={{
              className: classes.inputField,
            }}
          />
        </div>
        <div className={classes.filterRight}>
          <FormControl fullWidth>
            <Select 
              value={rolSeleccionado} 
              onChange={(e) => setRolSeleccionado(e.target.value)} 
              displayEmpty
              className={classes.selectField}
            >
              <MenuItem value=""><em>Todos los roles</em></MenuItem>
              {roles.map((rol) => (
                <MenuItem key={rol} value={rol}>{rol}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.newUserButton}>
          <Button variant="contained" onClick={manejarNuevoUsuarioClick} className={classes.newUserButtonStyle}>
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {mostrarFormularioNuevoUsuario && <NewUserForm onSave={manejarGuardarNuevoUsuario} onCancel={manejarCancelarNuevoUsuario} />}

      <div className={classes.userList}>
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((usuario) => (
            <div key={usuario.id} className={classes.userComponent}>
              <UserComponent user={usuario} onUpdate={manejarActualizarUsuario} />
            </div>
          ))
        ) : (
          <p>No se encontraron usuarios</p>
        )}
      </div>
    </div>
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1200px',
    width: '100%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f4f4f4', 
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginLeft: '20px',
      marginRight: '20px',
    },
  },
  filterLeft: {
    flex: '1',
    marginRight: '20px',
    '@media (max-width: 600px)': {
      marginRight: '0',
      marginBottom: '10px',
    },
  },
  filterRight: {
    flex: '1',
    marginRight: '20px',
    '@media (max-width: 600px)': {
      marginRight: '0',
      marginBottom: '10px',
    },
  },
  newUserButton: {
    flex: 'none',
    textAlign: 'right',
    '@media (max-width: 600px)': {
      width: '100%',
      textAlign: 'left',
    },
  },
  newUserButtonStyle: {
    backgroundColor: '#5eb219', 
    '&:hover': {
      backgroundColor: '#4cae14', 
    },
  },
  inputField: {
    backgroundColor: '#ffffff', 
  },
  selectField: {
    backgroundColor: '#ffffff', 
  },
  userList: {
    marginTop: '20px',
  },
  userComponent: {
    marginBottom: '15px',
    border: `1px solid #144cae`, 
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#ffffff', 
  },
  errorText: {
    color: '#ae144c', 
  },
}));

export default GestionUsuarios;
