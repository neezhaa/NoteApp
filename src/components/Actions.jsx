import React, { useState } from 'react';

const Actions = ({onSearch}) => {

  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  }

  const toggleMenu = () => {
    setIsActive(prev => !prev);
  };


  return (
    <>
    <div className="app-content-actions">
      <form onSubmit={handleSearch}>
        <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className="search-bar" placeholder="Search by title, or content..." type="search"/>
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
        <button className="action-button edit" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
        <button className="action-button grid active" title="Grid View">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </button>
      </div>
    </div>
  </>
  )
}

export default Actions
