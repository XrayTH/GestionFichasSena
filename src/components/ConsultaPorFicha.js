import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAsignacionesByFicha } from '../service/asignacionService';
import { Tooltip, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';

//Mapeo de dias de la semana
const daysMap = {
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
  Domingo: 0,
};

const ConsultaPorFicha = () => {
  const location = useLocation();
  const { ficha } = location.state || {};
  const classes = useStyles();
  const localizer = momentLocalizer(moment);
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const response = await getAsignacionesByFicha(ficha.codigo);
        const formattedAsignaciones = [];

        response.forEach((asignacion) => {
          const start = moment(asignacion.inicio); 
          const end = moment(asignacion.fin); 
          const dayOfWeek = daysMap[asignacion.dia];  //Dia de la semana que debe repetirse

          //Iteramos sobre el rango de fechas entre inicio y fin
          let currentDate = moment(start);
          while (currentDate.isSameOrBefore(end)) {
            //Si el dia de la semana coincide con el de la asignacion
            if (currentDate.day() === dayOfWeek) {
              formattedAsignaciones.push({
                title: asignacion.instructor,
                start: currentDate.toDate(),
                end: currentDate.toDate(),
                jornada: asignacion.jornada,
              });
            }
            currentDate.add(1, 'days');
          }
        });

        setAsignaciones(formattedAsignaciones);
      } catch (error) {
        console.error('Error al cargar las asignaciones', error);
      }
    };
    fetchAsignaciones();
  }, [ficha]);

  const eventStyleGetter = () => {
    return {
      className: classes.eventStyle,
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
    backgroundColor: '#1976d2', // Azul personalizado
    color: '#ffffff', // Texto blanco
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
}));

export default ConsultaPorFicha;
