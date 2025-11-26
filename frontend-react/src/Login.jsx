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
    <form className='loginFrom' onSubmit={LoginSubmit}>
      <h4>Login</h4>
      <span id="errMsg">{logError}</span>
      <label htmlFor="lemail">Email</label>
      <input type="text" id='lemail' name='lemail' required autoFocus
        value={logEmail}
        onChange={(e) => setLogEmail(e.target.value)}
      />
      <label htmlFor="lpass">Password</label>
      <input type="password" id='lpass' name='lpass' required
        value={logPass}
        onChange={(e) => setLogPass(e.target.value)}
      />
      <button type='submit'>Login</button>
      <Link to="/Register">Don't have an account? Register here</Link>
    </form>
  )
}

export default Login
