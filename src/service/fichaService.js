import { fichaSenaService } from '../utils/api'; // Asegúrate de que esta ruta sea correcta

// Ruta base del backend
const api = fichaSenaService;

// Obtener todas las fichas
export const getFichas = async () => {
  try {
    const response = await api.get('/fichas');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener fichas');
  }
};

// Obtener ficha por código
export const getFichaByCodigo = async (codigo) => {
  try {
    const response = await api.get(`/fichas/${codigo}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener la ficha');
  }
};

// Crear una nueva ficha
export const createFicha = async (fichaData) => {
  try {
    const response = await api.post('/fichas', fichaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear ficha');
  }
};

// Actualizar ficha por código
export const updateFichaByCodigo = async (codigo, fichaData) => {
  try {
    const response = await api.put(`/fichas/${codigo}`, fichaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar la ficha');
  }
};

// Eliminar ficha por código
export const deleteFichaByCodigo = async (codigo) => {
  try {
    const response = await api.delete(`/fichas/${codigo}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar la ficha');
  }
};
