import React, { useState, useEffect } from 'react';
import axios from 'axios';
const adminRole=1;//1 Admin , 2 User
function MantenedorPublicaciones(props) {
  const { usuario } = props;
  
  const [publicaciones, setPublicaciones] = useState([]);
  const [formData, setFormData] = useState({
    titulo_mensaje: '',
    mensaje: '',
    fecha: '',
    publico: true,
    usuario_usuario_id: usuario.usuario_id,
    remitente:''
  });

  const cargarPublicaciones = async () => {
    try {
      let response;
      if(usuario.id_rol==adminRole){
        response = await axios.get('http://localhost:3001/publicaciones/privadas');
      }else{
        response = await axios.get('http://localhost:3001/publicaciones/propias?idUsuario=' + usuario.usuario_id);
      }
      
      setPublicaciones(response.data);
    } catch (error) {
      console.error('Error cargando publicaciones:', error);
    }
  };

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/publicaciones', formData);
      cargarPublicaciones();
      setFormData({
        titulo_mensaje: '',
        mensaje: '',
        fecha: '',
        publico: true,
        usuario_usuario_id: usuario.usuario_id,
        remitente: ''
      });
    } catch (error) {
      console.error('Error creando publicación:', error);
    }
  };

  const eliminarPublicacion = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/publicaciones/${id}`);
      cargarPublicaciones();
    } catch (error) {
      console.error('Error eliminando publicación:', error);
    }
  };

  return (
    <div className='MantenedorPublicacionesIntranet'>
      <h2>Mis Publicaciones</h2>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="titulo_mensaje"
            placeholder="Título"
            value={formData.titulo_mensaje}
            onChange={handleChange}
        />
        <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={formData.mensaje}
            onChange={handleChange}
        />
        <input
            type="text"
            name="remitente"
            placeholder="Remitente"
            value={formData.remitente}
            onChange={handleChange}
        />
        <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
        />
        <label>
            <input
            type="checkbox"
            name="publico"
            checked={formData.publico}
            onChange={(e) => setFormData({ ...formData, publico: e.target.checked })}
            />
            ¿Público?
        </label>
        <button type="submit">Crear Publicación</button>
        </form>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {publicaciones.map((publicacion) => (
            <tr key={publicacion.mensaje_id}>
              <td>{publicacion.titulo_mensaje}</td>
              <td>{publicacion.mensaje}</td>
              <td>{publicacion.fecha}</td>
              <td>
                <button onClick={() => eliminarPublicacion(publicacion.mensaje_id)}>Eliminar</button>
                {/* Agrega aquí el botón de edición */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MantenedorPublicaciones;
