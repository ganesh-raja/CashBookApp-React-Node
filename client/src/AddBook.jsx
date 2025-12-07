import React from 'react'

const AddBook = ({ setModelTitle, setFormElement }) => {  

  const openAddForm = () => {
    const form = document.getElementById("model-form");
    form.reset();
    setModelTitle("Add Book");
    setFormElement(
      <>
        <div className="form-group mb-2">
          <label htmlFor='book-title' className="form-label">Book Title</label>
          <input type="text" className="form-control" id="book-title" placeholder='Enter book title'/>
        </div>
        <input type="hidden" id="bookaction" defaultValue="ADD"/>
        <input type="hidden" id="bookid" defaultValue=""/>
        <div className="form-group mb-2">
          <label htmlFor='book-des' className="form-label">Book Description</label>
          <textarea className="form-control" id="book-des" placeholder='Enter book description'></textarea>
        </div>
        <div className="form-group text-center mt-3 ">
            <button className='btn btn-primary me-3' type='submit'>Submit</button>
            <button className='btn btn-secondary' data-bs-dismiss='modal' id='closetab' type='button'>Close</button>
        </div>
      </>
    );
  }  

  return (
    <button className="btn btn-primary" onClick={openAddForm} type='button' data-bs-toggle='modal' data-bs-target='#popup-modal'>Add Book</button>
  )
}

export default AddBook
