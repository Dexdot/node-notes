const fs = require('fs');

const fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes-data.json'));
  } catch (e) {
    return [];
  }
};
const saveNotes = notes =>
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));

// Funcs
const addNote = (title, body) => {
  const note = { title, body };
  let notes = fetchNotes();

  const duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getNote = title => {
  const notes = fetchNotes();

  let noteToReturn = undefined;
  notes.forEach(note => {
    if (note.title === title) {
      noteToReturn = note;
    }
  });

  return noteToReturn;
};

const removeNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const printNote = note =>
  console.log(`Title - ${note.title}\nBody - ${note.body}`);

const getAll = () => fetchNotes();

module.exports = {
  addNote,
  getNote,
  removeNote,
  printNote,
  getAll
};
