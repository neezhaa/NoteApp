import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [activeItem, setActiveItem] = useState("all-notes");
    const [user, setUser] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    const handleClick = (item) => {
        setActiveItem(item);
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.first_name && user.last_name) {
          setUser(`${user.first_name[0]}${user.last_name[0]}`);
          setUserName(`${user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase()} ${user.last_name[0]}.`);
        }
    }, []);


  return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="app-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className='path' d="M29.4187 1.25L23.0125 3.11313L25.6062 1.3575C23.9687 1.7275 21.9 2.45125 19.3 3.61937L15.0562 8.04375L16.5625 4.95312C15.1062 5.76313 13.5625 6.825 12.075 8.06875L11.0875 12.0875L10.875 9.1125C9.40624 10.4625 8.02499 11.9625 6.88124 13.5437C5.67937 15.2 4.73999 16.95 4.26937 18.6938L2.51187 17.5187C2.66937 19 3.15624 20.2875 3.95499 21.4688L1.85374 20.825C2.33124 22.2938 3.11187 23.2438 4.43187 24.0125C3.69249 26.0938 3.34562 28.2687 2.97312 30.4375L4.12312 30.6313C5.45687 17.3375 14.8687 8.8625 23.375 5.1075L23.8062 6.19375C16.2 9.6 10.2875 15.35 7.19374 23.6375C8.32499 23.6438 9.43124 23.5062 10.4562 23.2437L10.7625 19.4375L11.5812 22.9062C12.2625 22.6562 12.8875 22.3563 13.4437 22.0063L12.15 19.2875L14.2 21.4625C14.7 21.0625 15.1125 20.6125 15.425 20.1187C17.325 17.15 19.3125 14.2 23.225 11.7312L20.3687 10.7188L24.75 10.85C25.4625 10.4875 26.2125 10.0437 26.7812 9.625L23.675 9.375L28.3437 8.275C28.7062 7.9125 29.0437 7.53125 29.35 7.15C30.4312 5.77875 31.1625 4.35125 30.9875 3.05312C30.9062 2.40375 30.5187 1.79312 29.8875 1.45125C29.7312 1.37 29.5625 1.29812 29.4187 1.25Z" fill="#fff"/>
                        <line className='svg-line' x1="16" y1="30.5" x2="26" y2="30.5" stroke="#fff"/>
                    </svg>
                </div>
            </div>

            <ul className="sidebar-list">
                <li onClick={()=>handleClick('all-notes')} className={`sidebar-list-item ${activeItem === 'all-notes' ?"active":""}`}>
                    <a href="#!">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <span>All Notes</span>
                    </a>
                </li>
                <li onClick={()=>handleClick('archived-notes')} className={`sidebar-list-item ${activeItem === 'archived-notes' ?"active":""}`}>
                    <a href="#!">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <polyline points="21 8 21 21 3 21 3 8" />
                            <rect height="5" width="22" x="1" y="3" />
                            <line x1="10" x2="14" y1="12" y2="12" />
                        </svg>
                        <span>Archived Notes</span>
                    </a>
                </li>
                <li onClick={()=>handleClick('notifications')} className={`sidebar-list-item ${activeItem === 'notifications' ?"active":""}`}>
                    <a href="#!">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <span>Notifications</span>
                    </a>
                </li>
            </ul>

            <div className="account-info">
                <div className="account-info-picture">
                    <span className='user'>{user}</span>
                </div>
                <div className="account-info-name">{userName}</div>
                <button className="account-logout" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h6.403v1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h6.404v1zm10.846-4.461l-.702-.72l2.319-2.319H9.192v-1h8.887l-2.32-2.32l.702-.718L20 12z" />
                    </svg>                
                </button>
            </div>
        </div>

      
  )
}

export default Navbar
