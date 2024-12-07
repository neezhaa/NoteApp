import React, { useState } from 'react';
import CreateNote from './CreateNote';

const Header = () => {
  const [isClicked, setIsClicked] = useState();
  const [activeComponent, setActiveComponent] = useState('');
  const switchMode = () => {
    setIsClicked(prev => !prev);
    if (!isClicked) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    setActiveComponent('createNote');
  }

  const closeCreateNote = () => {
    setActiveComponent('');
  }

  return (
    <div className="app-content-header">
        <h1 className="app-content-headerText">All Notes</h1>
        <button onClick={switchMode} className={`mode-switch ${isClicked? "active":""}`} title="Switch Theme">
            <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
        </button>
        <button className="app-content-headerButton" onClick={handleCreateNote}>+ New Note</button>
        { 
          activeComponent === 'createNote' && <CreateNote onClose={closeCreateNote} />
        }
    </div>    
  )
}

export default Header


