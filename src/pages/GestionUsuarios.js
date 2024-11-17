import { useState, useMemo, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, Snackbar, Alert, CircularProgress, AlertTitle } from '@mui/material';
import UserComponent from '../components/UserComponent';
import NewUserForm from '../components/NewUserForm';
import { getUsuarios, createUsuario, updateUsuarioById, deleteUsuarioById } from '../service/userService';
import { getCoordinadores } from '../service/coordinadorService';
import Sidebar from '../components/Sidebar';
import { encryptPassword, decryptPassword } from '../utils/encryption';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [coordinadores, setCoordinadores] = useState([]);
  const [mostrarFormularioNuevoUsuario, setMostrarFormularioNuevoUsuario] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuarios = async () => {
      setLoading(true);
      try {
        const usuariosDesdeApi = await getUsuarios();
        const usuariosConContraseñasDesencriptadas = usuariosDesdeApi.map(usuario => ({
          ...usuario,
          contraseña: decryptPassword(usuario.contraseña),
        }));
        setUsuarios(usuariosConContraseñasDesencriptadas);

        const cooData = await getCoordinadores();
        setCoordinadores(cooData)

      } catch (error) {
        console.error("Error al cargar usuarios:", error.message);
        setMensaje({ text: error.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  const manejarNuevoUsuarioClick = () => setMostrarFormularioNuevoUsuario(true);

  const manejarGuardarNuevoUsuario = async (nuevoUsuario) => {
    try {
      const usuarioConContraseñaEncriptada = {
        ...nuevoUsuario,
        contraseña: encryptPassword(nuevoUsuario.contraseña),
      };

      const usuarioTemp = {
        ...nuevoUsuario,
        contraseña: nuevoUsuario.contraseña,
      };

      await createUsuario(usuarioConContraseñaEncriptada);
      const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(usuario => usuario.id)) + 1 : 1;
      const usuarioConId = { ...usuarioTemp, id: nuevoId };
      setUsuarios((usuariosPrevios) => [usuarioConId, ...usuariosPrevios]);
      setMostrarFormularioNuevoUsuario(false);
      setMensaje({ text: 'Usuario creado con éxito', severity: 'success' });
    } catch (error) {
      console.error("Error al guardar el nuevo usuario:", error.message);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const manejarEliminarUsuario = async (usuarioId) => {
    const confirmarEliminacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");

    if (!confirmarEliminacion) {
      return;
    }

    try {
      await deleteUsuarioById(usuarioId);
      setUsuarios((usuariosPrevios) =>
        usuariosPrevios.filter(usuario => usuario.id !== usuarioId)
      );
      setMensaje({ text: 'Usuario eliminado con éxito', severity: 'success' });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
      setMensaje({ text: error.message, severity: 'error' });
    }
  };

  const manejarCancelarNuevoUsuario = () => setMostrarFormularioNuevoUsuario(false);

  const manejarActualizarUsuario = async (usuarioActualizado) => {
    try {
      const usuarioConContraseñaEncriptada = {
        ...usuarioActualizado,
        contraseña: encryptPassword(usuarioActualizado.contraseña),
      };

      await updateUsuarioById(usuarioConContraseñaEncriptada.id, usuarioConContraseñaEncriptada);
      setUsuarios((usuariosPrevios) =>
        usuariosPrevios.map(usuario => (usuario.id === usuarioActualizado.id ? usuarioConContraseñaEncriptada : usuario))
      );
      setMensaje({ text: 'Usuario actualizado con éxito', severity: 'success' });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
      setMensaje({ text: error.message, severity: 'error' });
    }
    window.location.reload();
  };

  const roles = useMemo(() => {
    const rolesUnicos = new Set(usuarios.map(usuario => usuario.rol));
    return Array.from(rolesUnicos);
  }, [usuarios]);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const nombreUsuario = usuario.usuario?.toLowerCase() || "";
      const coincideBusqueda = nombreUsuario.includes(textoBusqueda.toLowerCase());
      const coincideRol = rolSeleccionado ? usuario.rol === rolSeleccionado : true;
      return coincideBusqueda && coincideRol;
    });
  }, [usuarios, textoBusqueda, rolSeleccionado]);

  return (
    <>
      <Sidebar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          //backgroundColor: '#878787',
          padding: '20px',
          margin: 'auto auto',
        }}
      >

        {mensaje && (
          <Snackbar open={Boolean(mensaje)} autoHideDuration={6000} onClose={() => setMensaje(null)}>
            <Alert onClose={() => setMensaje(null)} severity={mensaje.severity}>
              {mensaje.text}
            </Alert>
          </Snackbar>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            width: '100%',
            flexWrap: 'wrap',  
          }}
        >
          <div style={{ flex: '1', marginRight: '20px', marginBottom: '10px' }}>
            <TextField
              fullWidth
              placeholder="Filtrar por usuario"
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  padding: '10px',
                  width: '100%',
                  minWidth: '300px'
                },
              }}
            />
          </div>
          <div style={{ flex: '1', marginRight: '20px', marginBottom: '10px' }}>
            <FormControl fullWidth>
              <Select
                value={rolSeleccionado}
                onChange={(e) => setRolSeleccionado(e.target.value)}
                displayEmpty
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  padding: '10px',
                }}
              >
                <MenuItem value=""><em>Todos los roles</em></MenuItem>
                {roles.map((rol) => (
                  <MenuItem key={rol} value={rol}>{rol}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ flex: 'none', textAlign: 'right', marginBottom: '10px' }}>
            <Button
              variant="contained"
              onClick={manejarNuevoUsuarioClick}
              style={{
                backgroundColor: '#5eb219',
                '&:hover': {
                  backgroundColor: '#4cae14',
                },
                borderRadius: '4px',
                padding: '10px 20px',
              }}
            >
              Nuevo Usuario
            </Button>
          </div>
        </div>

        {mostrarFormularioNuevoUsuario && <NewUserForm onSave={manejarGuardarNuevoUsuario} onCancel={manejarCancelarNuevoUsuario} />}

        <div
        style={{
          margin: '20px 20px',
          width: '100%',
          maxWidth: '60%',
          textAlign: 'center',
        }}
      >
        <Alert severity="warning" style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082' }}>
          <AlertTitle><strong>Advertencia</strong></AlertTitle>
          Si altera los permisos de su sesión actual, saltará un error de autenticación y deberá loguearse nuevamente.
        </Alert>
      </div>

        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CircularProgress style={{ color: "#5eb219" }} />
          </div>
        ) : (
          <div style={{ marginTop: '20px', width: '100%' }}>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario) => (
                <div key={usuario.id} style={{
                  marginBottom: '15px',
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  maxWidth: '60%',
                  minWidth: '300px',
                  transition: 'transform 0.2s',
                  margin: 'auto auto',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}>
                  <UserComponent user={usuario} coordinadores={coordinadores} onUpdate={manejarActualizarUsuario} onDelete={manejarEliminarUsuario} />
                </div>
              ))
            ) : (
              <p>No se encontraron usuarios</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default GestionUsuarios;
