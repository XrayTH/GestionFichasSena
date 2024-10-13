import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usuario: {
    id: null,
    nombre: null,
    rol: null,
    permisos: {
      tablas: false,
      verProgramacion: false,
      editProgramacion: false,
      email: false,
      gestionarUsuarios: false,
    },
  }, // Almacena la información del usuario, excluyendo la contraseña
  isAuthenticated: false, // Indica si el usuario está autenticado
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Establece toda la información del usuario y la autenticación
    setUser(state, action) {
      const { id, usuario, rol, tablas, verProgramacion, editProgramacion, email, gestionarUsuarios } = action.payload;

      // Guardamos toda la información del usuario, pero sin la contraseña
      state.usuario = {
        id: id,
        nombre: usuario, // El nombre de usuario
        rol: rol, // El rol del usuario
        permisos: {
          tablas: Boolean(tablas),
          verProgramacion: Boolean(verProgramacion),
          editProgramacion: Boolean(editProgramacion),
          email: Boolean(email),
          gestionarUsuarios: Boolean(gestionarUsuarios),
        },
      };

      state.isAuthenticated = true; // Cambia a true al establecer el usuario
    },
    // Elimina la información del usuario y la autenticación
    logout(state) {
      state.usuario = {
        id: null,
        nombre: null,
        rol: null,
        permisos: {
          tablas: false,
          verProgramacion: false,
          editProgramacion: false,
          email: false,
          gestionarUsuarios: false,
        },
      };
      state.isAuthenticated = false; // Cambia a false al hacer logout
    },
    // Opcional: restablece el estado
    resetUser(state) {
      state.usuario = {
        id: null,
        nombre: null,
        rol: null,
        permisos: {
          tablas: false,
          verProgramacion: false,
          editProgramacion: false,
          email: false,
          gestionarUsuarios: false,
        },
      };
      state.isAuthenticated = false;
    },
  },
});

// Exportar las acciones generadas
export const { setUser, logout, resetUser } = userSlice.actions;

// Selector para obtener toda la información del usuario
export const selectUsuario = (state) => state.user.usuario;

// Selector para obtener solo el rol del usuario
export const selectUserRol = (state) => state.user.usuario.rol;

// Selector para obtener los permisos del usuario
export const selectUserPermisos = (state) => state.user.usuario.permisos;

// Selector para verificar si el usuario está autenticado
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

// Exportar el reducer para usarlo en la configuración del store
export default userSlice.reducer;
