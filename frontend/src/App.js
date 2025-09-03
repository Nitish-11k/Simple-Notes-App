import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import SharedNote from './components/SharedNote';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/shared/:shareToken" element={<SharedNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
