import React, {useState} from 'react'
import './LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const userDetails = {
    userName:"",
    email:"",
    passward:""
  }
  const [data, setData] = useState(userDetails);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({...data, [name]:value} )
  }
  //console.log(data)
  const handleSubmit= (e) => {

    e.preventDefault(); //a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh.


    if(data.name === "" || data.email === "" || data.passward === ""){
      alert("Please Enter Details")
    }
    else{
      const getData = JSON.parse(localStorage.getItem('user') || "[]");
      let arr = [] ;
      arr = [...getData];
      arr.push(data)
      localStorage.setItem("user", JSON.stringify(arr))
      alert("Signup Successfully!")
      navigate("/login");
    }
   
  }
  
  return (
    <div className='login-container bg-body'>
      <form onSubmit={handleSubmit}>
          <div className='login-details '>
            <h2>SignUp</h2>
            <div className='inputs'><input type="text" name='userName'  onChange={handleInput} placeholder="Username" /></div>
            <div className='inputs'><input type="email" name='email' onChange={handleInput} placeholder=" Email" /></div>
            <div className='inputs'><input type="password" name='password' onChange={handleInput} placeholder=" Password" /></div>

          </div>
        
        <div>
          <p>Already have an account? <Link to="/login"> Login</Link></p>
        </div>

        <div className='Login-btn'>
          {/* <button className='loginButtons' onClick={getLoginData}>Login</button>   */}
          <button className='loginButtons' >SignUp</button>
        </div>

        </form>
    </div>
  )
}

export default SignUp