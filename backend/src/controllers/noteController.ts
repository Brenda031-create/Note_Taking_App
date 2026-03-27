import { Request, Response } from 'express';
import { INote } from '../models/note';

let notes: INote[] = [];

export const getNotes = (req: Request, res: Response) => {
  res.json(notes);
};

export const createNote = (req: Request, res: Response) => {
  const { title, content } = req.body as Partial<INote>;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newNote: INote = {
    id: crypto.randomUUID(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

export const getNoteById = (req: Request, res: Response) => {
  const { id } = req.params;
  const note = notes.find((item) => item.id === id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.json(note);
};

export const updateNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body as Partial<INote>;

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

  const updatedNote: INote = {
    ...currentNote,
    title: updatedTitle,
    content: updatedContent,
  };

  notes[noteIndex] = updatedNote;
  res.json(updatedNote);
};

export const deleteNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex((item) => item.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes.splice(noteIndex, 1);
  res.status(204).send();
};