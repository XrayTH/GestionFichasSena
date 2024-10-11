import { fichaSenaService } from '../utils/api'; // Asegúrate de que esta ruta sea correcta

// Crear un nuevo programa
export const crearPrograma = async (programaData) => {
  const { nombre, nombreCorto } = programaData;

  // Validaciones
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

// Obtener todos los programas
export const obtenerProgramas = async () => {
  try {
    const response = await fichaSenaService.get('/programas');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los programas');
  }
};

// Actualizar programa por ID
export const actualizarProgramaPorId = async (id, programaData) => {
  const { nombre, nombreCorto } = programaData;

  // Validaciones
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

// Obtener programa por nombre
export const obtenerProgramaPorNombre = async (nombre) => {
  try {
    const response = await fichaSenaService.get(`/programas/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el programa');
  }
};

// Obtener programa por ID
export const obtenerProgramaPorId = async (id) => {
  try {
    const response = await fichaSenaService.get(`/programas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el programa');
  }
};

// Eliminar programa por ID
export const eliminarProgramaPorId = async (id) => {
  try {
    const response = await fichaSenaService.delete(`/programas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el programa');
  }
};
