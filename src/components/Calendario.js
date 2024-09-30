import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { Tooltip } from '@mui/material';

moment.locale('es');

const localizer = momentLocalizer(moment);

const Calendario = ({ events, jornadas, fichas, onDayClick }) => {
  // Función para obtener el contenido del tooltip
  const getTooltipContent = (event) => {
    const fichaId = parseInt(event.title.split(' ')[1]);
    const fichaData = fichas.find(ficha => ficha.id === fichaId);
    const diaEvento = moment(event.start).format('dddd'); // Obtener el día de la semana

    // Filtrar las jornadas que corresponden al día del evento
    const jornadaData = jornadas.filter(jornada => jornada.ficha === fichaId && jornada.dia === diaEvento);

    // Crear contenido del tooltip
    return (
      <div>
        <strong>Ficha ID:</strong> {fichaId}<br />
        <strong>Coordinador:</strong> {fichaData.coordinador}<br />
        <strong>Gestor:</strong> {fichaData.gestor}<br />
        <strong>Ambiente:</strong> {fichaData.ambiente}<br />
        <strong>Instructores ({diaEvento}):</strong>
        {jornadaData.length > 0 ? (
          jornadaData.map(j => (
            <div key={j.id}>
              {`${j.instructor} (${j.jornada})`}
            </div>
          ))
        ) : (
          <div>No hay instructores para este día.</div> // Mensaje si no hay instructores
        )}
      </div>
    );
  };

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month']}
        defaultView="month"
        selectable
        // Al seleccionar un slot, invocamos la función onDayClick
        onSelectSlot={slotInfo => {
          const diaSeleccionado = moment(slotInfo.start).format('YYYY-MM-DD'); // Formato de la fecha
          const diaSemana = moment(slotInfo.start).format('dddd'); // Nombre del día de la semana
          onDayClick(diaSeleccionado, diaSemana);
        }}
        eventPropGetter={(event) => {
          let backgroundColor = '#fff';
          if (event.title.includes('Ficha')) {
            backgroundColor = '#195eb2'; 
          }
          return { style: { backgroundColor } };
        }}
        components={{
          event: (eventProps) => (
            <Tooltip
              title={getTooltipContent(eventProps.event)}
              arrow
              placement="top"
            >
              <div>{eventProps.event.title}</div>
            </Tooltip>
          )
        }}
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
    </div>
  );
};

export default Calendario;

