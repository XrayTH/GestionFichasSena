import { useState, useEffect, useMemo } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import FichaBasica from '../components/FichaBasica';
import NewFichaBasica from '../components/NewFichaBasica';
import { makeStyles } from '@mui/styles';
import { getFichas, createFicha, updateFichaByCodigo, deleteFichaByCodigo } from '../service/fichaService';
import { getInstructores } from '../service/intructorService';
import { getCoordinadores } from '../service/coordinadorService';
import { obtenerProgramas } from '../service/programaService';
import Municipios from '../data/municipios.json';
import Sidebar from '../components/Sidebar';
import DireccionBuscador from '../components/DireccionBuscador';

const GestionFichas = () => {
  const classes = useStyles();

  const [fichas, setFichas] = useState([]);
  const [municipios] = useState(Municipios.municipios);
  const [coordinadores, setCoordinadores] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [programas, setProgramas] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewFichaForm, setShowNewFichaForm] = useState(false);
  const [mensaje, setMensaje] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const fichasData = await getFichas();
      setFichas(fichasData);

      const coordinadoresData = await getCoordinadores();
      setCoordinadores(coordinadoresData);

      const instructoresData = await getInstructores();
      setInstructores(instructoresData);

      const programasData = await obtenerProgramas();
      setProgramas(programasData);
    };

    fetchData();
  }, []);

  const handleNewFichaClick = () => setShowNewFichaForm(true);

  const handleSaveNewFicha = async (newFicha) => {
    try {
      const createdFicha = await createFicha(newFicha);
      setFichas((prevFichas) => [...prevFichas, createdFicha]);
      setShowNewFichaForm(false);
      setMensaje({ text: 'Ficha creada con éxito', severity: 'success' }); 
    } catch (error) {
      console.error("Error al crear ficha:", error.message);
      setMensaje({ text: error.message, severity: 'error' }); 
    }
  };

  const handleCancelNewFicha = () => setShowNewFichaForm(false);

  const handleUpdateFicha = async (updatedFicha) => {
    try {
      const updated = await updateFichaByCodigo(updatedFicha.codigo, updatedFicha);
      setFichas((prevFichas) =>
        prevFichas.map((ficha) => (ficha.codigo === updated.codigo ? updated : ficha))
      );
      setMensaje({ text: 'Ficha actualizada con éxito', severity: 'success' }); 
    } catch (error) {
      console.error("Error al actualizar ficha:", error.message);
      setMensaje({ text: error.message, severity: 'error' }); 
    }
  };

  const handleDeleteFicha = async (codigo) => {
    try {
      await deleteFichaByCodigo(codigo);
      setFichas((prevFichas) => prevFichas.filter((ficha) => ficha.codigo !== codigo));
      setMensaje({ text: 'Ficha eliminada con éxito', severity: 'success' }); 
    } catch (error) {
      console.error("Error al eliminar ficha:", error.message);
      setMensaje({ text: error.message, severity: 'error' }); 
    }
  };

  const filteredFichas = useMemo(() => {
    return fichas.filter((ficha) => {
      const coordinador = ficha.coordinador?.toLowerCase() || "";
      const programa = ficha.programa?.toLowerCase() || "";
      const ambiente = ficha.ambiente?.toLowerCase() || "";
      const gestor = ficha.gestor?.toLowerCase() || "";
      const codigo = ficha.codigo?.toString() || "";
  
      return (
        coordinador.includes(searchTerm.toLowerCase()) ||
        programa.includes(searchTerm.toLowerCase()) ||
        ambiente.includes(searchTerm.toLowerCase()) ||
        gestor.includes(searchTerm.toLowerCase()) ||
        codigo.includes(searchTerm)
      );
    });
  }, [fichas, searchTerm]);
  

  return (
    <>
    <Sidebar/>
    <div className={classes.container}>
      <DireccionBuscador/>
      {mensaje && (
        <Snackbar open={Boolean(mensaje)} autoHideDuration={6000} onClose={() => setMensaje(null)}>
          <Alert onClose={() => setMensaje(null)} severity={mensaje.severity}>
            {mensaje.text}
          </Alert>
        </Snackbar>
      )}

      <div className={classes.filters}>
        <TextField
          variant="outlined"
          placeholder="Buscar por Código de Ficha, Coordinador, Programa o Ambiente"
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
          municipios={municipios}
        />
      )}

      <div className={classes.fichaList}>
        {filteredFichas.length > 0 ? (
          filteredFichas.map((ficha) => (
            <div key={ficha.codigo} className={classes.fichaComponent}> 
              <FichaBasica 
                ficha={ficha}
                onUpdate={handleUpdateFicha}
                onDelete={handleDeleteFicha}
                coordinadores={coordinadores}
                gestores={instructores}
                programas={programas}
                municipios={municipios}
              />
            </div>
          ))
        ) : (
          <p>No se encontraron fichas</p>
        )}
      </div>
    </div>
    </>
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
    border: `1px solid #5eb219`,
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#ffffff',
  },
}));

export default GestionFichas;
