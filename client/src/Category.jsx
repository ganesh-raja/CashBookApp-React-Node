import React, { useState } from 'react'
import CatList from './CatList'
import PopupModalCat from './PopupModalCat'

const Category = ({ id, api, loginStatus, loadCategory, newCategory, setNewCategory, catActive, setCatActive, handleCategory }) => {
  
  const [catTitle, setCatTitle] = useState("")
  const [catElement, setCatElement] = useState(null)

  return (
    <div className='catsection'>
      <form className='categoryForm' onSubmit={handleCategory}>
        <label htmlFor='category'>Categories</label>
        <input type="text" placeholder='New Category Name' id="category" name="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        &nbsp;&nbsp;
        <button type="submit" className='catebutton'>Add</button>
      </form>
      {loadCategory.length > 0 && (
        <ul className='cat-list'>
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
  )
}

export default Category
