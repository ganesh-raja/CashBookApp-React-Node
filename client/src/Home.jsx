import React from 'react'
import { Link } from 'react-router'

const Home = ({ LoggedOut }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-lg-4 p-4 border border-2 rounded text-center">
            <h3>Cash Book</h3> 
            <hr />
            <div className='d-flex justify-content-between'>
              <Link to="/register"><button type='button' className='btn btn-primary'>Register</button></Link>            
              <Link to="/books"><button type='button' className='btn btn-success'>Manage Books</button></Link>            
              <button type='button' className='btn btn-danger' onClick={LoggedOut}>Logout</button>            
            </div>        
        </div>
      </div>
    </div>
  )
}

export default Home
