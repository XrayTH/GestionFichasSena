import React, { useState, useEffect } from 'react';
import FichaProgramacion from '../components/FichaProgramacion';
import { TextField, Snackbar, Alert, Grid } from '@mui/material'; 
import { makeStyles } from '@mui/styles';
import { getFichas } from '../service/fichaService';
import { getJornadas } from '../service/jornadaService';
import { getInstructores } from '../service/intructorService';
import { getAllAsignaciones, createAsignacion, deleteAsignacionById, updateAsignacionById } from '../service/asignacionService';
import Jornadas from '../components/Jornadas';
import Sidebar from './../components/Sidebar';
import { getStartOfMonth, getEndOfMonth } from '../utils/date'

const Programar = () => {
    const classes = useStyles();

    const [fichas, setFichas] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);
    const [instructores, setInstructores] = useState([]);
    const [jornadas, setJornadas] = useState([]);

    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    const [idFilter, setIdFilter] = useState('');
    const [coordinadorFilter, setCoordinadorFilter] = useState('');
    const [programaFilter, setProgramaFilter] = useState('');
    const [gestorFilter, setGestorFilter] = useState('');

    const [mensaje, setMensaje] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fichasData = await getFichas();
                const asignacionesData = await getAllAsignaciones();
                const instructoresData = await getInstructores();
                const jornadasData = await getJornadas();
    
                setFichas(fichasData);
                setAsignaciones(asignacionesData);
                setInstructores(instructoresData);
                setJornadas(jornadasData);
            } catch (error) {
                setMensaje({ text: 'Error al cargar los datos', severity: 'error' });
            }
        };
    
        fetchData();
    }, [reload]);

    useEffect(() => {
        setStartDateFilter(getStartOfMonth());
        setEndDateFilter(getEndOfMonth());
      }, []);

    const filteredFichas = fichas.filter(ficha => {
        const hasActiveFilters = idFilter || coordinadorFilter || programaFilter || gestorFilter;

        if (!hasActiveFilters) {
            return true;
        }

        const matchesId = idFilter ? ficha.codigo?.toString().includes(idFilter.toString()) : true;
        const matchesCoordinador = coordinadorFilter ? ficha.coordinador?.toLowerCase().includes(coordinadorFilter.toLowerCase()) : true;
        const matchesPrograma = programaFilter ? ficha.programa?.toLowerCase().includes(programaFilter.toLowerCase()) : true;
        const matchesGestor = gestorFilter ? ficha.gestor?.toLowerCase().includes(gestorFilter.toLowerCase()) : true;

        return matchesId && matchesCoordinador && matchesPrograma && matchesGestor;
    });

    const handleIdFilterChange = (event) => {
        setIdFilter(event.target.value);
    };

    const handleCoordinadorFilterChange = (event) => {
        setCoordinadorFilter(event.target.value);
    };

    const handleProgramaFilterChange = (event) => {
        setProgramaFilter(event.target.value);
    };

    const handleGestorFilterChange = (event) => {
        setGestorFilter(event.target.value);
    };

    const handleInstructorChange = async ({ ficha, dia, jornada, instructor, inicio, fin }) => {
        try {
            if (!instructor || instructor === "") {
                const asignacionToDelete = asignaciones.find(
                    (asig) => asig.ficha === ficha && asig.dia === dia && asig.jornada === jornada && asig.inicio === inicio && asig.fin === fin
                );
                if (asignacionToDelete) {
                    console.log("Eliminando asignación", inicio, fin);
                    await deleteAsignacionById(asignacionToDelete.id);
                    setAsignaciones((prev) => prev.filter((asig) => asig.id !== asignacionToDelete.id));
                    setMensaje({ text: 'Asignación eliminada con éxito', severity: 'success' });
                }
            } else {
                const asignacionExistente = asignaciones.find(
                    (asig) =>
                        asig.ficha === ficha &&
                        asig.dia === dia &&
                        asig.jornada === jornada &&
                        (asig.inicio === inicio || (asig.inicio <= fin && asig.fin >= inicio))
                );
    
                if (asignacionExistente) {
                    await updateAsignacionById(asignacionExistente.id, { ...asignacionExistente, instructor, fin });
                    setAsignaciones((prev) =>
                        prev.map((asig) => (asig.id === asignacionExistente.id ? { ...asig, instructor, fin } : asig))
                    );
                    setMensaje({ text: 'Asignación actualizada con éxito', severity: 'success' });
                } else {
                    const nuevaAsignacion = {
                        ficha,
                        dia,
                        jornada,
                        instructor,
                        inicio,
                        fin,
                        id: asignaciones.length + 1,
                    };
                    const createdAsignacion = await createAsignacion(nuevaAsignacion);
                    setAsignaciones((prev) => [...prev, createdAsignacion]);
                    setMensaje({ text: 'Asignación creada con éxito', severity: 'success' });
                }
            }
        } catch (error) {
            console.error('Error capturado:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setMensaje({ text: `Error: ${error.response.data.error}`, severity: 'error' });
            } else {
                setMensaje({ text: `Error inesperado: ${error.message}`, severity: 'error' });
            }
    
            setReload((prev) => !prev);
        }
    };
    
    

    return (
        <>
            <Sidebar />
            <div className={classes.container}>
                <Grid container spacing={2} className={classes.filtrosContainer}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Buscar por codigo"
                            variant="outlined"
                            fullWidth
                            onChange={handleIdFilterChange}
                            value={idFilter}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Buscar por Coordinador"
                            variant="outlined"
                            fullWidth
                            onChange={handleCoordinadorFilterChange}
                            value={coordinadorFilter}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Buscar por Programa"
                            variant="outlined"
                            fullWidth
                            onChange={handleProgramaFilterChange}
                            value={programaFilter}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Buscar por Gestor"
                            variant="outlined"
                            fullWidth
                            onChange={handleGestorFilterChange}
                            value={gestorFilter}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Fecha de inicio"
                            type="date"
                            value={startDateFilter}
                            onChange={(e) => setStartDateFilter(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Fecha de fin"
                            type="date"
                            value={endDateFilter}
                            onChange={(e) => setEndDateFilter(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Jornadas />
                    </Grid>
                </Grid>

                <div className={classes.fichasContainer}>
                    {filteredFichas.map((ficha) => (
                        <div className={classes.fichaWrapper} key={ficha.codigo}>
                            <FichaProgramacion
                                ficha={ficha}
                                asignaciones={asignaciones}
                                instructores={instructores}
                                jornadas={jornadas}
                                onInstructorChange={handleInstructorChange}
                                startDateFilter={startDateFilter}  
                                endDateFilter={endDateFilter}      
                                className={classes.ficha}
                            />
                        </div>
                    ))}
                </div>

                {mensaje && (
                    <Snackbar
                        open={Boolean(mensaje)}
                        autoHideDuration={6000}
                        onClose={() => setMensaje(null)}
                    >
                        <Alert onClose={() => setMensaje(null)} severity={mensaje.severity} sx={{ width: '100%' }}>
                            {mensaje.text}
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '10px 20px',
    },
    textField: {
        margin: '8px 0',
        backgroundColor: '#ffffff',
    },
    fichasContainer: {
        marginTop: '20px',
    },
    fichaWrapper: {
        width: 'auto',
        margin: '10px',
    },
    ficha: {
        backgroundColor: '#b2195e',
        color: '#ffffff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    },
    filtrosContainer: {
        marginBottom: '20px',
    },
}));

export default Programar;
