import { fichaSenaService } from '../utils/api'; 

const api = fichaSenaService;

export const getInstructores = async () => {
  try {
    const response = await api.get('/instructores');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener instructores');
  }
};

export const createInstructor = async (instructorData) => {
  try {
    const { documento, nombre } = instructorData;

    if (!documento || !nombre) {
      throw new Error('El campo documento y nombre son obligatorios');
    }

    const response = await api.post('/instructores', instructorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear el instructor');
  }
};

export const getInstructorByDocumento = async (documento) => {
  try {
    const response = await api.get(`/instructores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el instructor');
  }
};

export const getInstructorByNombre = async (nombre) => {
  try {
    const response = await api.get(`/instructores/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el instructor');
  }
};

export const updateInstructorByDocumento = async (documento, instructorData) => {
  try {
    const { nombre } = instructorData;

    if (!documento || !nombre) {
      throw new Error('El campo documento y nombre son obligatorios');
    }

    const response = await api.put(`/instructores/${documento}`, instructorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar el instructor');
  }
};

export const deleteInstructorByDocumento = async (documento) => {
  try {
    const response = await api.delete(`/instructores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar el instructor');
  }
};
