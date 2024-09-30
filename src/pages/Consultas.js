import Calendario from './../components/Calendario';
import PanelGestion from './../components/PanelGestion';
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import PreViewFicha from './../components/PreViewFicha';

const Consultas = () => {
  const classes = useStyles();

  const [selectedFilter1, setSelectedFilter1] = useState('');
  const [selectedFilter2, setSelectedFilter2] = useState('');
  const [filter2Options, setFilter2Options] = useState([]);
  const [day, setDay] = useState(["", ""]); // fecha, dia semana

  const [fichas, setFichas] = useState([
    { id: 1, coordinador: 'Juan Perez', gestor: 'Diego Torres', programa: 'Programación', ambiente: 'Laboratorio 101', inicio: '2024-10-01', fin: '2024-12-15', requerimientos: 'Proyector, PC con software especializado' },
    { id: 2, coordinador: 'Maria Gómez', gestor: 'Ana Martínez', programa: 'Diseño Gráfico', ambiente: 'Laboratorio 202', inicio: '2024-09-01', fin: '2024-11-30', requerimientos: 'Mesa de trabajo, iMac' },
    { id: 3, coordinador: 'Carlos Rodriguez', gestor: 'Luis Fernández', programa: 'Redes', ambiente: 'Laboratorio 303', inicio: '2024-08-15', fin: '2024-12-01', requerimientos: 'Router, Switch' },
    { id: 4, coordinador: 'Lucía López', gestor: 'Diego Torres', programa: 'Marketing', ambiente: 'Laboratorio 404', inicio: '2024-09-15', fin: '2024-12-01', requerimientos: 'Proyector, Computadora' },
  ]);

  const [jornadas, setJornadas] = useState([
    { id: 1, ficha: 1, dia: "lunes", jornada: "Mañana", instructor: "Luis Fernández" },
    { id: 2, ficha: 2, dia: "martes", jornada: "Tarde", instructor: "Ana Martínez" },
    { id: 3, ficha: 3, dia: "miércoles", jornada: "Noche", instructor: "Luis Fernández" },
    { id: 4, ficha: 4, dia: "jueves", jornada: "Mañana", instructor: "Diego Torres" },
    { id: 5, ficha: 2, dia: "viernes", jornada: "Tarde", instructor: "Diego Torres" },
    { id: 6, ficha: 1, dia: "lunes", jornada: "Noche", instructor: "Ana Martínez" },
  ]);

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [fichasConJornadas, setFichasConJornadas] = useState([]);

  // Función para combinar fichas y jornadas
  const combinarFichasYJornadas = () => {
    const nuevasFichasConJornadas = fichas.map(ficha => {
      const jornadasPorFicha = jornadas.filter(jornada => jornada.ficha === ficha.id);
      const jornadaPorDia = {};
      
      jornadasPorFicha.forEach(jornada => {
        const diaSemana = `${jornada.dia}_${jornada.jornada.toLowerCase()}`;
        jornadaPorDia[diaSemana] = jornada.instructor;
      });

      return {
        id: ficha.id,
        coordinador: ficha.coordinador,
        gestor: ficha.gestor,
        programa: ficha.programa,
        inicio: ficha.inicio,
        fin: ficha.fin,
        lunes_mañana: jornadaPorDia['lunes_mañana'] || null,
        lunes_tarde: jornadaPorDia['lunes_tarde'] || null,
        lunes_noche: jornadaPorDia['lunes_noche'] || null,
        martes_mañana: jornadaPorDia['martes_mañana'] || null,
        martes_tarde: jornadaPorDia['martes_tarde'] || null,
        martes_noche: jornadaPorDia['martes_noche'] || null,
        miércoles_mañana: jornadaPorDia['miércoles_mañana'] || null,
        miércoles_tarde: jornadaPorDia['miércoles_tarde'] || null,
        miércoles_noche: jornadaPorDia['miércoles_noche'] || null,
        jueves_mañana: jornadaPorDia['jueves_mañana'] || null,
        jueves_tarde: jornadaPorDia['jueves_tarde'] || null,
        jueves_noche: jornadaPorDia['jueves_noche'] || null,
        viernes_mañana: jornadaPorDia['viernes_mañana'] || null,
        viernes_tarde: jornadaPorDia['viernes_tarde'] || null,
        viernes_noche: jornadaPorDia['viernes_noche'] || null,
      };
    });

    setFichasConJornadas(nuevasFichasConJornadas);
  };

  useEffect(() => {
    combinarFichasYJornadas();
  }, [fichas, jornadas]); // Se ejecuta cuando cambian fichas o jornadas

  const handleFilter1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter1(selectedValue);

    if (selectedValue === 'Ficha') {
      setFilter2Options(fichas.map(ficha => ficha.id)); 
    } else {
      setFilter2Options([]);
    }
  };

  const handleFilter2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter2(selectedValue);

    // Obtener los datos de la ficha seleccionada
    const fichaId = parseInt(selectedValue);
    const fichaSeleccionada = fichas.find(ficha => ficha.id === fichaId);
    
    // Definir fechas de inicio y fin
    const inicio = new Date(new Date(fichaSeleccionada.inicio).setDate(new Date(fichaSeleccionada.inicio).getDate() + 1));
    const fin = new Date(new Date(fichaSeleccionada.fin).setDate(new Date(fichaSeleccionada.fin).getDate() + 1));
    const eventos = [];

    // Generar eventos para cada día de lunes a viernes
    let fechaActual = new Date(inicio);
    while (fechaActual <= fin) {
      const diaSemana = fechaActual.getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
      if (diaSemana >= 1 && diaSemana <= 5) { // Lunes a Viernes
        eventos.push({
          title: `Ficha ${selectedValue}`,
          start: new Date(fechaActual),
          end: new Date(fechaActual),
          allDay: true,
        });
      }
      fechaActual.setDate(fechaActual.getDate() + 1); // Avanzar un día
    }

    setCalendarEvents(eventos);
  };

  const handleDayClick = (fecha, diaSemana) => {
    // Verificar si hay una ficha seleccionada
    if (selectedFilter2 && fichasConJornadas.length > 0) {
      // Cambiar el estado de day
      setDay([fecha, diaSemana]);
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.panel}>
        <PanelGestion />
        <div className={classes.filtros}>
          <label className={classes.label}>Filtrar por:</label>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter1-label">Tabla</InputLabel>
            <Select
              labelId="filter1-label"
              value={selectedFilter1}
              onChange={handleFilter1Change}
            >
              <MenuItem value="Ficha">Ficha</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter2-label">Elemento</InputLabel>
            <Select labelId="filter2-label" onChange={handleFilter2Change}>
              {filter2Options.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>

      <div className={classes.content}>
        {day[0] !== "" && selectedFilter1 === "Ficha" ? (
          fichasConJornadas
            .filter(ficha => {
              const fechaInicio = new Date(ficha.inicio);
              const fechaFin = new Date(ficha.fin);
              const fechaSeleccionada = new Date(day[0]); // Usar la fecha en day[0]

              // Verificar si la fecha seleccionada está dentro del rango de fechas de la ficha
              return fechaSeleccionada >= fechaInicio && fechaSeleccionada <= fechaFin;
            })
            .map(ficha => (
              <PreViewFicha
                key={ficha.id}
                ficha={ficha}
                selectedDay={day[1]}
                inDay={ficha.id === parseInt(selectedFilter2)} // Verificar si coincide el ID con selectedFilter2
              />
            ))
        ) : (
          <Calendario
            events={calendarEvents}
            jornadas={jornadas}
            fichas={fichasConJornadas}
            onDayClick={handleDayClick}
          />
        )}
      </div>



      <Button variant="contained" className={classes.enviarButton}>
        Enviar por correo
      </Button>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    position: 'relative',
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: '20px',
    gap: '20px',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  filtros: {
    flex: '1 1 60%',
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '8px',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: '10px',
  },
  content: {
    flex: '1 1 40%',
    minWidth: '80%',
  },
  enviarButton: {
    marginTop: '20px',
  },
});

export default Consultas;
