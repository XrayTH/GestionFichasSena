import Calendario from './../components/Calendario';
import PanelGestion from './../components/PanelGestion';
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import { useState } from 'react';

const Consultas = () => {
  const classes = useStyles();

  const [selectedFilter1, setSelectedFilter1] = useState('');
  const [selectedFilter2, setSelectedFilter2] = useState('');
  const [filter2Options, setFilter2Options] = useState([]);

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
    const inicio = new Date(fichaSeleccionada.inicio);
    const fin = new Date(fichaSeleccionada.fin);
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
      <Calendario events={calendarEvents} jornadas={jornadas} fichas={fichas} />
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
    margin: '20px',
  },
});

export default Consultas;