import React from 'react'
import { Link } from 'react-router-dom';

const BookRow = ({bookData, api, loginStatus, bookStatus, setBookStatus, setCurrentPage}) => {

    const editBook = async(id, title, desc) => {
      const newTitle = prompt("Edit book title:", title);
      if (!newTitle) return;
      const newDesc = prompt("Edit description:", desc);
      await fetch(`${api}/books/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
          body: JSON.stringify({ title: newTitle, description: newDesc }),
      });
      setCurrentPage(1)
      setBookStatus(!bookStatus)
    }

    const deleteBook = async(id) => {
      if (!confirm("Are you sure to delete?")) return;
      await fetch(`${api}/books/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${loginStatus}` },
      });      
      setBookStatus(!bookStatus)
    }

  return (
    <tr>
        <td>{bookData.title}</td>
        <td>{bookData.description || ''}</td>
        <td>
          <Link to={`/books/${bookData._id}`}><button className="openbtn" >Open</button></Link>
          <button className="editcat" onClick={() =>{editBook(bookData._id, bookData.title, bookData.description || '')}}>Edit</button>
          <button className="deletecat" onClick={() =>{deleteBook(bookData._id)}}>Delete</button>
        </td>
    </tr>
  )
}

export default BookRow
