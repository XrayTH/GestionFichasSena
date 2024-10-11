import { fichaSenaService } from '../utils/api'; // Asegúrate de que esta ruta sea correcta

// Ruta base del backend
const api = fichaSenaService;

// Obtener todas las jornadas
export const getJornadas = async () => {
  try {
    const response = await api.get('/jornadas');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener jornadas');
  }
};

// Obtener jornada por ID
export const getJornadaById = async (id) => {
  try {
    const response = await api.get(`/jornadas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener la jornada');
  }
};

// Crear una nueva jornada
export const createJornada = async (jornadaData) => {
  try {
    const response = await api.post('/jornadas', jornadaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear jornada');
  }
};

// Actualizar jornada por ID
export const updateJornadaById = async (id, jornadaData) => {
  try {
    const response = await api.put(`/jornadas/${id}`, jornadaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar jornada');
  }
};

// Eliminar jornada por ID
export const deleteJornadaById = async (id) => {
  try {
    const response = await api.delete(`/jornadas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar la jornada');
  }
};
