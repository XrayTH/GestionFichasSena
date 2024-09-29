import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const Calendario = ({ events }) => {
  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day']}
        defaultView="month"
        selectable
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={slotInfo => alert(`Selected slot: \n\nstart ${slotInfo.start.toLocaleString()}\nend: ${slotInfo.end.toLocaleString()}`)}
        eventPropGetter={(event) => {
          let backgroundColor = '#fff';
          if (event.title.includes('Ficha')) {
            backgroundColor = '#195eb2'; 
          }
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
};

export default Calendario;