import React, { useState, useEffect } from 'react';


const App = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [esImportante, setEsImportante] = useState(false);
  const [notas, setNotas] = useState([]);

  // Función para crear una nueva nota
  const createNote = () => {
    if (descripcion === '') {
      alert('La descripción es obligatoria.');
      return;
    }

    const note = {
      title: titulo,
      description: descripcion,
      isImportant: esImportante,
    };

    const updatedNotes = [...notas, note];
    setNotas(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    setTitulo('');
    setDescripcion('');
    setEsImportante(false);
  };

  // Función para obtener las notas almacenadas en el Local Storage
  const getNotesFromStorage = () => {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  };

  useEffect(() => {
    const storedNotes = getNotesFromStorage();
    setNotas(storedNotes);
  }, []);

  return (
    <div>
      <h1>Tus post-its!</h1>

      <div className="container" id="notesContainer">
        {notas.map((note, index) => (
          <div key={index} className={`note ${note.isImportant ? 'important' : ''}`}>
            <div className="note-title">{note.title}</div>
            <div className="note-description">{note.description}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          createNote();
        }}
      >
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

export default App;

