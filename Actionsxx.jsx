import axios from 'axios';
import React, { useState } from 'react'

const Actions = ({onSearch, data, id, users}) => {

  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);

  const [title, setTitle] = useState(data?.title || '');
  const [content, setContent] = useState(data?.content || '');
  const [shared_with, setShared_with] = useState(data?.shared_with || []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  }

  const toggleMenu = () => {
    setIsActive(prev => !prev);
  };

  const handleClickEdit = () =>{
    setIsEditActive(prev => !prev);
  }

  const overlayClick = (e) => {
    if (e.target.className === 'overlay'){
      setIsEditActive(false);
    }
  };

  const handleClear = (e) =>{
    e.preventDefault();
    setTitle('');
    setContent(''); 
}

const handleEdit = async(e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try{
      const response = await axios.put(`https://notes.devlop.tech/api/notes/${id}`,{title, content, shared_with}, {
      headers: {
        Authorization : `Bearer ${token}`,
      },
    });
    console.log('updated successfully',  response.data);
  }catch(e){
    console.log('Error updating the note',e);
  }
  
}

  return (
    <>
    <div className="app-content-actions">
      <form onSubmit={handleSearch}>
        <input onChange={e=>setSearchValue(e.target.value)} className="search-bar" placeholder="Search by title, or content..." type="text"/>
      </form>
      <div className="app-content-actions-wrapper">
        <div className="filter-button-wrapper">
          <button onClick={toggleMenu} className="action-button filter jsFilter"><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></button>
          <div className={`filter-menu ${isActive ? "active" : ""}`}>
            <label>Color</label>
            <select>
              <option>All colors</option>
              <option>yellow</option>                     
              <option>Pink</option>
              <option>Blue</option>
            </select>
            <label>Status</label>
            <select>
              <option>All Status</option>
              <option>Active</option>
              <option>Disabled</option>
            </select>
            <div className="filter-menu-buttons">
              <button className="filter-button reset">
                Reset
              </button>
              <button className="filter-button apply">
                Apply
              </button>
            </div>
          </div>
        </div>
        <button className={`action-button edit ${isEditActive? "active" : ""}`} title="Edit" onClick={handleClickEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
        <button className="action-button grid active" title="Grid View">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </button>
      </div>
    </div>
    {isEditActive &&
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
                                      <option key={index} value={user.id} onChange={e => setShared_with(e.target.value)}>{user.last_name} {user.first_name}</option>
                                  ))}
                              </select>
                          </div>
                          <div className="note-buttons">
                            <button type="submit" className="note-button clear" onClick={handleClear}>Clear</button>
                            <button type="submit" className="note-button save" onClick={handleEdit}>Save</button>
                        </div>
                      </div>
        
                    </div>
    }
  </>
  )
}

export default Actions
