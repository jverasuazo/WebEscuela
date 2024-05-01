import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    user_name: '',
    password: '',
    id_rol: 2, // Valor por defecto para el rol, por ejemplo, 2 para usuario normal
    flag_activo: true // Valor por defecto para indicar que el usuario está activo
  });

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/usuarios', formData);
      cargarUsuarios();
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        user_name: '',
        password: '',
        id_rol: 2,
        flag_activo: true
      });
    } catch (error) {
      console.error('Error creando usuario:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:3001/usuariosDes/${id}`);
      cargarUsuarios();
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  };
  const activarUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:3001/usuariosAct/${id}`);
      cargarUsuarios();
    } catch (error) {
      console.error('Error activando usuario:', error);
    }
  };
  return (
    <div className='UsuariosIntranet'>
      <h2>Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="user_name"
          placeholder="Nombre de usuario"
          value={formData.user_name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        <label>Rol:</label>
        <select name="id_rol" value={formData.id_rol} onChange={handleChange}>
          <option value="1">Admin</option>
          <option value="2">Usuario</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Nombre de usuario</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.usuario_id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.user_name}</td>
              <td>{usuario.id_rol === 1 ? 'Admin' : 'Usuario'}</td>
              <td>{usuario.flag_activo ? 'Sí' : 'No'}</td>
              <td>{usuario.flag_activo ? <td>
                <button onClick={() => eliminarUsuario(usuario.usuario_id)}>Eliminar</button>
                {/* Agrega aquí el botón de edición */}
              </td> : <td>
                <button onClick={() => activarUsuario(usuario.usuario_id)}>Activar</button>
                {/* Agrega aquí el botón de edición */}
              </td>}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
