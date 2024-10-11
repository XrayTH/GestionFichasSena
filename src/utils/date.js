// Función para obtener la fecha de inicio del mes en formato 'YYYY-MM-DD'
export const getStartOfMonth = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return startOfMonth.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
  };
  
  // Función para obtener la fecha de fin del mes en formato 'YYYY-MM-DD'
  export const getEndOfMonth = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return endOfMonth.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
  };
  