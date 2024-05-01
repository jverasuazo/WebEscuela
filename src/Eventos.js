import React, { useState, useEffect } from 'react';
import axios from 'axios';
const adminRole=1;//1 Admin , 2 User
function Eventos(props) {
  const { usuario } = props
  //console.log(usuario);
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    id_usuario: usuario.usuario_id // Restaurar el valor por defecto
  });

  // Función para cargar eventos desde el servidor
  const cargarEventos = async () => {
    try {
      let response;
      if(usuario.id_rol==adminRole){
        response = await axios.get('http://localhost:3001/eventosAdmin');
      }else{
        response = await axios.get('http://localhost:3001/eventosPorUsuario?idUsuario='+usuario.usuario_id);
      }

      // response = await axios.get('http://localhost:3001/eventosPorUsuario?idUsuario='+usuario.usuario_id);
      setEventos(response.data);
    } catch (error) {
      console.error('Error cargando eventos:', error);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario de creación de eventos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/eventos', formData);
      cargarEventos(); // Recargar eventos después de crear uno nuevo
      // Limpiar el formulario después de crear el evento
      setFormData({
        title: '',
        description: '',
        date: '',
        id_usuario: usuario.usuario_id
      });
    } catch (error) {
      console.error('Error creando evento:', error);
    }
  };

  // Función para eliminar un evento
  const eliminarEvento = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/eventos/${id}`);
      cargarEventos(); // Recargar eventos después de eliminar uno
    } catch (error) {
      console.error('Error eliminando evento:', error);
    }
  };

  return (
    <div className='EventosIntranet'>
      <h2>Mis Eventos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.fecha}
          onChange={handleChange}
        />
        <button type="submit">Crear Evento</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {eventos.map((evento) => (
            <tr key={evento.evento_id}>
                <td>{evento.titulo}</td>
                <td>{evento.descripcion}</td>
                <td>{evento.fecha}</td>
                <td>
                <button onClick={() => eliminarEvento(evento.evento_id)}>Eliminar</button>
                {/* Agrega aquí el botón de edición */}
                </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Eventos;
