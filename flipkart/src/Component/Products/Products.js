import React,{ useState, useEffect } from 'react'
import './Products.css'

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Effect: Fetch user data from an API
        fetch('https://fakestoreapi.com/products')
          .then(response => response.json())
          .then(data => setProducts(data));
      }, []); // Empty dependency array, runs only once after the first render
      
  return (
    <div className='product-container'>
        <div className='productItems'>
        {products.map(product => (
          <div className="productcard" key={product.id}>
            <img src={product.image} alt={product.title} className='product-image' />
            <p>Price :{product.price}</p>
            <p className="product-title">{product.title}</p>

            <div className="btn-container">
            <button className="btn btn-primary add-to-cart-btn">Add to Cart</button>
        </div>
          </div>
          ))}
        </div>
    </div>
  )
}

export default Products