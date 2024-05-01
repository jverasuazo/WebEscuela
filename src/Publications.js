import React from 'react';
import './Publications.css';
function Publications({ publications }) {
  return (
    <div className="PublicationsPublicas">
      <h2>Publicaciones</h2>
      {publications.map((publication, index) => (
        <div key={index}>
          <h3>{publication.titulo_mensaje}</h3>
          <p>{publication.fecha}</p>
          <p>{publication.mensaje}</p>
          <p>{publication.remitente}</p>
        </div>
      ))}
    </div>
  );
}

export default Publications;