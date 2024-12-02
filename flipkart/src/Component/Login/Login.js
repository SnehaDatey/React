import React, {useState} from 'react'
import './LoginSignup.css'
import { useNavigate, Link  } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/signup'); // Replace '/target-path' with the desired route
  };

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const inputEmail = (e) => {
    setEmail(e.target.value);  // Update state with input value
  };

  const inputPass = (e) => {
    setPass(e.target.value);  // Update state with input value
  };

  const getLoginData = () => {
    console.log("Email:", email);  
    console.log("pass:",pass)
  };



  return (
    <div className='login-container bg-body'>
      
        <div className='login-details '>
          <h2>Login</h2>
            
            <div className='inputs'><input type="email" value={email} onChange={inputEmail} placeholder=" Email" /></div>
            <div className='inputs'><input type="password" value={pass} onChange={inputPass} placeholder=" Password" /></div>

        </div>

        <div>
          <p > <Link to="/" > Forgot Password</Link></p>
        </div>

        <div className='Login-btn'>
          <button className='loginButtons' onClick={getLoginData}>Login</button>  
          <button className='loginButtons' onClick={goToSignup}>SignUp</button>
        </div>


    </div>
  )
}

export default Login