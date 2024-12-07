import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();
    return (
      <>
        {
          isConnected?
          navigate('/notes')
          :
          <Login setIsConnected = {setIsConnected}/>
        }
      </>
    );
  }
  
  export default Home; 