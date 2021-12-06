const process = require('process')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
const { demandOption } = require('yargs')
const { title } = require('process')

//Customize yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true,
            type: 'string',
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder:{
        title:{
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => notes.removeNote(argv.title)

})

//Create list command
yargs.command({
    command: 'list',
    describe: 'List of notes.',
    handler: () => notes.listNotes()

})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read notes.',
    builder: {
        title: {
            describe: 'Read a note.',
            demandOption: true,
            type: 'string',
        }   
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }

})

yargs.parse() //parses the arguements
//console.log(yargs.argv)
