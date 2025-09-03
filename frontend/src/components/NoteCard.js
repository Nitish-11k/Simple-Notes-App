import React from 'react';

const NoteCard = ({ note, onEdit, onDelete, onShare, onRevokeShare }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="card">
      <h3>{note.title || 'Untitled Note'}</h3>
      <p>{truncateContent(note.content)}</p>
      
      <div className="card-meta">
        <span>Created: {formatDate(note.createdAt)}</span>
        {note.updatedAt !== note.createdAt && (
          <span>Updated: {formatDate(note.updatedAt)}</span>
        )}
      </div>

      <div className="note-actions">
        <button className="btn" onClick={onEdit}>
          ✏️ Edit
        </button>
        <button className="btn btn-secondary" onClick={onShare}>
          🔗 Share
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
