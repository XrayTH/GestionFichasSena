import { fichaSenaService } from '../utils/api'; 

const api = fichaSenaService;

export const checkBackendStatus = async () => {
  try {
    const response = await api.get('/status');
    return response.data;  
  } catch (error) {
    console.error('Error al verificar el estado del backend:', error);
    throw error;
  }
};
