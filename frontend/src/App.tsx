import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define or import the shared Note type
// (You can move this to a shared/types.ts file later for reuse in backend/frontend)
interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string; // Date from backend might come as string
}

const API_BASE_URL = 'http://localhost:5000/api'; // Change to production URL later

const App: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<INote[]>(`${API_BASE_URL}/notes`);
        setNotes(response.data);
      } catch (err) {
        // Type-safe error handling
        const message =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : 'Failed to load notes. Is the backend running?';
        setError(message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Add a new note
  const addNote = async () => {
    // Basic client-side validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setError(null);
      const response = await axios.post<INote>(`${API_BASE_URL}/notes`, {
        title: title.trim(),
        content: content.trim(),
      });

      setNotes((prevNotes) => [...prevNotes, response.data]);
      setTitle('');
      setContent('');
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Failed to add note';
      setError(message);
      console.error('Add note error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Note Taking App (TypeScript + React)</h1>

      {/* Loading & Error States – Crucial for good UX in full-stack apps */}
      {loading && <p style={{ color: 'blue' }}>Loading notes...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}

      {/* Form */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content"
          rows={4}
          style={{ width: '100%', padding: '8px' }}
        />
        <button
          onClick={addNote}
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Adding...' : 'Add Note'}
        </button>
      </div>

      {/* Notes List */}
      {notes.length === 0 && !loading && !error ? (
        <p>No notes yet. Add your first one!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map((note) => (
            <li
              key={note.id}           // ← Fixed: use id (UUID), not _id (MongoDB style)
              style={{
                border: '1px solid #ddd',
                padding: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
              }}
            >
              <h3 style={{ margin: '0 0 8px' }}>{note.title}</h3>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{note.content}</p>
              <small style={{ color: '#777' }}>
                Created: {new Date(note.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;