import React from 'react'

const AddBook = ({ api, loginStatus, bookStatus, setBookStatus }) => {

  const BookAdd = async () => {
    const title = prompt("Enter book title:");
    if (!title) return;
    const description = prompt("Enter description:");
    await fetch(`${api}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
      body: JSON.stringify({ title, description }),
    });
    setBookStatus(!bookStatus)
  }

  return (
    <button className="btn add-btn" onClick={BookAdd}>Add Book</button>
  )
}

export default AddBook
