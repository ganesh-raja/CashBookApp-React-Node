import React from 'react'

const PopupModalCat = ({ api, loginStatus, catTitle, catElement, catActive, setCatActive }) => {

    const catForm = async (e) => {
        e.preventDefault();
        
        const caction = document.getElementById("cataction").value
        const bookid = document.getElementById("bookid").value
        const catid = document.getElementById("catid").value

        if (caction === "CDELETE") {

            await fetch(`${api}/books/${bookid}/categories/${catid}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${loginStatus}` },
            });
            setCatActive(!catActive)

            document.getElementById('closetab2').click();            
            setCatActive(!catActive);
            return;

        }

        if (caction === "CEDIT") {
            const catInput = document.getElementById("catname")
            const name = catInput.value.trim()

            if (!name) {
                catInput.focus();
                return;
            }

            await fetch(`${api}/books/${bookid}/categories/${catid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
                body: JSON.stringify({ name }),
            });
            
            document.getElementById('closetab2').click();            
            setCatActive(!catActive);
            return;

        }
    }

  return (
    <div className='modal fade' id="popup-modal2">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <div className='modal-title'><h5>{catTitle}</h5></div>
                    <button className='btn-close' data-bs-dismiss='modal' type='button'></button>
                </div>
                <div className="modal-body">
                    <form id='model-form2' onSubmit={catForm}>
                        {catElement}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopupModalCat
