import React from 'react';

function EventList({ events }) {
  return (
    <table className="EventTable">
      <thead>
        <tr>
          <th>Título</th>
          <th>Fecha</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.titulo}</td>
            <td>{event.fecha}</td>
            <td>{event.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EventList;
