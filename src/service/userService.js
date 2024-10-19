import { fichaSenaService } from '../utils/api'; 

const api = fichaSenaService;

export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener usuarios');
  }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el usuario');
  }
};

export const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post('/usuarios', usuarioData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear usuario');
  }
};

export const updateUsuarioById = async (id, usuarioData) => {
  try {
    const response = await api.put(`/usuarios/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar usuario');
  }
};

export const verificarUsuario = async (credentials) => {
  try {
    const response = await api.post('/usuarios/verificar', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al verificar usuario');
  }
};

export const deleteUsuarioById = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al eliminar el usuario');
  }
};
