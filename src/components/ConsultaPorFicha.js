import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAsignacionesByFicha } from '../service/asignacionService';
import { Tooltip, Paper, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';

const daysMap = {
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
  Domingo: 0,
};

const colorScale = [
  '#FFFF00',
  '#FFD700',
  '#FF4500',
  '#FF0000',
  '#8B0000',
  '#0000FF',
  '#00008B',
];

const ConsultaPorFicha = () => {
  const location = useLocation();
  const { ficha } = location.state || {};
  const classes = useStyles();
  const localizer = momentLocalizer(moment);
  const [asignaciones, setAsignaciones] = useState([]);
  const [jornadaColors, setJornadaColors] = useState({});

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const response = await getAsignacionesByFicha(ficha.codigo);
        const formattedAsignaciones = [];
        const colorsMap = {};

        response.forEach((asignacion, index) => {
          const start = moment(asignacion.inicio);
          const end = moment(asignacion.fin);
          const dayOfWeek = daysMap[asignacion.dia];

          if (!colorsMap[asignacion.jornada]) {
            const colorIndex = Object.keys(colorsMap).length % colorScale.length;
            colorsMap[asignacion.jornada] = colorScale[colorIndex];
          }

          let currentDate = moment(start);
          while (currentDate.isSameOrBefore(end)) {
            if (currentDate.day() === dayOfWeek) {
              formattedAsignaciones.push({
                title: asignacion.instructor,
                start: currentDate.toDate(),
                end: currentDate.toDate(),
                jornada: asignacion.jornada,
                color: colorsMap[asignacion.jornada],
              });
            }
            currentDate.add(1, 'days');
          }
        });

        setAsignaciones(formattedAsignaciones);
        setJornadaColors(colorsMap);
      } catch (error) {
        console.error('Error al cargar las asignaciones', error);
      }
    };
    fetchAsignaciones();
  }, [ficha]);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        color: '#ffffff',
        padding: '5px',
        borderRadius: '4px',
        cursor: 'pointer',
      },
    };
  };

  const EventComponent = ({ event }) => (
    <Tooltip
      title={
        <Paper className={classes.tooltip}>
          <Typography variant="body2">Instructor: {event.title}</Typography>
          <Typography variant="body2">Jornada: {event.jornada}</Typography>
          <Typography variant="body2">Inicio: {moment(event.start).format('LL')}</Typography>
          <Typography variant="body2">Fin: {moment(event.end).format('LL')}</Typography>
        </Paper>
      }
      arrow
    >
      <span>{event.title}</span>
    </Tooltip>
  );

  return (
    <div className={classes.calendarContainer}>
      <Box className={classes.legendContainer}>
        <Box className={classes.legendItems}>
          {Object.entries(jornadaColors).map(([jornada, color]) => (
            <Box key={jornada} className={classes.legendItem}>
              <Box style={{ backgroundColor: color, width: '10px', height: '20px', borderRadius: '4px', marginRight: '10px' }}></Box>
              <Typography variant="body2">{jornada}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Calendar
        localizer={localizer}
        events={asignaciones}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventComponent,
        }}
        views={['month', 'week', 'day']}
        popup
      />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  eventStyle: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    padding: '5px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  tooltip: {
    maxWidth: 250,
    fontSize: '14px',
  },
  calendarContainer: {
    height: '100vh',
    overflowY: 'auto',
  },
  legendContainer: {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  legendItems: {
    display: 'flex',
    flexDirection: 'column',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
}));

export default ConsultaPorFicha;
