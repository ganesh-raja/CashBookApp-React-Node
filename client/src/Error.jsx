import React from 'react'
import { Link } from 'react-router'

const Error = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        The page you’re looking for doesn’t exist or may have been moved.
        Let’s get you back on track!
      </p>
      <Link to="/" className="home-btn">Go Back Home</Link>
    </div>
  )
}

export default Error
