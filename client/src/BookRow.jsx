import React from 'react'
import { Link } from 'react-router-dom';

const BookRow = ({ bookData, api, loginStatus, bookStatus, setBookStatus, setModelTitle, setFormElement }) => {

  const openEditForm = (id, title, desc) => {
    const form = document.getElementById("model-form");
    form.reset();
    setModelTitle("Edit Book");
    setFormElement(
      <>
        <div className="form-group mb-2">
          <label htmlFor='book-title' className="form-label">Book Title</label>
          <input type="text" className="form-control" id="book-title" placeholder='Enter book title'
            defaultValue={title} 
          />
        </div>
        <input type="hidden" id="bookaction" defaultValue="EDIT"/>
        <input type="hidden" id="bookid" defaultValue={id}/>
        <div className="form-group mb-2">
          <label htmlFor='book-des' className="form-label">Book Description</label>
          <textarea className="form-control" id="book-des" placeholder='Enter book description'
            defaultValue={desc} 
          ></textarea>
        </div>
        <div className="form-group text-center mt-3 ">
            <button className='btn btn-warning me-3' type='submit'>Submit</button>
            <button className='btn btn-secondary' data-bs-dismiss='modal' id='closetab' type='button'>Close</button>
        </div>
      </>
    )
  }

  // const editBook = async (id, title, desc) => {
  //   const newTitle = prompt("Edit book title:", title);
  //   if (!newTitle) return;
  //   const newDesc = prompt("Edit description:", desc);
  //   await fetch(`${api}/books/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
  //     body: JSON.stringify({ title: newTitle, description: newDesc }),
  //   });
  //   setCurrentPage(1)
  //   setBookStatus(!bookStatus)
  // }

  const openDelForm = (id, title) => {
    const form = document.getElementById("model-form");
    form.reset();
    setModelTitle("Are you sure to delete this book?");
    setFormElement(
      <>
        <div className="mb-2">          
          <span><i>Book Title: </i><strong>{title}</strong></span>
        </div>              
        <input type="hidden" id="bookaction" defaultValue="DELETE"/> 
        <input type="hidden" id="bookid" defaultValue={id}/> 
        <div className="form-group text-center mt-3 ">
            <button className='btn btn-danger me-3' type='submit'>Delete</button>
            <button className='btn btn-secondary' data-bs-dismiss='modal' id='closetab' type='button'>Close</button>
        </div>
      </>
    )
  }

  // const deleteBook = async (id) => {
  //   if (!confirm("Are you sure to delete?")) return;
  //   await fetch(`${api}/books/${id}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${loginStatus}` },
  //   });
  //   setBookStatus(!bookStatus)
  // }

  return (
    <tr>
      <td>{bookData.title}</td>
      <td>{bookData.description || ''}</td>
      <td>
        <Link to={`/books/${bookData._id}`}><button className="openbtn" >Open</button></Link>
        <button className="editcat" onClick={() => { openEditForm(bookData._id, bookData.title, bookData.description || '') }}
            data-bs-toggle='modal' data-bs-target='#popup-modal'
          >Edit</button>
        <button className="deletecat" onClick={() => { openDelForm(bookData._id, bookData.title) }}
            data-bs-toggle='modal' data-bs-target='#popup-modal'
          >Delete</button>
      </td>
    </tr>
  )
}

export default BookRow
