import React from 'react'
import { Link } from 'react-router'

const Home = ({LoggedOut}) => {
  return (
    <div className='Home-container'>
        <h3>Cash Book</h3>
        <Link to="/register" className='ancLink'><button type='button' className="btn register-btn">Register</button></Link>        
        <button type='button' className="btn logout-btn" onClick={LoggedOut}>Logout</button>
        <Link to="/books" className='ancLink'><button type='button' className="btn manage-btn">Manage Books</button></Link>        
    </div>
  )
}

export default Home
