const notes = require('express').Router();
const {readAndAppend, readFromFile, uniqueId, deleteItem} = require('../helpers/utils');

notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)) )
});

notes.post('/notes', (req, res) => {
    const { title, text } = req.body;

    const noteSave = {
        title,
        text,
        id: uniqueId()
    };

if (req && req.body) {
    
        readAndAppend(noteSave, './db/db.json');
        res.sendStatus(201);
} else {
        res.json('problem with input occured');
    }
});

notes.delete('/notes/:id', (req, res) => { 
    deleteItem(req.params.id, './db/db.json')
    res.sendStatus(204);
})

module.exports = notes;

