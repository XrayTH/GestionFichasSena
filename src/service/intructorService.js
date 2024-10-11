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

// Crear un nuevo instructor
export const createInstructor = async (instructorData) => {
  try {
    const { documento, nombre } = instructorData;

    // Validación para que no se permitan valores vacíos o nulos
    if (!documento || !nombre) {
      throw new Error('El campo documento y nombre son obligatorios');
    }

    const response = await api.post('/instructores', instructorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear el instructor');
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
    const { nombre } = instructorData;

    // Validación para que no se actualicen con valores vacíos o nulos
    if (!documento || !nombre) {
      throw new Error('El campo documento y nombre son obligatorios');
    }

    const response = await api.put(`/instructores/${documento}`, instructorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar el instructor');
  }
};

// Eliminar instructor por documento
export const deleteInstructorByDocumento = async (documento) => {
  try {
    const response = await api.delete(`/instructores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar el instructor');
  }
};
