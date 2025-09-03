import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shareAPI } from '../services/api';

const SharedNote = () => {
  const { shareToken } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSharedNote = useCallback(async () => {
    try {
      setLoading(true);
      const response = await shareAPI.getSharedNote(shareToken);
      setNote(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Shared note not found or link has expired');
      } else if (err.response?.status === 410) {
        setError('This share link has expired');
      } else {
        setError('Failed to load shared note');
      }
      console.error('Error fetching shared note:', err);
    } finally {
      setLoading(false);
    }
  }, [shareToken]);

  useEffect(() => {
    fetchSharedNote();
  }, [fetchSharedNote]);



  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading shared note...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="header">
          <h1>📝 Shared Note</h1>
        </div>
        <div className="error">
          {error}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" className="btn">
            ← Back to Notes App
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>📝 Shared Note</h1>
        <p>This note has been shared with you</p>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#333', marginBottom: '1rem', fontSize: '1.8rem' }}>
          {note.title || 'Untitled Note'}
        </h2>
        
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.6', 
          fontSize: '1.1rem',
          color: '#555',
          marginBottom: '2rem'
        }}>
          {note.content || 'No content available'}
        </div>


      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" className="btn">
          ← Back to Notes App
        </Link>
      </div>
    </div>
  );
};

export default SharedNote;
