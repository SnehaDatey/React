import React,{useState} from 'react'
import './Navbar.css'
import logo from '../../images/voteLogo.png';

const Navbar = ({ setSelectedRole }) => {

    const [selectedOption, setSelectedOption] = useState(''); 

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value); // Update the local state
        setSelectedRole(value);   // Pass the selected value to the parent component
    };


  return (
    <div className='nav-container'>
         <nav className="navbar navbar-expand-lg navbar-light bg-body">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img src={logo} alt="logo" /></a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="select-box-container">
                        <select 
                            id="role" 
                            name="role" 
                            className="select-box" 
                            value={selectedOption} // Controlled component
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled hidden>Login</option>
                            <option value="User">User</option>
                            <option value="Vendor">Vendor</option>
                        </select>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Navbar