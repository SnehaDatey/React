import React from 'react'
import map from '../../Banner/map.png'

const Contact = () => {
  return (
    <div className='main-contact-container shadow-sm p-3 mb-5 mt-2 bg-body rounded'>
      <h2 className='text-center'>Contact us</h2>
          <div className='address-container d-flex border p-5'>
            <div className='leftContainer w-50'>
              <input type='text' className="form-control  mb-3" placeholder='Name'  id='userName'></input>

              <input type='email' className="form-control mb-3" placeholder='Email'  id='email'></input>

              <textarea className="form-control mb-3" id="message" placeholder='Your Message...' rows="6"></textarea>

            <div className='text-center'><button className='btn btn-primary w-50'>Submit</button></div>
            </div>
            <div className='rightContainer w-50 text-center'>
              <img src={map} alt="map" className="w-75" />
            </div>
          </div>
    </div>
  )
}

export default Contact