import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
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
    id: uuidv4(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};