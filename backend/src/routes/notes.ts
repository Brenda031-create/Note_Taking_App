// src/routes/notes.ts — minimal test version
import { Router } from 'express';

const router = Router();

// One dummy route to prove the file works
router.get('/test', (req, res) => {
  res.json({ status: 'ok', message: 'Routes file is loaded and working' });
});

export default router;