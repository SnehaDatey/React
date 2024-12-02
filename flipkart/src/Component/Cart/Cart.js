import React, { useState } from 'react';
import axios from 'axios';

const Cart = () => {

  const APIurl = "https://jsonplaceholder.typicode.com/users";
  const [data ,setData] = useState([])
  console.log(data)
  
  const fetchData = async() => {
   const response =await axios.get(APIurl)
   setData(response.data)
  };

  return (
    <div>
      <button onClick={fetchData} className='btn btn-primary'> Fetch Data</button>
    </div>
  );
};

export default Cart;
