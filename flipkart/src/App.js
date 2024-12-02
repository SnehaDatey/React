import './App.css';
import Contact from './Component/Contact/Contact';
import Login from './Component/Login/Login'
import About from './Component/Home/About';
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import Products from './Component/Products/Products';
import SignUp from './Component/Login/Signup';
import Cart from './Component/Cart/Cart';

import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';

function App() {

  return (
    <div className='mainContainer'>
      
      <Router>
      <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/newarrivals" element={<About />} />
    <Route path="/products" element={<Products />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
</Router>
    </div>
  );
}

export default App;
