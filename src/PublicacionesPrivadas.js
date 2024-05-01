import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PublicacionesPrivadas.css'; // Importar el CSS aquí
function PublicacionesPrivadas({ usuario }) {
  const [publicacionesPrivadas, setPublicacionesPrivadas] = useState([]);

  const cargarPublicacionesPrivadas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/publicaciones/privadas');
      setPublicacionesPrivadas(response.data);
    } catch (error) {
      console.error('Error cargando publicaciones privadas:', error);
    }
  };

  useEffect(() => {
    cargarPublicacionesPrivadas(); // Llama a cargarPublicacionesPrivadas cuando el componente se monta

    const intervalId = setInterval(() => {
      cargarPublicacionesPrivadas(); // Llama a cargarPublicacionesPrivadas cada 10 segundos
    }, 10000); // 10000 milisegundos = 10 segundos

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  return (
    <div className='PublicacionesIntranet'>
      <h2>Publicaciones</h2>
      <ul>
        {publicacionesPrivadas.map((publicacion) => (
          <li key={publicacion.mensaje_id}>
            <h3>{publicacion.titulo_mensaje}</h3>
            <p>{publicacion.fecha}</p>
            <p>{publicacion.mensaje}</p>
            <p>{publicacion.remitente}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PublicacionesPrivadas;
