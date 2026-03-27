import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes';

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

app.use(cors());
app.use(express.json());
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Backend test route is alive' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});