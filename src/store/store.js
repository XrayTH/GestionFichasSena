import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa el almacenamiento local del navegador
import userReducer from '../features/userSlice'; // Asegúrate de que esta ruta sea correcta

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage, // Almacenamiento local
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer, // Usa el reducer persistente
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora estas acciones de redux-persist para evitar el error
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Crear el persistor
export const persistor = persistStore(store);
