import React from 'react'

const CatList = ({ id, cat, setCatTitle, setCatElement }) => {
  const bookId = id

 const editCategory = (cid, coldName) => {
    const form2 = document.getElementById("model-form2");
    form2.reset();
    setCatTitle("Edit Category")
    setCatElement(
      <>
        <div className="form-group mb-2">
          <label htmlFor='catname' className="form-label">Category Name:</label>
          <input type="text" className="form-control" id="catname" placeholder='Enter Category name'
            defaultValue={coldName} 
          />
        </div>
        <input type="hidden" id="cataction" defaultValue="CEDIT"/>
        <input type="hidden" id="bookid" defaultValue={bookId}/> 
        <input type="hidden" id="catid" defaultValue={cid}/>        
        <div className="form-group text-center mt-3 ">
            <button className='btn btn-warning me-3' type='submit'>Submit</button>
            <button className='btn btn-secondary' data-bs-dismiss='modal' id='closetab2' type='button'>Close</button>
        </div>
      </>
    )
  } 
  

  const deleteCategory = (cid, cname) => {
    const form2 = document.getElementById("model-form2");
    form2.reset();
    setCatTitle("Are you sure to delete this category?")
    setCatElement(
      <>
        <div className="mb-2">          
          <span><i>Category: </i><strong>{cname}</strong></span>
        </div>              
        <input type="hidden" id="cataction" defaultValue="CDELETE"/>
        <input type="hidden" id="bookid" defaultValue={bookId}/> 
        <input type="hidden" id="catid" defaultValue={cid}/>

        <div className="form-group text-center mt-3 ">
            <button className='btn btn-danger me-3' type='submit'>Delete</button>
            <button className='btn btn-secondary' data-bs-dismiss='modal' id='closetab2' type='button'
              data-bs-toggle='modal' data-bs-target='#popup-modal2'
            >Close</button>
        </div>
      </>
    )       
  }  

  return (
    <li className='cat-list-li'>{cat.name}
      <button type='button' className="editcat" onClick={() => editCategory(cat._id, cat.name)}
        data-bs-toggle='modal' data-bs-target='#popup-modal2'  
      >Edit</button>
      <button type='button' className="deletecat" onClick={() => deleteCategory(cat._id, cat.name)}
        data-bs-toggle='modal' data-bs-target='#popup-modal2'
      >Delete</button>
    </li>
  )
}

export default CatList
