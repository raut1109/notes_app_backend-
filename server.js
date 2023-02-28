
import cors from 'cors';
import express, { json } from 'express';
import { createNote, getNotes, getSingleNote, updateNote, deleteNote } from './Controllers/notesController.js'
const app = express()
const PORT = 5000;
app.use(cors())
app.use(json());

//http method,s

app.get('/notes', getNotes);
app.get('/notes/:id', getSingleNote);
app.post('/notes', createNote);
app.put('/notes/update/:id', updateNote);
app.delete('/notes/delete/:id', deleteNote); 

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});