import React, { useState } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../icon.svg';

function Login(props) {
    const [cin, setCin] = useState("JK42338");
    const [password, setPassword] = useState("123456");

    const handleSubmit = async(e) => {  
        e.preventDefault();
        const url = `https://notes.devlop.tech/api/login`;
        let response = await axios.post(url,{cin, password});
        console.log(response);
        
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        props.setIsConnected(true);
    }

    return (
      <>
          <div className='background-login'>
            <img src={img} alt="not found"/>
          </div>
            <form className='login-form' onSubmit={handleSubmit}>
                <h3>Login Here</h3>

                <input type="text" value={cin} placeholder="CIN" id="username" onChange={(e) => setCin(e.target.value)}/>

                <input type="password" value={password} placeholder="PASSWORD" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button>SUBMIT</button>

            </form>
      </>
    );
  }
  
  export default Login;

