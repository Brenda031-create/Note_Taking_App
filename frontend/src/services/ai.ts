import axios from 'axios';
import { Note } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const createNote = async (note: Omit<Note, '_id'>): Promise<Note> => {
  const response = await axios.post(`${API_URL}/notes`, note);
  return response.data;
};

export const updateNote = async (id: string, note: Partial<Note>): Promise<Note> => {
  const response = await axios.put(`${API_URL}/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/notes/${id}`);
};