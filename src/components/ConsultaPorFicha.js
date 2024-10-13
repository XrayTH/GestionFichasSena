/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAsignacionesByFicha } from '../service/asignacionService';
import { Tooltip, Paper, Typography, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import 'moment/locale/es';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import html2pdf from 'html2pdf.js';
import { useSelector } from 'react-redux'; 

moment.locale('es'); 

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
  const navigate = useNavigate();
  const location = useLocation();
  const { ficha } = location.state || {};
  const classes = useStyles();
  const localizer = momentLocalizer(moment);
  const [asignaciones, setAsignaciones] = useState([]);
  const [jornadaColors, setJornadaColors] = useState({});
  const [pdf, setPdf] = useState(null);

  // Obtener permisos del usuario desde el estado de Redux
  const permisosUsuario = useSelector((state) => state.user.usuario.permisos);

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const response = await getAsignacionesByFicha(ficha.codigo);
        const formattedAsignaciones = [];
        const colorsMap = {};

        response.forEach((asignacion) => {
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
                asignacionInicio: asignacion.inicio,
                asignacionFin: asignacion.fin,
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
          <Typography variant="body2">Inicio: {moment(event.asignacionInicio).format('LL')}</Typography>
          <Typography variant="body2">Fin: {moment(event.asignacionFin).format('LL')}</Typography>
        </Paper>
      }
      arrow
    >
      <span>{event.title}</span>
    </Tooltip>
  );

  const handleRegresar = () => {
    navigate(-1); 
  };

  const handleCaptureToPDF = () => {
    const element = document.getElementById('calendarContainer');

    const opt = {
        margin: 0.5,
        filename: 'calendarioFicha.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
        setPdf(pdf);

        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url);

        navigate('/enviar-email', {
            state: { pdf: blob }
        });
    });
  };

  return (
    <>      
    <Sidebar/>
    <div className={classes.calendarContainer} id="calendarContainer">
      <Box className={classes.flexContainer}>
        <Box className={classes.infoContainer}>
          <Button onClick={handleRegresar}>Volver</Button>
          <Typography variant="body2">Ficha: {ficha.codigo}</Typography>
          <Typography variant="body2">Coordinador: {ficha.coordinador}</Typography>
          <Typography variant="body2">Programa: {ficha.programa}</Typography>
          <Typography variant="body2">Gestor: {ficha.gestor}</Typography>
          <Typography variant="body2">Ambiente: {ficha.ambiente}</Typography>
          <Typography variant="body2">Municipio: {ficha.municipio}</Typography>
          <Typography variant="body2">Inicio: {ficha.inicio}</Typography>
          <Typography variant="body2">Fin: {ficha.fin}</Typography>
        </Box>

        <Box className={classes.legendContainer}>
          <Box className={classes.legendItems}>
            {Object.entries(jornadaColors).map(([jornada, color]) => (
              <Box key={jornada} className={classes.legendItem}>
                <Box style={{ backgroundColor: color, width: '10px', height: '20px', borderRadius: '4px', marginRight: '5px' }}></Box>
                <Typography variant="body2" className={classes.legendText}>{jornada}</Typography>
              </Box>
            ))}
          </Box>
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
        views={['month']}
        popup
        messages={{
          allDay: 'Todo el día',
          previous: 'Atrás',
          next: 'Siguiente',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'No hay eventos en este rango.',
          showMore: (total) => `+ Ver más (${total})`,
        }}
      />

      {permisosUsuario.email && ( 
        <Button
          variant="contained"
          color="primary"
          onClick={handleCaptureToPDF}
          style={{ marginTop: '20px' }}
        >
          Enviar por correo
        </Button>
      )}
    </div>
    </>
  );
};

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  legendContainer: {
    padding: '5px',
    marginRight: '20px',
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
    marginBottom: '3px',
  },
  legendText: {
    fontSize: '12px',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '12px',
  },
  tooltip: {
    maxWidth: 250,
    fontSize: '12px',
  },
  calendarContainer: {
    height: '100vh',
    overflowY: 'auto',
  },
}));

export default ConsultaPorFicha;
