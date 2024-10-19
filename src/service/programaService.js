import { fichaSenaService } from '../utils/api'; 

export const crearPrograma = async (programaData) => {
  const { nombre, nombreCorto } = programaData;

  if (!nombre || !nombreCorto) {
    throw new Error('Los campos nombre y nombreCorto son obligatorios');
  }

  try {
    const response = await fichaSenaService.post('/programas', { nombre, nombreCorto });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el programa');
  }
};

export const obtenerProgramas = async () => {
  try {
    const response = await fichaSenaService.get('/programas');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los programas');
  }
};

export const actualizarProgramaPorId = async (id, programaData) => {
  const { nombre, nombreCorto } = programaData;

  if (!nombre || !nombreCorto) {
    throw new Error('Los campos nombre y nombreCorto son obligatorios');
  }

  try {
    const response = await fichaSenaService.put(`/programas/${id}`, { nombre, nombreCorto });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el programa');
  }
};

export const obtenerProgramaPorNombre = async (nombre) => {
  try {
    const response = await fichaSenaService.get(`/programas/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el programa');
  }
};

export const obtenerProgramaPorId = async (id) => {
  try {
    const response = await fichaSenaService.get(`/programas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el programa');
  }
};

export const eliminarProgramaPorId = async (id) => {
  try {
    const response = await fichaSenaService.delete(`/programas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el programa');
  }
};
