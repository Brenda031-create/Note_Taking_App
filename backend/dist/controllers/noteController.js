"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.getNotes = void 0;
const uuid_1 = require("uuid");
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
        id: (0, uuid_1.v4)(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date(),
    };
    notes.push(newNote);
    res.status(201).json(newNote);
};
exports.createNote = createNote;
