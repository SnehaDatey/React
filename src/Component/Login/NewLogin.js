import React, { useState } from 'react';
import './Login.css';
import logo from '../../images/voteLogo.png';
import googleLogo from '../../images/googlelogo.webp';
import rightImg from '../../images/rightImg.png';
import { Link, useNavigate } from 'react-router-dom';


const NewLogin = ({ selectedRole }) => {
    const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Only used in Signup
    const [errors, setErrors] = useState({}); // Store validation error messages

    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const resetErrors = () => {
        setErrors({});
    };

    const handleSignup = () => {
        resetErrors();
        let validationErrors = {};

        if (!emailRegex.test(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

         // Validate Password
        if (password === "") {
            validationErrors.password = "Please enter a password";
        } else if (password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        // Validate Confirm Password
        if (confirmPassword === "") {
            validationErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        if (!selectedRole) {
            validationErrors.role = 'Please select a role';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const existingUser = localStorage.getItem(email);
        if (existingUser) {
            alert('User already exists. Please log in.');
            return;
        }

       // Save user data in localStorage
    const userData = {
        email: email,
        password: password,
        role: selectedRole
    };

    localStorage.setItem(email, JSON.stringify(userData)); // Store data as JSON
    alert('Signup successful! Please log in.');
    setIsSignup(false); // Switch to login mode after signup
    };

   // Handle Login
const handleLogin = () => {
    resetErrors();
    let validationErrors = {};

    if (!emailRegex.test(email)) {
        validationErrors.email = 'Please enter a valid email address';
    }

    // Validate Password
    if (password === "") {
        validationErrors.password = "Please enter a password";
    } else if (password.length < 6) {
        validationErrors.password = 'Password must be at least 6 characters long';
    }

    if (!selectedRole) {
        validationErrors.role = 'Please select a role';
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    // Retrieve stored user
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
        alert('User not found. Please sign up first.');
        return;
    }

    // Parse the stored user data
    const { password: storedPassword, role: storedRole } = JSON.parse(storedUser);

    // Check if password and role match
    if (storedPassword === password) {
        if (storedRole === selectedRole) {
            alert(`Welcome back, ${selectedRole}!`);
            // Store logged-in user data including role
            localStorage.setItem('loggedInUser', JSON.stringify({ email, role: selectedRole }));
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            alert(`Role mismatch! You signed up as a ${storedRole}. Please log in with the correct role.`);
        }
    } else {
        alert('Incorrect Credentials. Please try again.');
    }
};


    return (
        <div className='login-container container'>
            <div className='row col-12'>
                <div className='card-holder col-6'>
                    <div className='card-content'>
                        <div className="img-container">
                            <img src={logo} alt="logo" />
                        </div>

                        <h5 className="card-title fs-1">
                            {isSignup ? 'Sign Up' : `Welcome Back${selectedRole ? `, ${selectedRole}` : ''}`}
                        </h5>

                        <div className="shadow p-3 mt-5 mb-5 bg-body rounded goolgeLogoClass">
                            <img src={googleLogo} alt="GoogleLogo" /> {isSignup ? 'Sign Up With Google' : 'Login With Google'}
                        </div>

                        <div className='emailText mb-4'>{isSignup ? 'SIGN UP WITH EMAIL' : 'LOGIN WITH EMAIL'}</div>

                        <div className='inputGroup'>
                            <div className="input-group mb-4 flex-nowrap">
                                <input
                                    type="text"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                               
                            </div>

                            {errors.email && <div className="errorClass">{errors.email}</div>}

                            <div className="input-group mb-4 flex-nowrap">
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                
                            </div>

                            {errors.password && <div className="errorClass">{errors.password}</div>}

                            {isSignup && (
                            <div className="input-group flex-nowrap mt-2">
                                <input
                                    type="password"
                                    className={`form-control ${errors.confirmPassword ==='' ? 'cnfPassword' : ''}`}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            )}
 {/* Render error */}

                            {isSignup && (
                                 <div className="cnfPassword">{errors.confirmPassword}</div>
                            )}

                             
                             
                        </div>

                        {!isSignup && (
                                <div className="errorClass errorRole">{errors.role}</div>
                         )}
                        


                        <div className='forgotPassDiv d-flex justify-content-between mt-2'>
                            {!isSignup && (
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label">Keep me Logged In</label>
                                </div>
                            )}

                            {!isSignup && (<div className='forgotPassword'>
                                <Link to="/forgotpassword" >
                                    Forgot Password
                                </Link>
                            </div>
                            )}
                        </div>

                        <div className='loginBtn' onClick={isSignup ? handleSignup : handleLogin}>
                            {isSignup ? 'Sign Up' : 'Login'}
                        </div>

                        <div className='signupDiv'>
                           
                                <Link to="/" onClick={() => setIsSignup(!isSignup)}>
                                    {isSignup ? 'Already have an account? Login' : 'Dont have account yet? Sign Up'}
                                </Link>
                            </div>
                    </div>
                </div>

                <div className='card-holder2 col-6'>
                    <div className='rightDiv border bg-light'>
                        <div className='img-content'>
                            <h5 className="card-title fs-6">New Update Available</h5>
                            <p>We have added some new awesome features.</p>
                            <button className='learnMoreBtn'>LEARN MORE</button>
                        </div>

                        <div className='rightImgHolder'>
                            <img src={rightImg} alt="rightImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLogin;
