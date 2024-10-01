import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'; // Asegúrate de que esta ruta sea correcta

export const store = configureStore({
  reducer: {
    user: userReducer, // Usa el reducer importado
  },
});

