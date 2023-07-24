// AppNotas.js
import React, { useState, useEffect } from 'react';
import Nota from './Nota';

const AppNotas = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [esImportante, setEsImportante] = useState(false);
  const [notas, setNotas] = useState([]);

  // Función para crear una nueva nota
  const crearNota = () => {
    if (descripcion === '') {
      alert('La descripción es obligatoria.');
      return;
    }

    const nuevaNota = {
      titulo,
      descripcion,
      esImportante
    };

    setNotas([...notas, nuevaNota]);
    setTitulo('');
    setDescripcion('');
    setEsImportante(false);
  };

  // Función para obtener las notas almacenadas en el Local Storage
  const obtenerNotasDesdeAlmacenamiento = () => {
    const notasGuardadas = localStorage.getItem('notas');
    return notasGuardadas ? JSON.parse(notasGuardadas) : [];
  };

  useEffect(() => {
    const notasAlmacenadas = obtenerNotasDesdeAlmacenamiento();
    setNotas(notasAlmacenadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas));
  }, [notas]);

  return (
    <div>
      <h1>Tus Post-it!</h1>

      <div className="container" id="notesContainer">
        {notas.map((nota, index) => (
          <Nota
            key={index}
            titulo={nota.titulo}
            descripcion={nota.descripcion}
            esImportante={nota.esImportante}
          />
        ))}
      </div>

      <form onSubmit={(event) => {event.preventDefault(); crearNota();}}>
        <label htmlFor="titleInput">Título:</label>
        <input
          type="text"
          id="titleInput"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese un título"
        />

        <label htmlFor="descriptionInput">Descripción:</label>
        <textarea
          id="descriptionInput"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese una descripción"
        ></textarea>

        <label htmlFor="importantCheckbox">Importante:</label>
        <input
          type="checkbox"
          id="importantCheckbox"
          checked={esImportante}
          onChange={(e) => setEsImportante(e.target.checked)}
        />

        <button type="submit">Agregar Nota</button>
      </form>
    </div>
  );
};

export default AppNotas;
