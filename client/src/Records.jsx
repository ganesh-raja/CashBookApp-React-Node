import React, { useEffect, useState } from 'react'
import InnerRecords from './InnerRecords'
import PopupModalInner from './PopupModalInner'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const Records = ({ api, loginStatus, id, categoryMap, LoggedOut }) => {
    
  const bookId = id

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [date, setDate] = useState(new Date());

  const [recordTitle, setRecordTitle] = useState("")
  const [recordElement, setRecordElement] = useState(null)

  const [records, setRecords] = useState([])

  const editRecord = async (bid) => {
    const res = await fetch(`${api}/books/${bookId}/records`, {
      headers: { Authorization: `Bearer ${loginStatus}` },
    });
    const data = await res.json();
    const rec = data.data.find(x => x._id === bid);
    if (!rec) return;

    document.getElementById("recordId").value = rec._id;
    document.getElementById("type").value = rec.type;
    document.getElementById("amount").value = rec.amount;
    const datetime = new Date(rec.date);
    setDate(datetime);
    document.getElementById("remarks").value = rec.remarks || "";
    document.getElementById("category").value = rec.category_id || "";
    document.getElementById("amount").focus()
  }

  const loadRecords = async () => {
    const res = await fetch(`${api}/books/${bookId}/records?page=${pageNumber}`, {
      headers: { Authorization: `Bearer ${loginStatus}` }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to fetch book records:", data);
      LoggedOut();
      return;
    }

    document.getElementById("cashIn").innerText = data.totals.cashIn;
    document.getElementById("cashOut").innerText = data.totals.cashOut;
    document.getElementById("totalAmount").innerText = data.totals.totalAmount;

    setRecords(data.data)

    if (!data.data.length) {
      return;
    }

    const newTotalPages = data.pagination.totalPages;
    setTotalPages(newTotalPages);

  }

  useEffect(() => {
    loadRecords();
  }, [pageNumber]);

  const recordForm = async (e) => {
    e.preventDefault();
    const id = document.getElementById("recordId").value;
    const payload = {
      type: document.getElementById("type").value,
      amount: parseFloat(document.getElementById("amount").value),
      date: document.getElementById("date").value,
      remarks: document.getElementById("remarks").value,
      category_id: document.getElementById("category").value || null,
    };

    const url = id
      ? `${api}/books/${bookId}/records/${id}`
      : `${api}/books/${bookId}/records`;
    const method = id ? "PUT" : "POST";     

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
      body: JSON.stringify(payload),
    });

    if (method === "PUT") {
      toast.warning("Record details have been updated.", { autoClose:2000 })
    }
    else{
      toast.info("A new record has been added.", { autoClose:2000 })
    }

    resetRecord();
    loadRecords();
  }

  const resetRecord = () => {
    document.getElementById("recordForm").reset();
    document.getElementById("recordId").value = "";
    setDate(new Date())
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row my-2 text-center">
            <div className="col-12 col-sm-4 mb-2">
              <div className="alert alert-success mb-0 p-2 px-3">Cash In: ₹<span id="cashIn"></span></div>
            </div>
            <div className="col-12 col-sm-4 mb-2">
              <div className="alert alert-danger mb-0 p-2 px-3">Cash Out: ₹<span id="cashOut"></span></div>
            </div>
            <div className="col-12 col-sm-4 mb-2">
              <div className="alert alert-info mb-0 p-2 px-3">Total: ₹<span id="totalAmount"></span></div>
            </div>
          </div>
          <h5 className='card-title my-3'>Add / Update Record</h5>
          <form id="recordForm" onSubmit={recordForm}>
            <input type="hidden" id="recordId" />
            <div className="row">
              <div className="col-12 mb-2">
                <label htmlFor="date">Date</label>&nbsp;&nbsp;
                <DatePicker
                  id="date"
                  selected={date}
                  onChange={(d) => setDate(d)}
                  dateFormat="MM-dd-yyyy"
                  className="form-control custom-date-input"
                  placeholderText="MM-DD-YYYY"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor='type' className='form-label'>Type</label>
                <select id="type" className="form-select">
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor='amount' className='form-label'>Amount</label>
                <input type="number" id="amount" className="form-control" required />
              </div>
              <div className="col-md-4">
                <label htmlFor='category' className='form-label'>Category</label>
                <select id="category" className="form-select"></select>
              </div>
              <div className="col-12 mt-3">
                <label htmlFor='remarks' className='form-label'>Remarks</label>
                <input type="text" id="remarks" className="form-control" />
              </div>
              <div className="col-12 mt-3 text-center">
                <button type="submit" className="btn btn-primary me-3">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => resetRecord()}>Clear</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
          <h5 className='card-title'>Records</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className='table table-bordered table-hover table-fixed'>
              <thead className='table-primary text-center'>
                <tr>
                  <th style={{ "width": "10%" }}>Date</th>
                  <th style={{ "width": "10%" }}>Type</th>
                  <th style={{ "width": "20%" }}>Amount</th>
                  <th style={{ "width": "20%" }}>Category</th>
                  <th style={{ "width": "20%" }}>Remarks</th>
                  <th style={{ "width": "20%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 &&
                  records.map(innerItem =>
                    <InnerRecords key={innerItem._id} api={api} id={id} innerItem={innerItem} loginStatus={loginStatus} editRecord={editRecord}
                      categoryMap={categoryMap}
                      resetRecord={resetRecord}
                      loadRecords={loadRecords}
                      setRecordTitle={setRecordTitle}
                      setRecordElement={setRecordElement}
                    />
                  )
                }
                {records.length == 0 &&
                  <tr className='text-center'>
                    <td colSpan='6'>No books found</td>
                  </tr>
                }
              </tbody>
            </table>
            <ul className="pagination justify-content-center my-3">
              <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link"
                  onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                >
                  Prev
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link" id='page-info'>                  
                  Page {pageNumber} / {totalPages}
                </span>
              </li>
              <li className={`page-item ${pageNumber === totalPages ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link"
                  onClick={() => pageNumber < totalPages && setPageNumber(pageNumber + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
        <PopupModalInner api={api} loginStatus={loginStatus}
          resetRecord={resetRecord}
          loadRecords={loadRecords}
          recordTitle={recordTitle}
          recordElement={recordElement}
        />
      </div>
    </>
  )
}

export default Records
