import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usuario: {
    id: null,
    nombre: null,
    rol: null,
    permisos: {
      tablas: false,
      verProgramacion: false,
      editProgramacion: "Ninguno",
      email: false,
      gestionarUsuarios: false,
    },
  },
  isAuthenticated: false, 
  token: null, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, usuario, rol, tablas, verProgramacion, editProgramacion, email, gestionarUsuarios, token } = action.payload;

      state.usuario = {
        id: id,
        nombre: usuario, 
        rol: rol, 
        permisos: {
          tablas: Boolean(tablas),
          verProgramacion: Boolean(verProgramacion),
          editProgramacion: editProgramacion,
          email: Boolean(email),
          gestionarUsuarios: Boolean(gestionarUsuarios),
        },
      };

      state.isAuthenticated = true;
      state.token = token; 
    },
    logout(state) {
      state.usuario = {
        id: null,
        nombre: null,
        rol: null,
        permisos: {
          tablas: false,
          verProgramacion: false,
          editProgramacion: "Ninguno",
          email: false,
          gestionarUsuarios: false,
        },
      };
      state.isAuthenticated = false;
      state.token = null; 
    },
    resetUser(state) {
      state.usuario = {
        id: null,
        nombre: null,
        rol: null,
        permisos: {
          tablas: false,
          verProgramacion: false,
          editProgramacion: "Ninguno",
          email: false,
          gestionarUsuarios: false,
        },
      };
      state.isAuthenticated = false;
      state.token = null; 
    },
  },
});

export const { setUser, logout, resetUser } = userSlice.actions;

export const selectUsuario = (state) => state.user.usuario;

export const selectUserRol = (state) => state.user.usuario.rol;

export const selectUserPermisos = (state) => state.user.usuario.permisos;

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export const selectToken = (state) => state.user.token; 

export default userSlice.reducer;
