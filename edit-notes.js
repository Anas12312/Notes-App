'use strict'

const title = document.querySelector('#edit-title')
const body = document.querySelector('#edit-body')
const removeBtn = document.querySelector('#remove-note')
const lastUpdate = document.querySelector('#last-update')

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((item) => item.id === noteId)
if(!note){
    location.assign('index.html')
}
lastUpdate.textContent = `Last edit was ${moment(note.updatedAt).fromNow()}`
title.value = note.title
body.value = note.body

title.addEventListener('input',(e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    lastUpdate.textContent = `Last edit was ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})


body.addEventListener('input',(e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    lastUpdate.textContent = `Last edit was ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})

removeBtn.addEventListener('click',() => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        const note = notes.find((item) => item.id === noteId)
        if(!note){
            location.assign('index.html')
        }
        title.value = note.title
        body.value = note.body
        lastUpdate.textContent = `Last edit was ${moment(note.updatedAt).fromNow()}`
    }
})