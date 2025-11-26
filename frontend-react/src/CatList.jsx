import React from 'react'

const CatList = ({id, cat, api, catActive, setCatActive, loginStatus}) => {  
  const bookId = id

  const editCategory = async (id, oldName) => {
    const name = prompt("Edit category:", oldName);
    if (!name) return;
    await fetch(`${api}/books/${bookId}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
      body: JSON.stringify({ name }),
    });
    setCatActive(!catActive)
  }

  const deleteCategory = async(id) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`${api}/books/${bookId}/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${loginStatus}` },
    });
    setCatActive(!catActive)
  }

  return (
    <li className='cat-list-li'>{cat.name} 
    <button type='button' className="editcat" onClick={()=>editCategory(cat._id, cat.name)}>Edit</button>
    <button type='button' className="deletecat" onClick={()=>deleteCategory(cat._id)}>Delete</button>
    </li>
  )
}

export default CatList
