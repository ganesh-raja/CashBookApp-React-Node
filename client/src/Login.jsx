import React from 'react'
import { Link } from 'react-router'
import { useState, useEffect } from 'react'

const Login = ({ api, navigate, setLoginStatus }) => {

  useEffect(() => {
    if (localStorage.getItem("cashbook_token") !== null) {
      navigate("/")
    }
  }, [])

  const [logEmail, setLogEmail] = useState("")
  const [logPass, setLogPass] = useState("")
  const [logError, setLogError] = useState("")

  const LoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: logEmail, password: logPass })
      });

      const data = await res.json()

      if (data.status === 1 || data.token) {
        localStorage.setItem("cashbook_token", data.token)
        setLoginStatus(data.token)
        setLogError("")
        navigate("/")
      }
      else {
        setLogError(data.message || "Login failed")
      }

    } catch (err) {
      setLogError(err.response.data.message || "Login failed")
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-lg-4 p-4 border border-2 rounded">
          <form className='loginFrom' onSubmit={LoginSubmit}>
            <div className='text-center'>
              <h4>Login</h4>
              <span className="text-danger">{logError}</span>
            </div>
            <hr className='w-100'/>            
            <div className='mt-3'>
              <label htmlFor="lemail" className='form-label'>Email</label>
              <input type="text" id='lemail' name='lemail' className='form-control' required autoFocus
                value={logEmail}
                onChange={(e) => setLogEmail(e.target.value)}
              />
            </div>
            <div className='mt-3'>
              <label htmlFor="lpass" className='form-label'>Password</label>
              <input type="password" id='lpass' name='lpass' className='form-control' required
                value={logPass}
                onChange={(e) => setLogPass(e.target.value)}
              />  
            </div>
            <div className='mt-3 text-center'>
              <button type='submit' className='btn btn-outline-primary'>Login</button>
            </div>
            <div className='mt-3 text-center'>
              <Link to="/Register">Don't have an account? Register here</Link>
            </div>        
          </form>
        </div>
      </div>
    </div>    
  )
}

export default Login
