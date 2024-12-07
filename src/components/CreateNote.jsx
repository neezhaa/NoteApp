import axios from "axios";
import React, {  useEffect, useState } from "react";

function CreateNote({onClose}){

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [users, setUsers] = useState([]);

    const handleCreate = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://notes.devlop.tech/api/notes', {title, content}, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            console.log('Note posted successfully:', response.data);
            onClose();
        } catch (error) {
            console.error('Error posting the note:', error);
        }
    }

    const handleClear = (e) =>{
        e.preventDefault();
        setTitle('');
        setContent(''); 
    }

    const handleSharedWith = async () => {
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
      handleSharedWith();
    }, [])
    
    

    const overlayClick = (e) => {
        if (e.target.className === 'overlay'){
            onClose();
        }
    }

    return(
        <>
            <div className="overlay" onClick={overlayClick}>
            <div className="note-create">
                <div className="note-cnt">
                    <textarea className="title" placeholder="Enter note title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="cnt" placeholder="Enter note description here"  value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="select-users">
                    <label>Shared with: </label>
                    <select  multiple>
                        {users.map((user,index)=>(
                            <option key={index} value={user.id}>{user.last_name} {user.first_name}</option>
                        ))}
                    </select>
                </div>
                <div className="note-buttons">
                <button type="submit" className="note-button clear" onClick={handleClear}>Clear</button>
                <button type="submit" className="note-button save" onClick={handleCreate}>Save</button>
            </div>
            </div>

            </div>
        </>

    );

}
export default CreateNote;

