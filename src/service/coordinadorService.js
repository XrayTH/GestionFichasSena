import { fichaSenaService } from '../utils/api'; // Asegúrate de que esta ruta sea correcta

// Ruta base del backend
const api = fichaSenaService;

// Obtener todos los coordinadores
export const getCoordinadores = async () => {
  try {
    const response = await api.get('/coordinadores');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener coordinadores');
  }
};

// Crear un nuevo coordinador
export const createCoordinador = async (coordinadorData) => {
  try {
    const response = await api.post('/coordinadores', coordinadorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear el coordinador');
  }
};

// Obtener coordinador por documento
export const getCoordinadorByDocumento = async (documento) => {
  try {
    const response = await api.get(`/coordinadores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el coordinador');
  }
};

// Obtener coordinador por nombre
export const getCoordinadorByNombre = async (nombre) => {
  try {
    const response = await api.get(`/coordinadores/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el coordinador');
  }
};

// Actualizar coordinador por documento
export const updateCoordinadorByDocumento = async (documento, coordinadorData) => {
  try {
    const response = await api.put(`/coordinadores/${documento}`, coordinadorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar el coordinador');
  }
};

// Eliminar coordinador por documento
export const deleteCoordinadorByDocumento = async (documento) => {
  try {
    const response = await api.delete(`/coordinadores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar el coordinador');
  }
};
