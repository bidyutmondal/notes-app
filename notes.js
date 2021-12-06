const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')

const saveNotes = function(notes){
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}
const loadNotes = function(){
    //console.log('Loading notes..')
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }    
}

const addNote = function(title, body){
    //console.log('Adding notes...');
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log('New note with title as ' + title + ' is added.');
    } else{
        console.log('The title is already taken.')
    }
    
}

const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    
    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.bold('Note removed successfully.'));
    } else {
        console.log(chalk.red.bold('No note was removed.'))
    }

    saveNotes(notesToKeep)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.blue('List of all Notes'));
    notes.forEach((note) => console.log(note))
}

const readNote = function (title) {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => {
        return note.title === title
    })
    if(noteToRead){
        console.log(chalk.blue.bold.inverse(title));
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red('No note with title as ' + title + ' found.'));
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}