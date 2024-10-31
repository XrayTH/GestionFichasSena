/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { Button, TextField, Snackbar, Alert, CircularProgress } from '@mui/material';
import FichaBasica from '../components/FichaBasica';
import NewFichaBasica from '../components/NewFichaBasica';
import { getFichas, createFicha, updateFichaByCodigo, deleteFichaByCodigo } from '../service/fichaService';
import { getInstructores } from '../service/intructorService';
import { getCoordinadores } from '../service/coordinadorService';
import { obtenerProgramas } from '../service/programaService';
import { obtenerAmbientes } from '../service/ambienteService';
import Municipios from '../data/municipios.json';
import Sidebar from '../components/Sidebar';
import DireccionBuscador from '../components/DireccionBuscador';
import Ambientes from '../components/Ambientes';

const GestionFichas = () => {
  const [fichas, setFichas] = useState([]);
  const [municipios] = useState(Municipios.municipios);
  const [coordinadores, setCoordinadores] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewFichaForm, setShowNewFichaForm] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fichasData = await getFichas();
        setFichas(fichasData);

        const coordinadoresData = await getCoordinadores();
        setCoordinadores(coordinadoresData);

        const instructoresData = await getInstructores();
        setInstructores(instructoresData);

        const programasData = await obtenerProgramas();
        setProgramas(programasData);

        const ambientesData = await obtenerAmbientes();
        setAmbientes(ambientesData);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setMensaje({ text: error.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewFichaClick = () => setShowNewFichaForm(true);

  const handleSaveNewFicha = async (newFicha) => {
    try {
      const createdFicha = await createFicha(newFicha);
      setFichas((prevFichas) => [newFicha, ...prevFichas]);
      setShowNewFichaForm(false);
      setMensaje({ text: 'Ficha creada con éxito', severity: 'success' });
      setFichas((prevFichas) => [...prevFichas]);
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
      setFichas((prevFichas) => [...prevFichas]);
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
      setFichas((prevFichas) => [...prevFichas]);
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto auto',
      }}>
        <br/>
        <DireccionBuscador/>
        <Ambientes/>
        {mensaje && (
          <Snackbar open={Boolean(mensaje)} autoHideDuration={6000} onClose={() => setMensaje(null)}>
            <Alert onClose={() => setMensaje(null)} severity={mensaje.severity}>
              {mensaje.text}
            </Alert>
          </Snackbar>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          width: '90%'
        }}>
          <TextField
            variant="outlined"
            placeholder="Buscar por Código de Ficha, Coordinador, Programa o Ambiente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flexGrow: 1,
              marginRight: '20px',
            }}
          />

          <div style={{ textAlign: 'right' }}>
            <Button 
              variant="contained" 
              onClick={handleNewFichaClick} 
              sx={{
                backgroundColor: '#5eb219',
                '&:hover': {
                  backgroundColor: '#4cae14',
                },
              }}
            >
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
            ambientes={ambientes}
          />
        )}

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
            <CircularProgress sx={{ color: "#5eb219" }} />
          </div>
        ) : (
          <div style={{
            width: '90%',
            marginTop: '20px',
          }}>
            {filteredFichas.length > 0 ? (
              filteredFichas.map((ficha) => (
                <div key={ficha.codigo} style={{
                  marginBottom: '15px',
                  borderRadius: '5px',
                  padding: '10px',
                  backgroundColor: '#ffffff',
                }}> 
                  <FichaBasica 
                    ficha={ficha}
                    onUpdate={handleUpdateFicha}
                    onDelete={handleDeleteFicha}
                    coordinadores={coordinadores}
                    gestores={instructores}
                    programas={programas}
                    municipios={municipios}
                    ambientes={ambientes}
                  />
                </div>
              ))
            ) : (
              <p>No se encontraron fichas</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default GestionFichas;
