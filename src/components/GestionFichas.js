import { useState, useMemo } from 'react';
import { Button, TextField } from '@mui/material';
import FichaBasica from './FichaBasica';
import NewFichaBasica from './NewFichaBasica';
import { makeStyles } from '@mui/styles';

const GestionFichas = () => {
  const classes = useStyles();

  const [fichas, setFichas] = useState([
    { id: 1, coordinador: 'Juan Perez', gestor: 'Diego Torres', programa: 'Programación', ambiente: 'Laboratorio 101', inicio: '2024-10-01', fin: '2024-12-15', requerimientos: 'Proyector, PC con software especializado' },
    { id: 2, coordinador: 'Maria Gómez', gestor: 'Ana Martínez', programa: 'Diseño Gráfico', ambiente: 'Laboratorio 202', inicio: '2024-09-01', fin: '2024-11-30', requerimientos: 'Mesa de trabajo, iMac' },
    { id: 3, coordinador: 'Carlos Rodriguez', gestor: 'Luis Fernández', programa: 'Redes', ambiente: 'Laboratorio 303', inicio: '2024-08-15', fin: '2024-12-01', requerimientos: 'Router, Switch' },
    { id: 4, coordinador: 'Lucía López', gestor: 'Diego Torres', programa: 'Marketing', ambiente: 'Laboratorio 404', inicio: '2024-09-15', fin: '2024-12-01', requerimientos: 'Proyector, Computadora' },
]);


  const [coordinadores] = useState(['Juan Perez', 'Maria Gómez', 'Carlos Rodriguez', 'Lucía López']);
  const [instructores] = useState(['Diego Torres', 'Ana Martínez', 'Luis Fernández']);
  const [programas] = useState(['Programación', 'Diseño Gráfico', 'Redes', 'Marketing']);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewFichaForm, setShowNewFichaForm] = useState(false);

  const handleNewFichaClick = () => setShowNewFichaForm(true);

  const handleSaveNewFicha = (newFicha) => {
    const fichaWithId = { ...newFicha, id: newFicha.id }; // Usa el ID asignado
    setFichas((prevFichas) => [...prevFichas, fichaWithId]);
    setShowNewFichaForm(false);
    console.log(fichas);
  };

  const handleCancelNewFicha = () => setShowNewFichaForm(false);

  const handleUpdateFicha = (updatedFicha) => {
    setFichas((prevFichas) =>
      prevFichas.map((ficha) => (ficha.id === updatedFicha.id ? updatedFicha : ficha))
    );
  };

  const filteredFichas = useMemo(() => {
    return fichas.filter((ficha) =>
      ficha.coordinador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.programa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.ambiente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.gestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.id.toString().includes(searchTerm)
    );
  }, [fichas, searchTerm]);

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <TextField
          variant="outlined"
          placeholder="Buscar por ID de Ficha, Coordinador, Programa o Ambiente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchField}
        />

        <div className={classes.newFichaButton}>
          <Button variant="contained" onClick={handleNewFichaClick} className={classes.newFichaButtonStyle}>
            Nueva Ficha
          </Button>
        </div>
      </div>

      {showNewFichaForm && (
        <NewFichaBasica 
          onSave={handleSaveNewFicha} 
          onCancel={handleCancelNewFicha} 
          coordinadores={coordinadores}
          gestores={instructores}
          programas={programas}
        />
      )}

      <div className={classes.fichaList}>
        {filteredFichas.length > 0 ? (
          filteredFichas.map((ficha) => (
            <div key={ficha.id} className={classes.fichaComponent}>
              <FichaBasica 
                ficha={ficha}
                onUpdate={handleUpdateFicha} // Pasa el método de actualización
                coordinadores={coordinadores}
                gestores={instructores}
                programas={programas}
              />
            </div>
          ))
        ) : (
          <p>No se encontraron fichas</p>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1400px', // Ajusta el valor a lo que necesites
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
  newFichaButton: {
    textAlign: 'right',
  },
  newFichaButtonStyle: {
    backgroundColor: '#5eb219',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  fichaList: {
    marginTop: '20px',
  },
  fichaComponent: {
    marginBottom: '15px',
    border: `1px solid #195eb2`,
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#ffffff',
  },
}));


export default GestionFichas;
