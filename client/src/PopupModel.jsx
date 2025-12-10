import React from 'react'

const PopupModel = ({ api, loginStatus, bookStatus, setBookStatus, modelTitle, formElement, setCurrentPage }) => {

    const formSubmit = async (e) => {
        e.preventDefault();        
        
        const action = document.getElementById("bookaction").value
        const bookid = document.getElementById("bookid").value

        if (action === "DELETE") {

            await fetch(`${api}/books/${bookid}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${loginStatus}` },
            });

            document.getElementById('closetab').click();            
            setBookStatus(!bookStatus);
            return;

        }

        const titleInput = document.getElementById("book-title");
        const desInput = document.getElementById("book-des");

        const title = titleInput.value.trim();
        const description = desInput.value.trim();

        if (!title) {
            titleInput.focus();
            return;
        }        
        
        if (action === "ADD") {

            await fetch(`${api}/books`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
                body: JSON.stringify({ title, description }),
            });

            document.getElementById('closetab').click();            
            setCurrentPage(1);
            setBookStatus(!bookStatus);
            return;

        }
        if (action === "EDIT") {

            await fetch(`${api}/books/${bookid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginStatus}` },
                body: JSON.stringify({ title: title, description: description }),
            });

            document.getElementById('closetab').click();            
            setCurrentPage(1);
            setBookStatus(!bookStatus);
            return;
        }        
        
    }

    return (
        <div className='modal fade' id="popup-modal" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className='modal-title'><h5>{modelTitle}</h5></div>
                        <button className='btn-close' data-bs-dismiss='modal' type='button'></button>
                    </div>
                    <div className="modal-body">
                        <form id='model-form' onSubmit={formSubmit}>
                            {formElement}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupModel
