import axios from 'axios';
import { fichaSenaService } from '../utils/api'; // Asegúrate de que esta ruta sea correcta

// Ruta base del backend
const api = fichaSenaService

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener usuarios');
  }
};

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al obtener el usuario');
  }
};

// Crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post('/usuarios', usuarioData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al crear usuario');
  }
};

// Actualizar usuario por ID
export const updateUsuarioById = async (id, usuarioData) => {
  try {
    const response = await api.put(`/usuarios/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al actualizar usuario');
  }
};

// Verificar usuario y contraseña
export const verificarUsuario = async (credentials) => {
  try {
    const response = await api.post('/usuarios/verificar', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Error al verificar usuario');
  }
};

