import { useState, useMemo, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import Coordinador from './Coordinador';
import NewCoordinador from './NewCoordinador';
import { makeStyles } from '@mui/styles';
import { getCoordinadores, updateCoordinadorByDocumento, createCoordinador } from '../service/coordinadorService'; // Import correcto

const GestionCoordinadores = () => {
  const classes = useStyles();

  const [coordinadores, setCoordinadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCoordinadorForm, setShowNewCoordinadorForm] = useState(false);

  // Hook para cargar los coordinadores al cargar la página
  useEffect(() => {
    const fetchCoordinadores = async () => {
      try {
        const data = await getCoordinadores(); // Llamada al método correcto para obtener los coordinadores
        setCoordinadores(data); // Llena el estado con los datos obtenidos
      } catch (error) {
        console.error('Error al obtener los coordinadores:', error);
      }
    };

    fetchCoordinadores();
  }, []);

  const handleNewCoordinadorClick = () => setShowNewCoordinadorForm(true);

  const handleSaveNewCoordinador = async (newCoordinador) => {
    try {
      // Envía el nuevo coordinador a la base de datos
      const createdCoordinador = await createCoordinador(newCoordinador);
  
      // Si la creación fue exitosa, actualizamos el estado local
      setCoordinadores((prevCoordinadores) => [...prevCoordinadores, createdCoordinador]);
  
      setShowNewCoordinadorForm(false);
      console.log('Coordinador creado exitosamente en la base de datos');
    } catch (error) {
      console.error('Error al crear el coordinador en la base de datos:', error);
    }
  };
  

  const handleCancelNewCoordinador = () => setShowNewCoordinadorForm(false);

  const handleUpdateCoordinador = async (updatedCoordinador) => {
    try {
      // Actualizamos en la base de datos con el método correcto
      await updateCoordinadorByDocumento(updatedCoordinador.documento, updatedCoordinador);

      // Si la actualización en la base de datos es exitosa, actualizamos en el estado local
      setCoordinadores((prevCoordinadores) =>
        prevCoordinadores.map((coordinador) =>
          coordinador.documento === updatedCoordinador.documento ? updatedCoordinador : coordinador
        )
      );
      console.log('Coordinador actualizado exitosamente en la base de datos');
    } catch (error) {
      console.error('Error al actualizar el coordinador en la base de datos:', error);
    }
  };

  const filteredCoordinadores = useMemo(() => {
    return coordinadores.filter((coordinador) =>
      coordinador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinador.documento.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coordinadores, searchTerm]);

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <TextField
          variant="outlined"
          placeholder="Buscar por Documento, Nombre o Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchField}
        />
        <div className={classes.newCoordinadorButton}>
          <Button variant="contained" onClick={handleNewCoordinadorClick} className={classes.newCoordinadorButtonStyle}>
            Nuevo Coordinador
          </Button>
        </div>
      </div>

      {showNewCoordinadorForm && (
        <NewCoordinador 
          onSave={handleSaveNewCoordinador} 
          onCancel={handleCancelNewCoordinador} 
        />
      )}

      <div className={classes.coordinadorList}>
        {filteredCoordinadores.length > 0 ? (
          filteredCoordinadores.map((coordinador) => (
            <div key={coordinador.documento} className={classes.coordinadorComponent}>
              <Coordinador 
                coordinador={coordinador}
                onUpdate={handleUpdateCoordinador} // Pasamos el método de actualización al componente Coordinador
              />
            </div>
          ))
        ) : (
          <p>No se encontraron coordinadores</p>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1400px',
    width: '100%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  searchField: {
    flexGrow: 1,
    marginRight: '20px',
  },
  newCoordinadorButton: {
    textAlign: 'right',
  },
  newCoordinadorButtonStyle: {
    backgroundColor: '#5eb219',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  coordinadorList: {
    marginTop: '20px',
  },
  coordinadorComponent: {
    marginBottom: '15px',
    border: `1px solid #195eb2`,
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#ffffff',
  },
}));

export default GestionCoordinadores;
