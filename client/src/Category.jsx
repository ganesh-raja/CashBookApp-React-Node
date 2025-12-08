import React, { useState } from 'react'
import CatList from './CatList'
import PopupModalCat from './PopupModalCat'

const Category = ({ id, api, loginStatus, loadCategory, newCategory, setNewCategory, catActive, setCatActive, handleCategory }) => {
  
  const [catTitle, setCatTitle] = useState("")
  const [catElement, setCatElement] = useState(null)

  return (
    <div className='card'>
      <div className="card-header">
        <h5>Categories</h5>
      </div>
      <div className="card-body">
        <form className='categoryForm' onSubmit={handleCategory}>
          <div className="row">
            <div className="col-12 col-sm-9">
              <input type="text" placeholder='New Category Name' id="category" name="category" className='form-control'
                  value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required/>
            </div>
            <div className="col-12 col-sm-3 mt-2 mt-sm-0">
              <button type="submit" className='btn btn-primary'><i className="bi bi-plus-square"></i></button>
            </div>
          </div>          
        </form>
        {loadCategory.length > 0 && (
          <ul className='list-group mt-3'>
            {loadCategory.map(item => (
              <CatList key={item._id} id={id} cat={item} api={api} catActive={catActive} setCatActive={setCatActive} loginStatus={loginStatus} 
                setCatTitle={setCatTitle}
                setCatElement={setCatElement}
              />
            ))}
          </ul>
        )}
        <PopupModalCat api={api} loginStatus={loginStatus} catActive={catActive} setCatActive={setCatActive}
          catTitle={catTitle}
          catElement={catElement}
        />
      </div>
    </div>
  )
}

export default Category
