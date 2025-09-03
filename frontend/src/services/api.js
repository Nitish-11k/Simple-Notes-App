import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api` : 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesAPI = {
  getAllNotes: () => api.get('/notes'),
  getNoteById: (id) => api.get(`/notes/${id}`),
  createNote: (note) => api.post('/notes', note),
  updateNote: (id, note) => api.put(`/notes/${id}`, note),
  deleteNote: (id) => api.delete(`/notes/${id}`),
  searchNotes: (title) => api.get(`/notes/search?title=${title}`),
};

export const shareAPI = {
  createShareLink: (noteId) => api.post(`/share/${noteId}`),
  getSharedNote: (shareToken) => api.get(`/share/${shareToken}`),
  revokeShareLink: (noteId) => api.delete(`/share/${noteId}`),
};

export default api;
