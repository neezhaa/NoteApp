import axios from "axios";
import React, { useEffect, useState } from "react";

function CreateNote({onClose}){

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [users, setUsers] = useState([]);
    const [shared_with, setShared_with] = useState([]);

    const [alert, setAlert] = useState({mssg: '', type: ''});


    const handleCreate = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://notes.devlop.tech/api/notes', {title, content, shared_with}, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            setAlert({mssg: 'Note created successfully!', type: 'success'});
            console.log('Note posted successfully:', response.data);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            setAlert({mssg: 'Failed to create note!', type: 'error'})
            console.error('Error posting the note:', error);
        }
    }

    const handleClear = (e) =>{
        e.preventDefault();
        setTitle('');
        setContent(''); 
    }

    const getUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('https://notes.devlop.tech/api/users', {
                headers: { Authorization: `Bearer ${token}` }, 
            });
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
      getUsers();
    }, [])
    
    

    const overlayClick = (e) => {
        if (e.target.className === 'overlay'){
            onClose();
        }
    }

    const handleSharedWith = (e) => {

        const userId = parseInt(e.target.getAttribute('value'), 10);
        if (!shared_with.includes(userId)) {
            setShared_with((prev) => [...prev, userId]);
        }
    
    };

    useEffect(() => {
        if (alert.mssg) {
          const timer = setTimeout(() => {
            setAlert({ mssg: '', type: '' });
          }, 3000); 
      
          return () => clearTimeout(timer); 
        }
      }, [alert]);
    
    const showSelectUsers = () => {
        document.querySelector('.selectUsers').style.visibility = 'visible'
    };

    return(
        <>
            <div className="overlay" onClick={overlayClick}>
                <div className="note-create">
                    <div className="note-cnt">
                        <textarea className="title" placeholder="Enter note title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea className="cnt" placeholder="Enter note description here"  value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className="select-users">
                        <label onClick={showSelectUsers} > Shared with: </label>
                        <div className='selectUsers' multiple >
                            {users.map((user, index) => (
                                <option key={user.id || index} value={user.id} className='optionUser' onClick={handleSharedWith}>
                                    {user.last_name} {user.first_name}
                                </option>
                            ))}
                        </div>
                    </div>
                    <div className="note-buttons">
                        <button type="submit" className="note-button clear" onClick={handleClear}>Clear</button>
                        <button type="submit" className="note-button save" onClick={handleCreate}>Save</button>
                    </div>
                </div>

            </div>
            {alert.mssg && (
              <div className={`alert ${alert.type} ${alert.mssg ? '' : 'hidden'}`}>
                
                <div className='alert-mssg'>{alert.mssg}</div>
                <div className='alert-close' onClick={()=> setAlert({ mssg: '', type: '' })}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                
                </div>
              </div>
            )}
        </>

    );

}
export default CreateNote;

