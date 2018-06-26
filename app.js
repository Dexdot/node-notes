const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`Note created`);
    notes.printNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  const notesList = notes.getAll();
  console.log(`Notes:\n`);
  console.log(notesList);
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) {
    console.log('Note founded');
    notes.printNote(note);
  } else {
    console.log('Note not founded');
  }
} else if (command === 'remove') {
  const isRemoved = notes.removeNote(argv.title);
  const msg = isRemoved ? 'Note was removed' : 'Note not found';
  console.log(msg);
} else {
  console.log('Command not recognized');
}
