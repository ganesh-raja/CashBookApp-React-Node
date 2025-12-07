import React, { useEffect, useState } from 'react'
import AddBook from './AddBook'
import BookRow from './BookRow'
import PopupModel from './PopupModel'

const Books = ({ api, loginStatus, LoggedOut, setBookName }) => {

  const [modelTitle, setModelTitle] = useState("")
  const [formElement, setFormElement] = useState(null)

  const [bookData, setBookData] = useState([]);
  const [bookStatus, setBookStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  const fetchBooks = async (page = 1) => {
    const res = await fetch(`${api}/books?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${loginStatus}` },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to fetch books:", data);
      LoggedOut();
      return;
    }

    if (data.data.length === 0 && page > 1) {
      const lastPage = data.pagination.totalPages;
      setCurrentPage(lastPage);
      return
    }

    const newbook = {}

    data.data.map(item =>
      newbook[item._id] = item.title
    )

    setBookName(newbook)
    setBookData(data.data);
    setCurrentPage(data.pagination.page);
    setTotalPages(data.pagination.totalPages);
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [bookStatus, currentPage]);


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="container border boder-2 rounded p-4">
          <div className="row mb-3">
            <div className="col-12 text-start">
              <h3>Books</h3>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 d-flex justify-content-between">
              <AddBook api={api} loginStatus={loginStatus} bookStatus={bookStatus} setBookStatus={setBookStatus}
                setModelTitle={setModelTitle}
                setFormElement={setFormElement}
              />

              <button className="btn btn-outline-danger me-0" onClick={LoggedOut}>Logout</button>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="table-responsive table-rounded">
                <table className="table table-bordered table-hover table-fixed">
                  <thead className='table-primary text-center'>
                    <tr>
                      <th style={{ "width": "33%" }}>Title</th>
                      <th style={{ "width": "33%" }}>Description</th>
                      <th style={{ "width": "33%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookData.length > 0 &&
                      bookData.map(item =>
                        <BookRow bookData={item} key={item._id} api={api} loginStatus={loginStatus} bookStatus={bookStatus} setBookStatus={setBookStatus}
                          setCurrentPage={setCurrentPage}
                          setModelTitle={setModelTitle}
                          setFormElement={setFormElement}
                        />
                      )}
                    {bookData.length == 0 &&
                      <tr className='text-center'><td colSpan='3'>No books found</td></tr>
                    }
                  </tbody>
                </table>
              </div>


              <PopupModel api={api} loginStatus={loginStatus} bookStatus={bookStatus} setBookStatus={setBookStatus}
                modelTitle={modelTitle}
                formElement={formElement}
                setCurrentPage={setCurrentPage}
              />


              <ul className="pagination justify-content-center">
                <li className='page-item'>
                  <button id="prevBtn" className="btn btn-dark"
                    disabled={currentPage === 1}
                    onClick={() => fetchBooks(currentPage - 1)}
                  >Prev</button>
                </li>
                <li className='page-item m-2'>
                  {totalPages > 0 &&
                    <span id="pageInfo" className="">
                      <strong>Page {currentPage} of {totalPages}</strong>
                    </span>
                  }
                </li>
                <li className='page-item'>
                  <button id="nextBtn" className="btn btn-dark"
                    disabled={currentPage === totalPages || 0 === totalPages}
                    onClick={() => fetchBooks(currentPage + 1)}
                  >Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books
