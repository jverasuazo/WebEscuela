import React from 'react';
import logo from './logo.svg'; // Asegúrate de tener un archivo logo.svg en src/

function LogoSection() {
  return (
    <div className="LogoSection">
      <img src={logo} alt="Logo de la Escuela" />
    </div>
  );
}

export default LogoSection;
