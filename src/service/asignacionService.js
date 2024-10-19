import { fichaSenaService } from '../utils/api'; 

const api = fichaSenaService;

export const getAllAsignaciones = async () => {
  try {
    const response = await api.get('/asignacion');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener todas las asignaciones');
  }
};

export const getAsignacionById = async (id) => {
  try {
    const response = await api.get(`/asignacion/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener la asignación');
  }
};

export const getAsignacionesByFicha = async (ficha) => {
  try {
    const response = await api.get(`/asignacion/ficha/${ficha}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener las asignaciones por ficha');
  }
};

export const getAsignacionesByInstructor = async (instructor) => {
  try {
    const response = await api.get(`/asignacion/instructor/${instructor}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener las asignaciones por instructor');
  }
};

export const getAsignacionesByDia = async (dia) => {
  try {
    const response = await api.get(`/asignacion/dia/${dia}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener las asignaciones por día');
  }
};

export const getAsignacionesByJornada = async (jornada) => {
  try {
    const response = await api.get(`/asignacion/jornada/${jornada}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener las asignaciones por jornada');
  }
};

export const createAsignacion = async (asignacionData) => {
  try {
    const response = await api.post('/asignacion', asignacionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.error || 'Error al crear la asignación');
  }
};

export const updateAsignacionById = async (id, asignacionData) => {
  try {
    const response = await api.put(`/asignacion/${id}`, asignacionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.error || 'Error al actualizar la asignación');
  }
};

export const deleteAsignacionById = async (id) => {
  try {
    const response = await api.delete(`/asignacion/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar la asignación');
  }
};

export const getNumeroAsignaciones = async (instructor, fechaInicio, fechaFin) => {
  try {
    const response = await api.get(`/asignacion/instructor/${instructor}/numero`, {
      params: { fechaInicio, fechaFin }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el número de asignaciones');
  }
};

