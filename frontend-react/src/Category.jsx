import React, { useEffect, useState } from 'react'
import CatList from './CatList'

const Category = ({id, api, loginStatus, loadCategory, newCategory, setNewCategory, catActive, setCatActive, handleCategory}) => {      
  return (
    <div className='catsection'>
      <form className='categoryForm' onSubmit={handleCategory}>
        <label htmlFor='category'>Categories</label>
        <input type="text" placeholder='New Category Name' id="category" name="category" value={newCategory} onChange={(e)=>setNewCategory(e.target.value)}/>
        &nbsp;&nbsp;
        <button type="submit" className='catebutton'>Add</button>
      </form>
      {loadCategory.length > 0 && (
        <ul className='cat-list'>
            {loadCategory.map(item => (
            <CatList key={item._id} id={id} cat={item} api={api} catActive={catActive} setCatActive={setCatActive} loginStatus={loginStatus}/>
            ))}
        </ul>
        )}  
    </div>
  )
}

export default Category
