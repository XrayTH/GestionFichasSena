import React, { useState } from 'react';
import FichaProgramacion from '../components/FichaProgramacion';
import { Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Programar = () => {
    const classes = useStyles();

    const [fichas, setFichas] = useState([
        { id: 1, coordinador: 'Juan Perez', gestor: 'Diego Torres', programa: 'Programación', ambiente: 'Laboratorio 101', inicio: '2024-10-01', fin: '2024-12-15', requerimientos: 'Proyector, PC con software especializado' },
        { id: 2, coordinador: 'Maria Gómez', gestor: 'Ana Martínez', programa: 'Diseño Gráfico', ambiente: 'Laboratorio 202', inicio: '2024-09-01', fin: '2024-11-30', requerimientos: 'Mesa de trabajo, iMac' },
        { id: 3, coordinador: 'Carlos Rodriguez', gestor: 'Luis Fernández', programa: 'Redes', ambiente: 'Laboratorio 303', inicio: '2024-08-15', fin: '2024-12-01', requerimientos: 'Router, Switch' },
        { id: 4, coordinador: 'Lucía López', gestor: 'Diego Torres', programa: 'Marketing', ambiente: 'Laboratorio 404', inicio: '2024-09-15', fin: '2024-12-01', requerimientos: 'Proyector, Computadora' },
    ]);

    const [jornadas, setJornadas] = useState([
        { id: 1, ficha: 1, dia: "Lunes", jornada: "Mañana", instructor: "Luis Fernández" },
        { id: 2, ficha: 2, dia: "Martes", jornada: "Tarde", instructor: "Ana Martínez" },
        { id: 3, ficha: 3, dia: "Miércoles", jornada: "Noche", instructor: "Luis Fernández" },
        { id: 4, ficha: 4, dia: "Jueves", jornada: "Mañana", instructor: "Diego Torres" },
        { id: 5, ficha: 2, dia: "Viernes", jornada: "Tarde", instructor: "Ana Martínez" }
    ]);

    const [Instructores, setInstructores] = useState([
        "Diego Torres", 'Ana Martínez', 'Luis Fernández'
    ]);

    const [filter, setFilter] = useState('');

    const schedule = fichas.map(ficha => {
        const fichaJornadas = {
            id: ficha.id,
            coordinador: ficha.coordinador,
            gestor: ficha.gestor,
            programa: ficha.programa,
            lunes_mañana: null,
            lunes_tarde: null,
            lunes_noche: null,
            martes_mañana: null,
            martes_tarde: null,
            martes_noche: null,
            miércoles_mañana: null,
            miércoles_tarde: null,
            miércoles_noche: null,
            jueves_mañana: null,
            jueves_tarde: null,
            jueves_noche: null,
            viernes_mañana: null,
            viernes_tarde: null,
            viernes_noche: null,
        };

        jornadas.forEach(jornada => {
            if (jornada.ficha === ficha.id) {
                const key = `${jornada.dia.toLowerCase()}_${jornada.jornada.toLowerCase()}`;
                if (key in fichaJornadas) {
                    fichaJornadas[key] = jornada.instructor;
                }
            }
        });

        return fichaJornadas;
    });

    const filteredFichas = schedule.filter(ficha => 
        ficha.id.toString().includes(filter) ||
        ficha.coordinador.toLowerCase().includes(filter.toLowerCase()) ||
        ficha.programa.toLowerCase().includes(filter.toLowerCase()) ||
        ficha.gestor.toLowerCase().includes(filter.toLowerCase())
    );

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleInstructorChange = (fichaId, dia, jornada, instructor) => {
        setJornadas((prevJornadas) => {
            // Verifica si la jornada ya existe
            const existingJornadaIndex = prevJornadas.findIndex(
                (jornadaItem) => 
                    jornadaItem.ficha === fichaId && 
                    jornadaItem.dia === dia && 
                    jornadaItem.jornada === jornada
            );
    
            if (existingJornadaIndex !== -1) {
                // Si existe, actualiza la jornada
                return prevJornadas.map((jornadaItem, index) => {
                    if (index === existingJornadaIndex) {
                        return { ...jornadaItem, instructor }; // Actualiza el instructor
                    }
                    return jornadaItem; // Devuelve el item sin cambios
                });
            } else {
                // Si no existe, agrega una nueva jornada
                const newJornada = {
                    id: prevJornadas.length + 1, // O una lógica para generar IDs únicos
                    ficha: fichaId,
                    dia,
                    jornada,
                    instructor,
                };
                return [...prevJornadas, newJornada]; // Agrega la nueva jornada al array
            }
        });
    };    

    return (
        <div className={classes.container}>
            <TextField
                label="Buscar por ID, Coordinador, Programa o Gestor"
                variant="outlined"
                fullWidth
                onChange={handleFilterChange}
                value={filter}
                className={classes.textField}
            />
            <Grid container spacing={2}>
                {filteredFichas.map((ficha) => (
                    <Grid item xs={12} key={ficha.id}>
                        <FichaProgramacion
                            ficha={ficha}
                            instructores={Instructores}
                            onInstructorChange={handleInstructorChange}
                            className={classes.ficha}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '10 20px', // Margen lateral
    },
    textField: {
        margin: '16px',
        backgroundColor: '#ffffff',
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
