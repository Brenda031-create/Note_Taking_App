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
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 2500);
  };

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
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      const response = await axios.post<INote>(`${API_BASE_URL}/notes`, {
        title: title.trim(),
        content: content.trim(),
      });

      setNotes((prevNotes) => [...prevNotes, response.data]);
      setTitle('');
      setContent('');
      showSuccess('Note added successfully');
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Failed to add note';
      setError(message);
      console.error('Add note error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (note: INote) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setError(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  const saveEdit = async (id: string) => {
    if (!editTitle.trim() || !editContent.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      const response = await axios.put<INote>(`${API_BASE_URL}/notes/${id}`, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? response.data : note))
      );
      cancelEditing();
      showSuccess('Note updated successfully');
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Failed to update note';
      setError(message);
      console.error('Update note error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const removeNote = async (id: string) => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      await axios.delete(`${API_BASE_URL}/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      if (editingId === id) {
        cancelEditing();
      }
      showSuccess('Note deleted successfully');
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Failed to delete note';
      setError(message);
      console.error('Delete note error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Note Taking App </h1>

      {/* Loading & Error States – Crucial for good UX in full-stack apps */}
      {loading && <p style={{ color: 'blue' }}>Loading notes...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}
      {success && <p style={{ color: '#166534', fontWeight: 'bold' }}>{success}</p>}

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
          disabled={loading || submitting}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            background: loading || submitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: loading || submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Working...' : 'Add Note'}
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
              {editingId === note.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => saveEdit(note.id)}
                      disabled={submitting}
                      style={{
                        padding: '8px 12px',
                        border: 'none',
                        background: '#0d9488',
                        color: '#fff',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={submitting}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #999',
                        background: '#fff',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ margin: '0 0 8px' }}>{note.title}</h3>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{note.content}</p>
                  <small style={{ color: '#777', display: 'block', marginTop: '8px' }}>
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </small>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button
                      onClick={() => startEditing(note)}
                      disabled={submitting}
                      style={{
                        padding: '8px 12px',
                        border: 'none',
                        background: '#2563eb',
                        color: '#fff',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeNote(note.id)}
                      disabled={submitting}
                      style={{
                        padding: '8px 12px',
                        border: 'none',
                        background: '#dc2626',
                        color: '#fff',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;