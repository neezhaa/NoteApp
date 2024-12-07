import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Actions from '../components/Actions';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [users, setUsers] = useState([]);



    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [shared_with, setShared_with] = useState([]);


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

  const getUsers = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get('https://notes.devlop.tech/api/users', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
      getData();
      getUsers();
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
    } catch(e){
        console.error('Failed to delete note:', e);
    }
  };

  const handleClickNote = (id) => {
    const note = notes.find(note => note.id === id);
    setSelectedNoteId(id);
    setTitle(note.title);
    setContent(note.content);
    setIsClicked(true);
  };

  const handleEdit = async(e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{
        const response = await axios.put(`https://notes.devlop.tech/api/notes/${id}`,{title, content, shared_with}, {
        headers: {
          Authorization : `Bearer ${token}`,
        },
      });
      console.log('updated successfully',  response.data);
      setIsClicked(false);
      getData();
    }catch(e){
      console.log('Error updating the note',e);
    }
    
  }

  const handleClear = (e) =>{
    e.preventDefault();
    setTitle('');
    setContent(''); 
    setShared_with([]);
  };

  const overlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsClicked(false);
    }
    // if (e.target.className === 'overlay'){
    //   setIsClicked(false);
    // }
  };


  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header />
        <Actions onSearch={handleSearch} />
        <div className='main-section'>
            {notes.map((note) => (
                <div key={note.id} className='notes' onClick={() => handleClickNote(note.id)}>
                    <button className="delete-button" onClick={(e) => {e.stopPropagation();
                                                                        deleteNote(note.id);
                                                                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
                        </svg>
                    </button>
                    <div>
                      <p className="note date">{ new Date(note.date).toLocaleDateString()}</p>
                      <span className='note title'>{note.title}</span>
                      <hr className='line' />
                      <p className="note cnt">{note.content}</p>
                    </div>  
                    <div className='shared-with'>{ note.shared_with.map((user, index) => (
                      <>
                        <span className="users"  key={index}>{user.last_name[0]}{user.first_name[0]}</span>
                        <span className="users-title"  key={index}>{user.last_name} {user.first_name}</span>
                      </>
                      ))}</div>
                </div>
            ))}
        </div>
        {isClicked && (
            <div className="overlay" onClick={overlayClick}>
                <div className="note-create">
                    <div className="note-cnt">
                        <textarea className="title" placeholder="Edit title note" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea className="cnt" placeholder="Edit note description here" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className="select-users">
                        <label>Shared with: </label>
                        <select multiple onChange={(e) => setShared_with([...e.target.selectedOptions].map(opt => opt.value))}>
                            {users.map((user, index) => (
                                <option key={index} value={user.id}>{user.last_name} {user.first_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="note-buttons">
                        <button type="submit" className="note-button clear" onClick={handleClear}>Clear</button>
                        <button type="submit" className="note-button save" onClick={(e) => handleEdit(e, selectedNoteId)}>Save</button>
                    </div>
                </div>
            </div>
          )}
      </div>
    </div>

  );
};

export default AllNotes;
