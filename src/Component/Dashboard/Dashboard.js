import React from 'react'
import './Dashboard.css'
import { Posts } from '../Posts'

const Dashboard = () => {
  return (
    <div className='container'>
        <h2 className='text-center'>Book Management - CRUD APP</h2>
        <div className='main-section'>
          <Posts />
        </div>
    </div>
  )
}

export default Dashboard