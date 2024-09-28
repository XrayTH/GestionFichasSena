import { useState, useMemo } from 'react';
import { Button, TextField } from '@mui/material';
import Coordinador from './Coordinador';
import NewCoordinador from './NewCoordinador';
import { makeStyles } from '@mui/styles';

const GestionCoordinadores = () => {
  const classes = useStyles();

  const [coordinadores, setCoordinadores] = useState([
    { documento: '123456789', nombre: 'Juan Perez', email: 'juan.perez@example.com' },
    { documento: '987654321', nombre: 'Maria Gómez', email: 'maria.gomez@example.com' },
    { documento: '456123789', nombre: 'Carlos Rodriguez', email: 'carlos.rodriguez@example.com' },
    { documento: '321654987', nombre: 'Lucía López', email: 'lucia.lopez@example.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCoordinadorForm, setShowNewCoordinadorForm] = useState(false);

  const handleNewCoordinadorClick = () => setShowNewCoordinadorForm(true);

  const handleSaveNewCoordinador = (newCoordinador) => {
    setCoordinadores((prevCoordinadores) => [...prevCoordinadores, newCoordinador]);
    setShowNewCoordinadorForm(false);
  };

  const handleCancelNewCoordinador = () => setShowNewCoordinadorForm(false);

  const handleUpdateCoordinador = (updatedCoordinador) => {
    setCoordinadores((prevCoordinadores) =>
      prevCoordinadores.map((coordinador) =>
        coordinador.documento === updatedCoordinador.documento ? updatedCoordinador : coordinador
      )
    );
  };

  const filteredCoordinadores = useMemo(() => {
    return coordinadores.filter((coordinador) =>
      coordinador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinador.documento.toLowerCase().includes(searchTerm.toLowerCase())
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
                onUpdate={handleUpdateCoordinador}
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

