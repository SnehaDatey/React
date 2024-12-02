import React, {useEffect, useState} from 'react'

const About = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Effect: Fetch user data from an API
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []); // Empty dependency array, runs only once after the first render


  return (
    <div className='product-container'>
        <div className='productItems'>
        {products.map(product => (
          <div className="productcard" key={product.id}>
            <img src={product.images[0]} alt={product.title} className='product-image' />
            <p>Price :{product.price}</p>
            <p>{product.title}</p>
          </div>
          ))}
        </div>
    </div>
  )
}

export default About