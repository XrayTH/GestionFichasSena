import { fichaSenaService } from '../utils/api'; // Asegúrate de que esta ruta sea correcta

// Ruta base del backend
const api = fichaSenaService;

/**
 * Envía un correo electrónico a múltiples destinatarios.
 * @param {Array} emails - Lista de correos electrónicos.
 * @param {String} subject - Asunto del correo.
 * @param {String} content - Contenido del correo.
 * @param {Array} files - Archivos a enviar.
 * @returns {Promise} - Promesa que resuelve cuando se envía el correo.
 */

export const sendEmail = async (emails, subject, content, files) => {
    const formData = new FormData();
  
    // Agregar los campos al FormData
    formData.append('emails', JSON.stringify(emails));
    formData.append('subject', subject);
    formData.append('content', content);
  
    // Agregar archivos al FormData
    files.forEach((file) => {
      formData.append('files', file);
    });
  
    try {
      const response = await fichaSenaService.post('/send-email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al enviar el correo: ' + error.message);
    }
  };

export const sendMasiveEmail = async () => {
    try {
      // Llamada al backend para ejecutar el proceso de envío de correos
      const response = await api.post('/ruta-al-backend', {}); // Asegúrate de usar la ruta correcta aquí
  
      if (response.status === 200) {
        console.log('Correos enviados exitosamente:', response.data.enviados);
        return {
          success: true,
          enviados: response.data.enviados,
          noEnviados: response.data.noEnviados
        };
      } else {
        console.error('Error al enviar los correos:', response.data);
        return {
          success: false,
          message: response.data.message,
          enviados: [],
          noEnviados: []
        };
      }
    } catch (error) {
      console.error('Error al enviar los correos:', error);
      return {
        success: false,
        message: 'Error en el envío de correos',
        enviados: [],
        noEnviados: []
      };
    }
  };
  