import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Actions from '../components/Actions';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [users, setUsers] = useState([]);


    const getData = async () => {
      const token = localStorage.getItem('token');
      try {
          const res = await axios.get('https://notes.devlop.tech/api/notes', {
              headers: { Authorization: `Bearer ${token}` }, 
          });
          setNotes(res.data);
          setAllNotes(res.data);
      } catch (error) {
          console.error('Error fetching notes:', error);
      }
  };

  useEffect(() => {
      getData();
  }, [notes]);

  const handleSearch = (term) => {
      if (term.trim() === "") {
          setNotes(allNotes); 
      } else {
          setNotes(allNotes.filter((note) =>
              note.title.toLowerCase().includes(term.toLowerCase()) ||
              note.content.toLowerCase().includes(term.toLowerCase())
          ));
      }
    };

  const deleteNote = async(id) =>{
    const token = localStorage.getItem('token');
    try{
        await axios.delete(`https://notes.devlop.tech/api/notes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }, 
        });
        setNotes(notes.filter((note)=> note.id !== id));
        setSelectedNoteId(null);
    } catch(e){
        console.error('Failed to delete note:', e);
    }
  };

  const handleClickNote = (id) => {
    setSelectedNoteId(id);

  }

  const getUsers = async() => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get('https://notes.devlop.tech/api/users', {
            headers: { Authorization: `Bearer ${token}` }, 
        });
        setUsers(res.data);
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header />
        <Actions onSearch={handleSearch} data={notes} users={getUsers} id={selectedNoteId}/>
        <div className='main-section'>
        {notes.map((note) => ( 
          <div key={note.id} className='notes' onClick={( )=> handleClickNote(note.id)}>
            <button className="delete-button" onClick={()=>deleteNote(note.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
              </svg>            
            </button>
            <p className="note date"> {new Date(note.date).toLocaleDateString()} </p>
            <span className='note title'>{note.title}</span>
            <hr className='line' />
            <p className="note cnt">{note.content}</p>
            <span>{note.shared_with}</span>
          </div>
          ))
        }
      </div>
      </div>

    </div>
  )
};

export default AllNotes;
