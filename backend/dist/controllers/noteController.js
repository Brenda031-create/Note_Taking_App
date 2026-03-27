"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.createNote = exports.getNotes = void 0;
let notes = [];
const getNotes = (req, res) => {
    res.json(notes);
};
exports.getNotes = getNotes;
const createNote = (req, res) => {
    const { title, content } = req.body;
    if (!title?.trim() || !content?.trim()) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    const newNote = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date(),
    };
    notes.push(newNote);
    res.status(201).json(newNote);
};
exports.createNote = createNote;
const getNoteById = (req, res) => {
    const { id } = req.params;
    const note = notes.find((item) => item.id === id);
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
};
exports.getNoteById = getNoteById;
const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (typeof title !== 'string' && typeof content !== 'string') {
        return res.status(400).json({ message: 'Provide title or content to update' });
    }
    const noteIndex = notes.findIndex((item) => item.id === id);
    if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' });
    }
    const currentNote = notes[noteIndex];
    const updatedTitle = typeof title === 'string' ? title.trim() : currentNote.title;
    const updatedContent = typeof content === 'string' ? content.trim() : currentNote.content;
    if (!updatedTitle || !updatedContent) {
        return res.status(400).json({ message: 'Title and content cannot be empty' });
    }
    const updatedNote = {
        ...currentNote,
        title: updatedTitle,
        content: updatedContent,
    };
    notes[noteIndex] = updatedNote;
    res.json(updatedNote);
};
exports.updateNote = updateNote;
const deleteNote = (req, res) => {
    const { id } = req.params;
    const noteIndex = notes.findIndex((item) => item.id === id);
    if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' });
    }
    notes.splice(noteIndex, 1);
    res.status(204).send();
};
exports.deleteNote = deleteNote;
