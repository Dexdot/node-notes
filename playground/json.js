const fs = require('fs');

const note = {
  title: 'Some title',
  body: 'Some body'
};

fs.writeFileSync('notes.json', JSON.stringify(note));
const noteString = fs.readFileSync('notes.json');
const noteObj = JSON.parse(noteString);
