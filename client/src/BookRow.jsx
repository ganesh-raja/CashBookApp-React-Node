import React from 'react'
import { Link } from 'react-router-dom';

const BookRow = ({ bookData, setModelTitle, setFormElement }) => {

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

  return (
    <tr>
      <td>{bookData.title}</td>
      <td>{bookData.description || ''}</td>
      <td className='text-center'>
        <div className='form-group'>
        <Link to={`/books/${bookData._id}`}><button className="btn btn-info" ><i className="bi bi-folder2-open"></i></button></Link>
        <button className="btn btn-warning" onClick={() => { openEditForm(bookData._id, bookData.title, bookData.description || '') }}
            data-bs-toggle='modal' data-bs-target='#popup-modal'
          ><i className="bi bi-pencil-square"></i></button>
        <button className="btn btn-danger" onClick={() => { openDelForm(bookData._id, bookData.title) }}
            data-bs-toggle='modal' data-bs-target='#popup-modal'
          ><i className="bi bi-trash"></i></button>

        </div>
      </td>
    </tr>
  )
}

export default BookRow
