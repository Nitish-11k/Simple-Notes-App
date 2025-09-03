import React, { useState } from 'react';

const ShareModal = ({ shareData, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);

      const textArea = document.createElement('textarea');
      textArea.value = shareData.shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content share-modal">
        <div className="modal-header">
          <h2>🔗 Share Note</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div>
          <p>Your note has been shared! Anyone with this link can view your note.</p>
          <p><strong>Note:</strong> This link will expire in 7 days.</p>
        </div>

        <div className="share-url">
          <strong>Share URL:</strong>
          <br />
          <span>{shareData.shareUrl}</span>
        </div>

        <button 
          className={`copy-btn ${copied ? 'btn-success' : ''}`}
          onClick={copyToClipboard}
        >
          {copied ? '✓ Copied!' : '📋 Copy Link'}
        </button>

        <div style={{ marginTop: '1rem' }}>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
