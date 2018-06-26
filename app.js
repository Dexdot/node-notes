const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const commandConfig = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
};

const argv = yargs
  .command('add', 'Add a new note', commandConfig)
  .command('list', 'List all notes')
  .command('read', 'Read a note', { title: commandConfig.title })
  .command('remove', 'Remove a note', { title: commandConfig.title })
  .help().argv;
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
  const allNotes = notes.getAll();
  console.log(`Printing all ${allNotes.length} note(s).\n`);
  allNotes.forEach(note => notes.printNote(note));
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
