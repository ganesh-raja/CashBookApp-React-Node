import React from 'react'

const InnerRecords = ({ innerItem, id, editRecord, categoryMap, setRecordTitle, setRecordElement }) => {

  const bookId = id

  const deleteRecord = async (rid, rtype, ramt) => {
    const form1 = document.getElementById("model-form1");
    form1.reset();
    setRecordTitle("Are you sure to delete this record?")
    setRecordElement(
      <>
        <div className="mb-2">          
          <span><i>Record (Type / Amount): </i><strong>{rtype.toUpperCase()+" / ₹"+ramt}</strong></span>
        </div>              
        <input type="hidden" id="action" defaultValue="RDELETE"/> 
        <input type="hidden" id="bookid1" defaultValue={bookId}/> 
        <input type="hidden" id="actionid" defaultValue={rid}/> 
        <div className="form-group text-center mt-3 ">
            <button className='btn btn-danger me-3' type='submit'>Delete</button>
            <button className='btn btn-secondary' data-bs-dismiss='modal' id='closetab1' type='button'>Close</button>
        </div>
      </>
    )   
  }  

  return (
    <tr>
      <td>{new Date(innerItem.date).toLocaleDateString()}</td>
      <td className='text-center'><span className={innerItem.type === "in" ? "badge bg-success" : "badge bg-danger"}>{innerItem.type}</span></td>
      <td>{innerItem.amount}</td>
      <td>{innerItem.category_id ? (categoryMap[innerItem.category_id] || "Unknown") : "-"}</td>
      <td>{innerItem.remarks || ""}</td>
      <td className='text-center'>
        <div className='btn-group'>
        <button type='button' className="btn btn-warning btn-group" onClick={() => editRecord(innerItem._id)}><i className="bi bi-pencil-square"></i></button>
        <button type='button' className="btn btn-danger btn-group" onClick={() => deleteRecord(innerItem._id, innerItem.type, innerItem.amount)}
          data-bs-toggle='modal' data-bs-target='#popup-modal1'
        ><i className="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  )
}

export default InnerRecords
