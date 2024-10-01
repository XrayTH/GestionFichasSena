import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usuario: null, // Almacena la información del usuario
  isAuthenticated: false, // Indica si el usuario está autenticado
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Establece la información del usuario y la autenticación
    setUser(state, action) {
      state.usuario = action.payload;
      state.isAuthenticated = true; // Cambia a true al establecer el usuario
    },
    // Elimina la información del usuario y la autenticación
    logout(state) {
      state.usuario = null;
      state.isAuthenticated = false; // Cambia a false al hacer logout
    },
    // Opcional: restablece el estado (puedes añadir más lógica si es necesario)
    resetUser(state) {
      state.usuario = null;
      state.isAuthenticated = false;
    },
  },
});

// Exportar las acciones generadas
export const { setUser, logout, resetUser } = userSlice.actions;

// Selector para obtener la información del usuario
export const selectUsuario = (state) => state.user.usuario;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

// Exportar el reducer para usarlo en la configuración del store
export default userSlice.reducer;
