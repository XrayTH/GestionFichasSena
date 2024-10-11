import React, { useState, useEffect } from 'react';
import FichaProgramacion from '../components/FichaProgramacion';
import { Grid2, TextField, Snackbar, Alert } from '@mui/material';
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

    // Campos de fechas de filtrado
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    const [idFilter, setIdFilter] = useState('');
    const [coordinadorFilter, setCoordinadorFilter] = useState('');
    const [programaFilter, setProgramaFilter] = useState('');
    const [gestorFilter, setGestorFilter] = useState('');

    const [mensaje, setMensaje] = useState(null);

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
    }, []);

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
            if (!instructor || "") {
                const asignacionToDelete = asignaciones.find(
                    (asig) => asig.ficha === ficha && asig.dia === dia && asig.jornada === jornada && asig.inicio === inicio && asig.fin === fin
                );
                if (asignacionToDelete) {
                    console.log("viene aqui",inicio,fin)
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
            setMensaje({ text: 'Error al manejar el cambio de instructor', severity: 'error' });
        }
    };

    return (
        <>
            <Sidebar />
            <div className={classes.container}>
                <label>Filtros:</label><br /><br />
                <TextField
                    label="Buscar por codigo"
                    variant="outlined"
                    fullWidth
                    onChange={handleIdFilterChange}
                    value={idFilter}
                    className={classes.textField}
                />
                <TextField
                    label="Buscar por Coordinador"
                    variant="outlined"
                    fullWidth
                    onChange={handleCoordinadorFilterChange}
                    value={coordinadorFilter}
                    className={classes.textField}
                />
                <TextField
                    label="Buscar por Programa"
                    variant="outlined"
                    fullWidth
                    onChange={handleProgramaFilterChange}
                    value={programaFilter}
                    className={classes.textField}
                />
                <TextField
                    label="Buscar por Gestor"
                    variant="outlined"
                    fullWidth
                    onChange={handleGestorFilterChange}
                    value={gestorFilter}
                    className={classes.textField}
                />

                {/* Campos para las fechas de filtro */}
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

                <br /><br /><label>Crear Borrar o Editar Jornadas:</label><br />
                <Jornadas />

                <div className={classes.fichasContainer}>
                    {filteredFichas.map((ficha) => (
                        <div className={classes.fichaWrapper} key={ficha.codigo}>
                            <FichaProgramacion
                                ficha={ficha}
                                asignaciones={asignaciones}
                                instructores={instructores}
                                jornadas={jornadas}
                                onInstructorChange={handleInstructorChange}
                                startDateFilter={startDateFilter}  // Pasa la fecha de inicio
                                endDateFilter={endDateFilter}      // Pasa la fecha de fin
                                className={classes.ficha}
                            />
                        </div>
                    ))}
                </div>

                {/* Snackbar para mostrar mensajes de éxito o error */}
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
        margin: '16px 16px',
        backgroundColor: '#ffffff',
    },
    fichasContainer: {
        display: 'flex',  // Usamos Flexbox
        flexWrap: 'wrap',  // Permite que las fichas se ajusten en múltiples filas si es necesario
        justifyContent: 'center',  // Centra las fichas horizontalmente
        marginTop: '20px',
    },
    fichaWrapper: {
        width: 'auto',  // Las fichas ocuparán solo el espacio necesario
        margin: '10px',  // Espacio entre fichas
    },
    ficha: {
        backgroundColor: '#b2195e',
        color: '#ffffff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    },
}));



export default Programar;
