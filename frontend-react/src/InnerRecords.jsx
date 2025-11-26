import React from 'react'

const InnerRecords = ({ api, innerItem, id, loginStatus, editRecord, categoryMap, resetRecord, loadRecords }) => {

  const bookId = id

  const deleteRecord = async (bid) => {
    if (!confirm("Delete this record?")) return;
    await fetch(`${api}/books/${bookId}/records/${bid}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${loginStatus}` },
    });
    loadRecords()
    resetRecord()
  }

  return (
    <tr>
      <td>{new Date(innerItem.date).toLocaleDateString()}</td>
      <td><span className={innerItem.type === "in" ? "badge success" : "badge danger"}>{innerItem.type}</span></td>
      <td>{innerItem.amount}</td>
      <td>{innerItem.category_id ? (categoryMap[innerItem.category_id] || "Unknown") : "-"}</td>
      <td>{innerItem.remarks || ""}</td>
      <td>
        <button type='button' className="editrecord" onClick={() => editRecord(innerItem._id)}>Edit</button>
        <button type='button' className="deletecat" onClick={() => deleteRecord(innerItem._id)}>Delete</button>
      </td>
    </tr>
  )
}

export default InnerRecords
