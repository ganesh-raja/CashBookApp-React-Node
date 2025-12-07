import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Category from './Category'
import Records from './Records'
import PopupModel from './PopupModel'

const BookDetail = ({ api, loginStatus, LoggedOut, bookName }) => {
  const { id } = useParams()   

  const [catTitle, setCatTitle] = useState("")
  const [catElement, setCatElement] = useState(null)
  
  const [newCategory, setNewCategory] = useState("")
  const [loadCategory, setLoadCategory] = useState([])
  const [catActive, setCatActive] = useState(false)
  const [categoryMap, setCategoryMap] = useState({})
  
  let bookTitle = bookName[id]

  if (bookTitle === undefined) {
    bookTitle = localStorage.getItem("bookname")
  }
  else{
    localStorage.setItem("bookname", bookTitle)
  }

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

    if (!res.ok) {
      console.error("Failed to fetch category:", data);
      LoggedOut();      
      return;
    }

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
    <div className='container p-3'>
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-between mb-3">
          <Link to="/books" className='btn btn-secondary'>Back</Link>
          <button type='button' className="btn btn-outline-danger" onClick={LoggedOut}>Logout</button>
        </div> 
        <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-6 text-stast text-sm-end">
                <h4>Book</h4>
              </div>
              {bookTitle &&
              <div className="col-12 col-sm-6">
                <h4><span className='text-success'><strong>{bookTitle || ""}</strong></span></h4>
              </div>
              }
            </div>
          </div>
        </div>    
        </div> 
      </div>
      <Records
        id={id}
        api={api}
        loginStatus={loginStatus}
        loadCategory={loadCategory}
        categoryMap={categoryMap}
        LoggedOut={LoggedOut}        
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
        LoggedOut={LoggedOut}
        setCatTitle={setCatTitle}
        setCatElement={setCatElement}
      />
       <PopupModel api={api} loginStatus={loginStatus} 
        modelTitle={catTitle}
        formElement={catElement}
        catActive={catActive}
        setCatActive={setCatActive}       
       />
    </div>
  )
}

export default BookDetail
