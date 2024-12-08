import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UpdatePwd = ({onClose}) => {
  const [current_password, setCurrent_password] = useState('');
  const [new_password, setNew_password] = useState('');
  const [new_password_confirmation, setNew_password_confirmation] = useState('');
  const [alert, setAlert] = useState({mssg: '', type: ''});
  const [showPasswords, setShowPasswords] = useState({new: false, confirm: false,});
  const navigate = useNavigate();


  useEffect(() => {
    if (alert.mssg) {
      const timer = setTimeout(() => {
        setAlert({ mssg: '', type: '' });
      }, 3000); 
  
      return () => clearTimeout(timer); 
    }
  }, [alert]);


  const handleChangePsw = async(e) =>{
    e.preventDefault();
    if (new_password !== new_password_confirmation) {
      console.log("psw doesn't match");
      
      setAlert({ mssg: "Passwords do not match", type: "error" });
      return;
    }
    try{
      const token = localStorage.getItem('token');
      await axios.put('https://notes.devlop.tech/api/update-password',{current_password, new_password, new_password_confirmation},{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      console.log('success');
      setAlert({mssg:'Password updated successfully', type: 'success'});
      setCurrent_password('');
      setNew_password('');
      setNew_password_confirmation('');
      setAlert({ mssg: '', type: '' });
      onClose();
      navigate('/');
    }catch(e){
      
      setAlert({mssg: e.response?.data?.message || "Failed to change password", type: 'error'})
      console.log('Error updating password', e);
      
    }
  }
  const overlayClick = () => {
    onClose();
  };

  const togglePasswordVisibility = (pwd) => {
    setShowPasswords((prev) => ({
      ...prev,
      [pwd]: !prev[pwd],
    }));
  };


  const EyeIcon = ({ isVisible, onClick }) => (
    <span className="toggle-eye" onClick={onClick}>
      {isVisible ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        
      ):(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" x2="23" y1="1" y2="23" />
        </svg>
      )
    }
    </span>
  );

  return (
    <>
      <div className='overlay' onClick={overlayClick}>
          </div>
            <form className='login-form out' onSubmit={handleChangePsw}>
                <h4>Change Password</h4>
                <input type="text" value={current_password} placeholder="Current Password"  onChange={(e) => setCurrent_password(e.target.value)}/>
                <div className='password-field'>
                    <input type={showPasswords.new ? "text" : "password"} value={new_password} placeholder="New Password"  onChange={(e) => setNew_password(e.target.value)}/>
                    <EyeIcon isVisible={showPasswords.new} onClick={() => togglePasswordVisibility("new")}/>
                </div>
                <div className='password-field'>
                    <input type={showPasswords.confirm ? "text" : "password"} value={new_password_confirmation} placeholder="Confirm New Password" onChange={(e) => setNew_password_confirmation(e.target.value)}/>
                    <EyeIcon isVisible={showPasswords.confirm} onClick={() => togglePasswordVisibility("confirm")}/>
                </div>

                <button>SUBMIT</button>

            </form>
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
  )
}

export default UpdatePwd;
