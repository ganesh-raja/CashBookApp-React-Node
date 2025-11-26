import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Category from './Category'
import Records from './Records'

const BookDetail = ({ api, loginStatus, LoggedOut }) => {
  const { id } = useParams()
  // console.log({id})

  const [newCategory, setNewCategory] = useState("")
  const [loadCategory, setLoadCategory] = useState([])
  const [catActive, setCatActive] = useState(false)
  const [categoryMap, setCategoryMap] = useState({})

  const handleCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return alert("Enter category name");
    await fetch(`${api}/books/${id}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
      body: JSON.stringify({ name: newCategory }),
    });
    setNewCategory("")
    setCatActive(!catActive)
  }

  const loadCategories = async () => {
    const res = await fetch(`${api}/books/${id}/categories`, {
      headers: { Authorization: `Bearer ${loginStatus}` },
    });
    const data = await res.json();

    const newMap = {};
    const select = document.getElementById("category");

    select.innerHTML = "<option value=''>-- None --</option>";

    data.data.map(cat => {
      newMap[cat._id] = cat.name;
      select.innerHTML += `<option value="${cat._id}">${cat.name}</option>`;
    });

    setCategoryMap(newMap)
    setLoadCategory(data.data)
  }

  useEffect(() => {
    loadCategories()
  }, [catActive])

  return (
    <div className='book-container'>
      <Link to="/books">Back</Link>
      <button type='button' className="btn logout-btn" onClick={LoggedOut}>Logout</button>
      <Records
        id={id}
        api={api}
        loginStatus={loginStatus}
        loadCategory={loadCategory}
        categoryMap={categoryMap}
      />
      <Category
        id={id}
        api={api}
        loginStatus={loginStatus}
        loadCategory={loadCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        catActive={catActive}
        setCatActive={setCatActive}
        handleCategory={handleCategory}
      />
    </div>
  )
}

export default BookDetail
