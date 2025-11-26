import { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { Route, Routes, useNavigate } from 'react-router';
import Home from './Home';
import Books from './Books';
import BookDetail from './BookDetail';
import Error from './Error';


function App() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("cashbook_token") || null)
  const apiBase = "http://localhost:4003/api"
  useEffect(() => {
    if (loginStatus === null) {
      navigate("/login")
    }
  }, [loginStatus])

  const LoggedOut = () => {
    localStorage.removeItem("cashbook_token")
    setLoginStatus(null)
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login
          api={apiBase}
          navigate={navigate}
          setLoginStatus={setLoginStatus}
        />} />
        <Route path="/register" element={<Register
          api={apiBase}
          navigate={navigate} />} />
        <Route path="/" element={<Home LoggedOut={LoggedOut} />} />
        <Route path="/books">
          <Route index element={<Books
            api={apiBase}
            loginStatus={loginStatus}
            LoggedOut={LoggedOut} />} />
          <Route path=":id" element={<BookDetail
            api={apiBase}
            loginStatus={loginStatus}
            LoggedOut={LoggedOut}
          />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>

    </>
  )
}

export default App
