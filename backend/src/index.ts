import express, { Request, Response, NextFunction } from 'express';  // Add types for handler
import dotenv from 'dotenv';
import noteRoutes from './routes/notes';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

app.use(express.json());

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.use('/api', noteRoutes);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});