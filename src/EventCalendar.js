import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EventCalendar.css';


function EventCalendar({ onDateChange }) {
  const [date, setDate] = useState(new Date());
  const [eventsLoaded, setEventsLoaded] = useState(false);

  useEffect(() => {
    // Cargar eventos solo la primera vez que se monta el componente
    if (!eventsLoaded) {
      onDateChange(new Date());
      setEventsLoaded(true);
    }
  }, [onDateChange, eventsLoaded]);

  const onChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className="EventCalendar">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
}

export default EventCalendar;
