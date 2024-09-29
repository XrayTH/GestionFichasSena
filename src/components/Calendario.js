import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; 

moment.locale('es');

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([
    {
      title: 'Evento 1',
      start: new Date(),
      end: new Date(),
      allDay: true,
    },
    {
      title: 'Evento 2',
      start: new Date(2024, 9, 10),
      end: new Date(2024, 9, 10),
      allDay: true,
    },
  ]);

  const handleDayClick = (date) => {
    alert(`Has seleccionado el día: ${moment(date).format('DD/MM/YYYY')}`);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.title.includes('Filtrado') ? '#FF6347' : '#3174ad';
    return { style: { backgroundColor } };
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectSlot={(slotInfo) => handleDayClick(slotInfo.start)}
        selectable
        eventPropGetter={eventStyleGetter}
        views={['month']}
        popup
        defaultView="month"
        messages={{
          today: 'Hoy',
          previous: 'Anterior',
          next: 'Siguiente',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          allDay: 'Todo el día',
        }}
      />
    </div>
  );
};

export default Calendario;
