/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAsignacionesByInstructor } from '../service/asignacionService';
import { getFichaByCodigo } from '../service/fichaService';
import { obtenerProgramaPorNombre } from '../service/programaService';
import { Tooltip, Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import 'moment/locale/es';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import html2pdf from 'html2pdf.js';
import { useSelector } from 'react-redux';
import { selectUserPermisos } from '../features/userSlice';

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
  '#F6EB61', 
  '#F39C12', 
  '#D35400', 
  '#E74C3C', 
  '#C0392B', 
  '#3498DB', 
  '#2980B9', 
  '#2C3E50', 
];

const ConsultaPorInstructor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { instructorActual: instructor } = location.state || {};
  const classes = useStyles();
  const localizer = momentLocalizer(moment);
  const [asignaciones, setAsignaciones] = useState([]);
  const [jornadaColors, setJornadaColors] = useState({});
  const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const permisos = useSelector(selectUserPermisos);  
  const dynamicHeight = asignaciones.length * 4 + 100

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const response = await getAsignacionesByInstructor(instructor.nombre);
        const formattedAsignaciones = [];
        const colorsMap = {};

        for (const asignacion of response) {
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

              const fichaData = await getFichaByCodigo(asignacion.ficha);
              const programaData = await obtenerProgramaPorNombre(fichaData.programa);

              formattedAsignaciones.push({
                title: asignacion.ficha+"/"+programaData.nombreCorto+"/"+fichaData.municipio,
                subtitle: fichaData.programa,
                ficha: asignacion.ficha,
                municipio: fichaData.municipio,
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
        }

        setAsignaciones(formattedAsignaciones);
        setJornadaColors(colorsMap);
      } catch (error) {
        console.error('Error al cargar las asignaciones', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAsignaciones();
  }, [instructor]);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      color: '#ffffff',
      padding: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  });

  const EventComponent = ({ event }) => (
    <Tooltip
      title={
        <Paper className={classes.tooltip}>
          <Typography variant="body2">Ficha: {event.ficha}</Typography>
          <Typography variant="body2">Programa: {event.subtitle}</Typography>
          <Typography variant="body2">Municipio: {event.municipio}</Typography>
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

    const originalHeight = element.style.height;
    element.style.height = 'auto'; 

    const opt = {
        margin: 0.1,
        filename: `calendarioInstructor${instructor.nombre}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            setPdf(pdf);

            const blob = pdf.output('blob');
            const url = URL.createObjectURL(blob);
            window.open(url);

            navigate('/enviar-email', {
                state: { pdf: blob }
            });
        })
        .finally(() => {
            element.style.height = originalHeight; 
        });
  };

  if (!instructor) {
    return <div>Error: No se ha proporcionado un instructor válido.</div>;
  }

  return (
    <>
      <Sidebar />
      <div className={classes.calendarContainer} id="calendarContainer">
        <Box className={classes.flexContainer}>

          <Box className={classes.infoContainer}>
            <Button onClick={handleRegresar}>Volver</Button>
            <Typography variant="body2">Instructor: {instructor.nombre}</Typography>
            <Typography variant="body2">Email: {instructor.email}</Typography>
            <Typography variant="body2">Teléfono: {instructor.telefono}</Typography>
            <Typography variant="body2">Área Temática: {instructor.areaTematica}</Typography>
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

        {isLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <CircularProgress color="primary" className={classes.load}/>
            <Typography variant="body2" mt={2}>Cargando horarios, esto puede tardar un poco...</Typography>
          </Box>
        ) : (
          <Calendar
            localizer={localizer}
            events={asignaciones}
            startAccessor="start"
            endAccessor="end"
            style={{ height: dynamicHeight > 500 ? dynamicHeight : 500 }}
            eventPropGetter={eventStyleGetter}
            components={{ event: EventComponent }}
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
        )}
      </div>

      {(permisos.email && !isLoading) && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCaptureToPDF}
          style={{ marginTop: '20px' }}
        >
          Enviar por correo
        </Button>
      )}
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
  load: {
    color: "#5eb219"
  },
}));

export default ConsultaPorInstructor;