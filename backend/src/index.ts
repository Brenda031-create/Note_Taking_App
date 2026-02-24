import express from 'express';

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

app.use(express.json());

// Temporary test route — no external files needed
app.get('/test', (req, res) => {
  res.json({ message: 'Minimal server is alive' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});