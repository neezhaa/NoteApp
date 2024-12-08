import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import AllNotes from './pages/AllNotes';
function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<AllNotes />} />
      </Routes>

    </>
  );
}

export default App;

