import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, Select, MenuItem, Grid2, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux'; 
import { selectUserPermisos } from '../features/userSlice'; 
import { getNumeroAsignaciones } from '../service/asignacionService'
import { useNavigate } from 'react-router-dom';

const FichaProgramacion = ({ ficha, asignaciones, instructores, jornadas, onInstructorChange, startDateFilter, endDateFilter }) => {
    const classes = useStyles();
    const navigate = useNavigate(); 
    const [filteredAsignaciones, setFilteredAsignaciones] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [newInstructor, setNewInstructor] = useState({});
    const [startDate, setStartDate] = useState(startDateFilter || '');
    const [endDate, setEndDate] = useState(endDateFilter || '');
    const [jornadasVisibles, setJornadasVisibles] = useState({}); 
    const [asignacionesPorInstructor, setAsignacionesPorInstructor] = useState({}); 
    const [reloadKey, setReloadKey] = useState(0); 

    const permisosUsuario = useSelector(selectUserPermisos);
    const tienePermisoEdicion = permisosUsuario.editProgramacion;

    useEffect(() => {
        const startDate = startDateFilter ? new Date(startDateFilter) : null;
        const endDate = endDateFilter ? new Date(endDateFilter) : null;

        const filtered = asignaciones.filter((asignacion) => {
            const asignacionInicio = new Date(asignacion.inicio);
            const asignacionFin = new Date(asignacion.fin);

            const intersects =
                (!startDate || asignacionFin >= startDate) &&
                (!endDate || asignacionInicio <= endDate);

            return asignacion.ficha === ficha.codigo && intersects;
        });

        setFilteredAsignaciones(filtered);
    }, [asignaciones, ficha.codigo, startDateFilter, endDateFilter]);

    useEffect(() => {
        const initialSelectedInstructors = {};
        
        jornadas.forEach((jornada) => {
            ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'].forEach((day) => {
                const instructor = getInstructorForDay(jornada.nombre, day);
                if (instructor) {
                    initialSelectedInstructors[`${jornada.nombre}-${day}`] = instructor;
                }
            });
        });
    
        setSelectedInstructors(initialSelectedInstructors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredAsignaciones, jornadas]);
    

    const fetchAsignacionesForInstructor = async (instructor) => {
        try {
            const fechaInicio = startDateFilter;
            const fechaFin = endDateFilter;
            const result = await getNumeroAsignaciones(instructor, fechaInicio, fechaFin);
            setAsignacionesPorInstructor(prev => ({
                ...prev,
                [instructor]: result.numeroAsignaciones
            }));
        } catch (error) {
            console.error('Error al obtener asignaciones del instructor:', error);
        }
    };

    const handleInstructorHover = async (instructor) => {
        if(instructor || instructor !== ""){
            await fetchAsignacionesForInstructor(instructor);
        }
    };

    const getInstructorForDay = (jornadaNombre, day) => {
        const asignacion = filteredAsignaciones.find((asig) =>
            asig.jornada === jornadaNombre && asig.dia === day
        );
        return asignacion ? asignacion.instructor : '';
    };

    const jornadaTieneInstructor = (jornadaNombre) => {
        return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'].some((day) => {
            return getInstructorForDay(jornadaNombre, day) !== '';
        });
    };

    useEffect(() => {
        const visibilidadInicial = {};
        jornadas.forEach((jornada) => {
            visibilidadInicial[jornada.nombre] = jornadaTieneInstructor(jornada.nombre);
        });
        setJornadasVisibles(visibilidadInicial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredAsignaciones, jornadas]);

    const handleInstructorChangeChild = (jornadaNombre, day, event, asignacion) => {
        const selectedInstructor = event.target.value;
        
        const inicio = asignacion ? asignacion.inicio : '';
        const fin = asignacion ? asignacion.fin : '';
    
        setSelectedInstructors((prev) => ({
            ...prev,
            [`${jornadaNombre}-${day}`]: selectedInstructor,
        }));
    
        setNewInstructor({
            ficha: ficha.codigo,
            dia: day,
            jornada: jornadaNombre,
            instructor: selectedInstructor,
            inicio: inicio,
            fin: fin
        });
    
        setOpenModal(true); 
    };
    
    const handleConfirm = () => {
        if (newInstructor.instructor === "" || newInstructor.instructor === undefined) {
            onInstructorChange({
                ficha: newInstructor.ficha,
                dia: newInstructor.dia,
                jornada: newInstructor.jornada,
                instructor: "", 
                inicio: newInstructor.inicio,
                fin: newInstructor.fin,
            });
        } else {
            onInstructorChange({ 
                ...newInstructor, 
                inicio: startDate, 
                fin: endDate 
            });
        }
    
        setOpenModal(false);
        setReloadKey(prevKey => prevKey + 1);  
    };
    
    const handleCancel = () => {
        setOpenModal(false);
        setReloadKey(prevKey => prevKey + 1);
    };

    const handleCheckboxChange = (jornadaNombre, event) => {
        setJornadasVisibles(prevState => ({
            ...prevState,
            [jornadaNombre]: event.target.checked
        }));
    };

    const abrirConsulta = () => {
        navigate('/consultar-ficha', { 
          state: { ficha } 
        });
      };

      return (
        <div key={reloadKey} className={classes.container}>
            <Grid2 container spacing={2}>
                <Grid2 item xs={3}>
                    <Typography variant="p" className={classes.fichaCodigo}>
                        {ficha.codigo} 
                    </Typography>
                    <Button className={classes.calendarButton} onClick={abrirConsulta}>
                        Ver en Calendario
                    </Button>
                    <Grid2 container spacing={1}>
                            {jornadas.map((jornada) => (
                                <FormControlLabel
                                    key={jornada.id}
                                    control={
                                        <Checkbox
                                            checked={jornadasVisibles[jornada.nombre] !== undefined ? jornadasVisibles[jornada.nombre] : true}
                                            onChange={(e) => handleCheckboxChange(jornada.nombre, e)}
                                            name={jornada.nombre}
                                        />
                                    }
                                    label={jornada.nombre}
                                    sx={{ 
                                        '& .MuiFormControlLabel-label': { 
                                            fontSize: '0.6rem'  
                                        }
                                    }}
                                />
                            ))}
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={2} className={classes.blockedFields}>
                    <Grid2 item xs={3}>
                        <TextField
                            label="Programa"
                            value={ficha.programa || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={3}>
                        <TextField
                            label="Municipio"
                            value={ficha.municipio || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={3}>
                        <TextField
                            label="Gestor"
                            value={ficha.gestor || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid2>
                </Grid2>

                {jornadas.map((jornada) => (
                    jornadasVisibles[jornada.nombre] !== false && (
                        <Grid2 item xs={12} key={jornada.id}>
                            <Typography className={classes.jornadaLabel}>{jornada.nombre}</Typography>
                            <Grid2 container spacing={2}>
                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'].map((day) => (
                                    <Grid2 item xs={12} sm={2} key={day}>
                                        <FormControl fullWidth>
                                            <InputLabel id={`select-${jornada.nombre}-${day}`} className={classes.label}>{day}</InputLabel>
                                            <Tooltip
                                                title={
                                                    (asignacionesPorInstructor[getInstructorForDay(jornada.nombre, day)] 
                                                        ? `Asignaciones: ${asignacionesPorInstructor[getInstructorForDay(jornada.nombre, day)]} | `
                                                        : '') +
                                                    (getInstructorForDay(jornada.nombre, day) && 
                                                    filteredAsignaciones.find(asig => asig.instructor === getInstructorForDay(jornada.nombre, day))?.fin 
                                                        ? `Fin: ${new Date(filteredAsignaciones.find(asig => asig.instructor === getInstructorForDay(jornada.nombre, day))?.fin).toLocaleDateString()}`
                                                        : ''
                                                    )
                                                }
                                                enterDelay={500}
                                                leaveDelay={200}
                                                placement="top" 
                                            >
                                                <Select
                                                    labelId={`select-${jornada.nombre}-${day}`}
                                                    onChange={(event) => {
                                                        const asignacion = filteredAsignaciones.find(
                                                            (asig) => asig.jornada === jornada.nombre && asig.dia === day
                                                        );
                                                        handleInstructorChangeChild(jornada.nombre, day, event, asignacion);
                                                    }}
                                                    value={selectedInstructors[`${jornada.nombre}-${day}`] || ""}
                                                    className={classes.select}
                                                    onMouseEnter={() => handleInstructorHover(getInstructorForDay(jornada.nombre, day))}
                                                    disabled={!tienePermisoEdicion}
                                                >

                                                    <MenuItem value="">
                                                        <em>Ninguno</em>
                                                    </MenuItem>
                                                    {instructores.map((instructor) => (
                                                        <MenuItem key={instructor.documento} value={instructor.nombre}>
                                                            {instructor.nombre}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Tooltip>
                                        </FormControl>
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Grid2>
                    )
                ))}
            </Grid2>

            <Dialog open={openModal} onClose={handleCancel}>
                <DialogTitle>Confirmar Asignación</DialogTitle>
                <DialogContent>
                    {newInstructor.instructor === "" ? (
                        <DialogContentText>
                            ¿Estás seguro de que deseas quitar la asignación de esta jornada/día?
                        </DialogContentText>
                    ) : (
                        <DialogContentText>
                            Por favor, ingresa la fecha de inicio y fin para la asignación.
                        </DialogContentText>
                    )}
                    {newInstructor.instructor !== "" && (
                        <>
                            <TextField
                                label="Fecha de inicio"
                                type="date"
                                fullWidth
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                label="Fecha de fin"
                                type="date"
                                fullWidth
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        alignContent: 'center',
    },
    blockedFields: {
        margin: '16px 0',
    },
    jornadaLabel: {
        fontWeight: 'bold',
        color: '#5eb219',
        textAlign: 'center',
        marginBottom: '8px',
    },
    label: {
        textAlign: 'center',
        marginBottom: '8px',
        color: '#5eb219',
    },
    select: {
        backgroundColor: '#ffffff',
        '& .MuiSelect-select': {
            color: '#5eb219',
        },
        '& .MuiInputLabel-root': {
            color: '#5eb219',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#5eb219',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#5eb219',
            },
            '&:hover fieldset': {
                borderColor: '#5eb219',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#5eb219',
            },
        }
    },
    textField: {
        '& .MuiInputLabel-root': {
            color: '#5eb219',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#5eb219',
            },
            '&:hover fieldset': {
                borderColor: '#5eb219',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#5eb219',
            },
        },
    },
    fichaCodigo: {
        textAlign: 'center',
        color: '#5eb219',
    },
    calendarButton: {
      backgroundColor: '#5eb219', 
      color: '#fff', 
      borderRadius: '4px', 
      margin: '10px', 
      '&:hover': {
        backgroundColor: '#4a9e17', 
      },
    },
}));

export default FichaProgramacion;
