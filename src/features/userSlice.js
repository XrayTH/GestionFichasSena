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
  },
  isAuthenticated: false, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, usuario, rol, tablas, verProgramacion, editProgramacion, email, gestionarUsuarios } = action.payload;

      state.usuario = {
        id: id,
        nombre: usuario, 
        rol: rol, 
        permisos: {
          tablas: Boolean(tablas),
          verProgramacion: Boolean(verProgramacion),
          editProgramacion: Boolean(editProgramacion),
          email: Boolean(email),
          gestionarUsuarios: Boolean(gestionarUsuarios),
        },
      };

      state.isAuthenticated = true; 
    },
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
      state.isAuthenticated = false; 
    },
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

export const { setUser, logout, resetUser } = userSlice.actions;

export const selectUsuario = (state) => state.user.usuario;

export const selectUserRol = (state) => state.user.usuario.rol;

export const selectUserPermisos = (state) => state.user.usuario.permisos;

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
