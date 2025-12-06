import React, { useEffect, useState } from 'react'
import InnerRecords from './InnerRecords'
import PopupModalInner from './PopupModalInner'

const Records = ({ api, loginStatus, id, categoryMap, LoggedOut }) => {

  let pageNumber = 1
  let totalPages = 1
  const bookId = id

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
    document.getElementById("date").value = rec.date.split("T")[0];
    document.getElementById("remarks").value = rec.remarks || "";
    document.getElementById("category").value = rec.category_id || "";
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

    totalPages = data.pagination.totalPages;

    document.getElementById("pageInfo").innerText = `Page ${pageNumber} / ${totalPages}`;
    document.getElementById("prevBtn").style.display = pageNumber > 1 ? "block" : "none";
    document.getElementById("nextBtn").style.display = pageNumber < totalPages ? "block" : "none";

  }

  useEffect(() => {
    loadRecords()
  }, [])

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

    resetRecord();
    loadRecords();
  }

  const resetRecord = () => {
    document.getElementById("recordForm").reset();
    document.getElementById("recordId").value = "";
  }

  const prevBtn = () => {
    if (pageNumber > 1) {
      pageNumber--;
      loadRecords();
    }
  }

  const nextBtn = () => {
    if (pageNumber < totalPages) {
      pageNumber++;
      loadRecords();
    }
  }

  return (
    <>
      <div className="card mb-4">
        <div className="d-flex gap-3 my-3">
          <div className="alert alert-success mb-0 p-2 px-3">Cash In: ₹<span id="cashIn"></span></div>
          <div className="alert alert-danger mb-0 p-2 px-3">Cash Out: ₹<span id="cashOut"></span></div>
          <div className="alert alert-info mb-0 p-2 px-3">Total: ₹<span id="totalAmount"></span></div>
        </div>
        <div className="card-body">
          <h5>Add / Update Record</h5>
          <form id="recordForm" onSubmit={recordForm} className="form-grid">
            <input type="hidden" id="recordId" />
            <div className="row g-2">
              <div className="col-md-2">
                <label htmlFor='type'>Type</label>
                <select id="type" className="form-select">
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor='amount'>Amount</label>
                <input type="number" id="amount" className="form-control" required />
              </div>
              <div className="col-md-3">
                <label htmlFor='date'>Date</label>
                <input type="date" id="date" className="form-control" required />
              </div>
              <div className="col-md-3">
                <label htmlFor='category'>Category</label>
                <select id="category" className="form-select"></select>
              </div>
              <div className="col-md-12 mt-2">
                <label htmlFor='remarks'>Remarks</label>
                <input type="text" id="remarks" className="form-control" />
              </div>
              <div className="col-md-12 mt-3">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => resetRecord()}>Clear</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="recordstable">
        <h5>Records</h5>
        <table className='rtable'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Remarks</th>
              <th width="18%">Action</th>
            </tr>
          </thead>
          <tbody id="recordList">
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
              <tr>
                <td colSpan='6' className="no-book">No books found</td>
              </tr>
            }
          </tbody>
        </table>
        <PopupModalInner api={api} loginStatus={loginStatus}
          resetRecord={resetRecord}
          loadRecords={loadRecords}
          recordTitle={recordTitle}
          recordElement={recordElement}
        />
        <div className='pagination1'>
          <button id="prevBtn" className="btn page-btn" style={{ "display": "none" }} onClick={() => prevBtn()}>Prev</button>
          <span id="pageInfo" className="page-info"></span>
          <button id="nextBtn" className="btn page-btn" style={{ "display": "none" }} onClick={() => nextBtn()}>Next</button>
        </div>
      </div>
    </>
  )
}

export default Records
