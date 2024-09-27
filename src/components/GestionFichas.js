import { useState, useMemo } from 'react';
import { Button, MenuItem, Select, FormControl } from '@mui/material';
import FichaBasica from './FichaBasica';
import NewFichaBasica from './NewFichaBasica';
import { makeStyles } from '@mui/styles';

const GestionFichas = () => {
  const classes = useStyles();

  const [fichas, setFichas] = useState([
    { id: 1, coordinador: 'Juan Perez', programa: 'Programación', ambiente: 'Laboratorio 101', inicio: '2024-10-01', fin: '2024-12-15', requerimientos: 'Proyector, PC con software especializado' },
    { id: 2, coordinador: 'Maria Gómez', programa: 'Diseño Gráfico', ambiente: 'Laboratorio 202', inicio: '2024-09-01', fin: '2024-11-30', requerimientos: 'Mesa de trabajo, iMac' },
    { id: 3, coordinador: 'Carlos Rodriguez', programa: 'Redes', ambiente: 'Laboratorio 303', inicio: '2024-08-15', fin: '2024-12-01', requerimientos: 'Router, Switch' },
    { id: 4, coordinador: 'Lucía López', programa: 'Marketing', ambiente: 'Laboratorio 404', inicio: '2024-09-15', fin: '2024-12-01', requerimientos: 'Proyector, Computadora' },
  ]);

  const [coordinadores] = useState(['Juan Perez', 'Maria Gómez', 'Carlos Rodriguez', 'Lucía López']);
  const [instructores] = useState(['Diego Torres', 'Ana Martínez', 'Luis Fernández']);
  const [programas] = useState(['Programación', 'Diseño Gráfico', 'Redes', 'Marketing']);

  const [selectedFichaId, setSelectedFichaId] = useState('');
  const [showNewFichaForm, setShowNewFichaForm] = useState(false);

  const handleNewFichaClick = () => setShowNewFichaForm(true);

  const handleSaveNewFicha = (newFicha) => {
    const fichaWithId = { ...newFicha }; // Asigna el ID directamente desde el nuevo formulario
    setFichas((prevFichas) => [...prevFichas, fichaWithId]);
    setShowNewFichaForm(false);
  };

  const handleCancelNewFicha = () => setShowNewFichaForm(false);

  const filteredFichas = useMemo(() => {
    return selectedFichaId
      ? fichas.filter((ficha) => ficha.id === parseInt(selectedFichaId))
      : fichas;
  }, [fichas, selectedFichaId]);

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <FormControl fullWidth>
          <Select 
            value={selectedFichaId} 
            onChange={(e) => setSelectedFichaId(e.target.value)} 
            displayEmpty
            className={classes.selectField}
          >
            <MenuItem value=""><em>Todas las fichas</em></MenuItem>
            {fichas.map((ficha) => (
              <MenuItem key={ficha.id} value={ficha.id}>{`Ficha ID ${ficha.id}`}</MenuItem>
            ))}
          </Select>
        </FormControl>

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
                coordinadores={coordinadores}
                gestores={instructores}
                programas={programas} />
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
    maxWidth: '1200px',
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
  selectField: {
    backgroundColor: '#ffffff',
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

