import { fichaSenaService } from '../utils/api'; 

const api = fichaSenaService;

export const obtenerAmbientes = async () => {
  try {
    const response = await api.get('/ambientes');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener ambientes: ' + error.message);
  }
};

export const crearAmbiente = async (nombre) => {
    try {
      const response = await api.post('/ambientes', { nombre });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el ambiente: ' + error.message);
    }
  };

export const obtenerAmbientePorId = async (id) => {
  try {
    const response = await api.get(`/ambientes/id/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el ambiente: ' + error.message);
  }
};

export const obtenerAmbientePorNombre = async (nombre) => {
  try {
    const response = await api.get(`/ambientes/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el ambiente: ' + error.message);
  }
};

export const eliminarAmbientePorId = async (id) => {
  try {
    const response = await api.delete(`/ambientes/id/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el ambiente: ' + error.message);
  }
};

export const eliminarAmbientePorNombre = async (nombre) => {
  try {
    const response = await api.delete(`/ambientes/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el ambiente: ' + error.message);
  }
};

export const actualizarAmbientePorId = async (id, nuevoNombre) => {
  try {
    const response = await api.put(`/ambientes/id/${id}`, { nombre: nuevoNombre });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el ambiente: ' + error.message);
  }
};

export const actualizarAmbientePorNombre = async (nombre, nuevoNombre) => {
  try {
    const response = await api.put(`/ambientes/nombre/${nombre}`, { nuevoNombre });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el ambiente: ' + error.message);
  }
};


