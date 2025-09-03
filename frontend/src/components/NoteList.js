import React, { useState, useEffect } from 'react';
import { notesAPI, shareAPI } from '../services/api';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';
import ShareModal from './ShareModal';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAllNotes();
      setNotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await notesAPI.searchNotes(searchTerm);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search notes');
      console.error('Error searching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const response = await notesAPI.createNote(noteData);
      setNotes([response.data, ...notes]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create note');
      console.error('Error creating note:', err);
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      const response = await notesAPI.updateNote(id, noteData);
      setNotes(notes.map(note => note.id === id ? response.data : note));
      setEditingNote(null);
      setError(null);
    } catch (err) {
      setError('Failed to update note');
      console.error('Error updating note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete note');
        console.error('Error deleting note:', err);
      }
    }
  };

  const handleShareNote = async (noteId) => {
    try {
      const response = await shareAPI.createShareLink(noteId);
      setShareData(response.data);
      setShowShareModal(true);
      setError(null);
    } catch (err) {
      setError('Failed to create share link');
      console.error('Error creating share link:', err);
    }
  };

  const handleRevokeShare = async (noteId) => {
    try {
      await shareAPI.revokeShareLink(noteId);
      setError(null);
    } catch (err) {
      setError('Failed to revoke share link');
      console.error('Error revoking share link:', err);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchNotes();
  };

  if (loading && notes.length === 0) {
    return (
      <div className="container">
        <div className="loading">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>📝 Notes App</h1>
        <p>Create, manage, and share your notes</p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search notes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn">Search</button>
          {searchTerm && (
            <button type="button" className="btn btn-secondary" onClick={clearSearch}>
              Clear
            </button>
          )}
        </form>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className="btn btn-success" 
          onClick={() => setShowForm(true)}
        >
          + Create New Note
        </button>
      </div>

      {showForm && (
        <NoteForm
          note={editingNote}
          onSubmit={editingNote ? 
            (noteData) => handleUpdateNote(editingNote.id, noteData) : 
            handleCreateNote
          }
          onCancel={() => {
            setShowForm(false);
            setEditingNote(null);
          }}
        />
      )}

      <div className="notes-grid">
        {notes.length === 0 ? (
          <div className="card">
            <h3>No notes found</h3>
            <p>Create your first note to get started!</p>
          </div>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => {
                setEditingNote(note);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteNote(note.id)}
              onShare={() => handleShareNote(note.id)}
              onRevokeShare={() => handleRevokeShare(note.id)}
            />
          ))
        )}
      </div>

      {showShareModal && shareData && (
        <ShareModal
          shareData={shareData}
          onClose={() => {
            setShowShareModal(false);
            setShareData(null);
          }}
        />
      )}
    </div>
  );
};

export default NoteList;
