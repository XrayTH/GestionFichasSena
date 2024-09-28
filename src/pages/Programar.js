import React, { useState } from 'react';
import FichaProgramacion from '../components/FichaProgramacion';
import { Grid } from '@mui/material';

function Programar() {
    const [fichas, setFichas] = useState([
        { id: 1, coordinador: 'Juan Perez', gestor: 'Diego Torres', programa: 'Programación', ambiente: 'Laboratorio 101', inicio: '2024-10-01', fin: '2024-12-15', requerimientos: 'Proyector, PC con software especializado' },
        { id: 2, coordinador: 'Maria Gómez', gestor: 'Ana Martínez', programa: 'Diseño Gráfico', ambiente: 'Laboratorio 202', inicio: '2024-09-01', fin: '2024-11-30', requerimientos: 'Mesa de trabajo, iMac' },
        { id: 3, coordinador: 'Carlos Rodriguez', gestor: 'Luis Fernández', programa: 'Redes', ambiente: 'Laboratorio 303', inicio: '2024-08-15', fin: '2024-12-01', requerimientos: 'Router, Switch' },
        { id: 4, coordinador: 'Lucía López', gestor: 'Diego Torres', programa: 'Marketing', ambiente: 'Laboratorio 404', inicio: '2024-09-15', fin: '2024-12-01', requerimientos: 'Proyector, Computadora' },
    ]);
    
    const [jornadas, setJornadas] = useState([
        { id: 1, ficha: 1, dia: "Lunes", jornada: "Mañana", instructor: "Luis Fernandez" },
        { id: 2, ficha: 2, dia: "Martes", jornada: "Tarde", instructor: "Ana Martínez" },
        { id: 3, ficha: 3, dia: "Miércoles", jornada: "Noche", instructor: "Luis Fernández" },
        { id: 4, ficha: 4, dia: "Jueves", jornada: "Mañana", instructor: "Diego Torres" },
        { id: 5, ficha: 2, dia: "Viernes", jornada: "Tarde", instructor: "Ana Martínez" }
    ]);

    const [Instructores, setInstructores] = useState([
        "Diego Torres", 'Ana Martínez', 'Luis Fernández'
    ]);

    const schedule = fichas.map(ficha => {
        const fichaJornadas = {
            id: ficha.id,
            coordinador: ficha.coordinador,
            gestor: ficha.gestor,
            programa: ficha.programa,
            Lunes_mañana: null,
            Lunes_tarde: null,
            Lunes_noche: null,
            Martes_mañana: null,
            Martes_tarde: null,
            Martes_noche: null,
            Miércoles_mañana: null,
            Miércoles_tarde: null,
            Miércoles_noche: null,
            Jueves_mañana: null,
            Jueves_tarde: null,
            Jueves_noche: null,
            Viernes_mañana: null,
            Viernes_tarde: null,
            Viernes_noche: null,
        };

        jornadas.forEach(jornada => {
            if (jornada.ficha === ficha.id) {
                const key = `${jornada.dia}_${jornada.jornada}`;
                fichaJornadas[key] = jornada.instructor;
            }
        });

        return fichaJornadas;
    });

    // Maneja el cambio en el dropdown
    const handleInstructorChange = (fichaId, dia, jornada, instructor) => {
        setJornadas((prevJornadas) => {
            return prevJornadas.map(jornadaItem => {
                if (jornadaItem.ficha === fichaId && jornadaItem.dia === dia && jornadaItem.jornada === jornada) {
                    return { ...jornadaItem, instructor }; // Actualiza el instructor
                }
                return jornadaItem;
            });
        });
    };

    return (
        <div>
            <Grid container spacing={2}>
                {schedule.map((ficha) => (
                    <Grid item xs={12} key={ficha.id}>
                        <FichaProgramacion
                            ficha={ficha}
                            instructores={Instructores}
                            onInstructorChange={handleInstructorChange}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Programar;



