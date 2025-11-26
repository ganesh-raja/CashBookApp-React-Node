import React, { useEffect, useState } from 'react'
import AddBook from './AddBook'
import BookRow from './BookRow'

const Books = ({ api, loginStatus, LoggedOut }) => {

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
      return;
    }

    if (data.data.length === 0 && page > 1) {
      const lastPage = data.pagination.totalPages;
      setCurrentPage(lastPage);
      return
    }

    setBookData(data.data);
    setCurrentPage(data.pagination.page);
    setTotalPages(data.pagination.totalPages);
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [bookStatus, currentPage]);


  return (
    <div className="books-container">
      <div className="books-header">
        <h3>Books</h3>
        <button className="btn logout-btn" onClick={LoggedOut}>Logout</button>
      </div>

      <AddBook api={api} loginStatus={loginStatus} bookStatus={bookStatus} setBookStatus={setBookStatus} />

      <div className="table-wrapper">
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="bookList">
            {bookData.length > 0 &&
              bookData.map(item =>
                <BookRow bookData={item} key={item._id} api={api} loginStatus={loginStatus} bookStatus={bookStatus} setBookStatus={setBookStatus}
                  setCurrentPage={setCurrentPage}
                />
              )}
            {bookData.length == 0 &&
              <tr><td colSpan='3' className="no-book">No books found</td></tr>
            }
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button id="prevBtn" className="btn page-btn"
          disabled={currentPage === 1}
          onClick={() => fetchBooks(currentPage - 1)}
        >Prev</button>
        {totalPages > 0 &&
          <span id="pageInfo" className="page-info">
            Page {currentPage} of {totalPages}
          </span>}
        <button id="nextBtn" className="btn page-btn"
          disabled={currentPage === totalPages || 0 === totalPages}
          onClick={() => fetchBooks(currentPage + 1)}
        >Next</button>
      </div>

    </div>
  )
}

export default Books
