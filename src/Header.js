// Header.js
import React, { useState } from 'react';
import './Header.css'; // Importar el CSS aquí
import LogoEscuela from './logoColegio.JPG';
function Header({ isLoggedIn, handleLogin,handleLogout  }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogoutClick = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    handleLogout();
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="Header">
      {/* Agrega la imagen del logo */}
      <img src={LogoEscuela} alt="Logo de la Escuela" className="logo" />
      <h1>Escuela Conectada</h1>
      {isLoggedIn ? (
        <div>
          <p>Bienvenido, {username}!</p>
          <button onClick={handleLogoutClick}>Cerrar Sesión</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      )}
    </div>
  );
}

export default Header;
