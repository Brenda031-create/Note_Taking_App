import { Router } from 'express';
import {
	createNote,
	deleteNote,
	getNoteById,
	getNotes,
	updateNote,
} from '../controllers/noteController';

const router = Router();

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;