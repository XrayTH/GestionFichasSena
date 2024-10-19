import { fichaSenaService } from '../utils/api'; 

const api = fichaSenaService;

export const getFichas = async () => {
  try {
    const response = await api.get('/fichas');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener fichas');
  }
};

export const getFichaByCodigo = async (codigo) => {
  try {
    const response = await api.get(`/fichas/${codigo}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener la ficha');
  }
};

export const createFicha = async (fichaData) => {
  try {
    const response = await api.post('/fichas', fichaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear ficha');
  }
};

export const updateFichaByCodigo = async (codigo, fichaData) => {
  try {
    const response = await api.put(`/fichas/${codigo}`, fichaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar la ficha');
  }
};

export const deleteFichaByCodigo = async (codigo) => {
  try {
    const response = await api.delete(`/fichas/${codigo}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar la ficha');
  }
};
