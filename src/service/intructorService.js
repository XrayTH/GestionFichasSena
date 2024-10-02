import { fichaSenaService } from '../utils/api'; // Asegúrate de que esta ruta sea correcta

// Ruta base del backend
const api = fichaSenaService;

// Obtener todos los instructores
export const getInstructores = async () => {
  try {
    const response = await api.get('/instructores');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener instructores');
  }
};

// Obtener instructor por documento
export const getInstructorByDocumento = async (documento) => {
  try {
    const response = await api.get(`/instructores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el instructor');
  }
};

// Obtener instructor por nombre
export const getInstructorByNombre = async (nombre) => {
  try {
    const response = await api.get(`/instructores/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el instructor');
  }
};

// Actualizar instructor por documento
export const updateInstructorByDocumento = async (documento, instructorData) => {
  try {
    const response = await api.put(`/instructores/${documento}`, instructorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar el instructor');
  }
};
