import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
 
  return (
    <div className="nav-container bg-body" >

        <div className='logo'><img src="./images/flipkartLogo.png" alt="" /> </div>

        <div className='menu'>
            <ul className='menu-items'>
                <Link to="/"><li>Home</li></Link>
                <Link to="/newarrivals"><li>New Arrivals</li></Link>
                <Link to="/products"><li>Fashion</li></Link>
                <Link to="/contact"><li>Contact Us</li></Link>
                <Link to="/cart"><li><i className="fa-solid fa-cart-shopping"></i></li></Link>
                <Link to="/login" ><li><i className="fa-solid fa-user"></i></li></Link>
            </ul>
        </div>
        
    </div>
  )
}

export default Navbar