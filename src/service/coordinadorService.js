import { fichaSenaService } from '../utils/api'; 

const api = fichaSenaService;

export const getCoordinadores = async () => {
  try {
    const response = await api.get('/coordinadores');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener coordinadores');
  }
};

export const createCoordinador = async (coordinadorData) => {
  try {
    const response = await api.post('/coordinadores', coordinadorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear el coordinador');
  }
};

export const getCoordinadorByDocumento = async (documento) => {
  try {
    const response = await api.get(`/coordinadores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el coordinador');
  }
};

export const getCoordinadorByNombre = async (nombre) => {
  try {
    const response = await api.get(`/coordinadores/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el coordinador');
  }
};

export const updateCoordinadorByDocumento = async (documento, coordinadorData) => {
  try {
    const response = await api.put(`/coordinadores/${documento}`, coordinadorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar el coordinador');
  }
};

export const deleteCoordinadorByDocumento = async (documento) => {
  try {
    const response = await api.delete(`/coordinadores/${documento}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar el coordinador');
  }
};
