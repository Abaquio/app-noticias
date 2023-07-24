// Nota.js// Nota.js
// Nota.js
import React from 'react';

const Nota = ({ titulo, descripcion, esImportante }) => {
  return (
    <div className={`nota ${esImportante ? 'importante' : ''}`}>
      <div className="nota-titulo">{titulo}</div>
      <div className="nota-descripcion">{descripcion}</div>
    </div>
  );
};

export default Nota;
