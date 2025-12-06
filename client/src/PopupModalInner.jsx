import React from 'react'

const PopupModalInner = ({ api, loginStatus, recordTitle, recordElement, resetRecord, loadRecords }) => {

    const recordDelete = async (e) => {
        e.preventDefault();

        const form1 = document.getElementById("model-form1")
        const action = document.getElementById("action").value
        const bookid1 = document.getElementById("bookid1").value
        const actionid = document.getElementById("actionid").value

        if (action === "RDELETE") {

            await fetch(`${api}/books/${bookid1}/records/${actionid}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${loginStatus}` },
            });

            document.getElementById('closetab1').click();
            form1.reset();
            loadRecords();
            resetRecord();
            return;

        }
    }

  return (
    <div className='modal fade' id="popup-modal1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <div className='modal-title'>{recordTitle}</div>
                    <button className='btn-close' data-bs-dismiss='modal' type='button'></button>
                </div>
                <div className="modal-body">
                    <form id='model-form1' onSubmit={recordDelete}>
                        {recordElement}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopupModalInner
