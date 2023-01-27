import React, { useState } from "react";

const ErrorModal = ({ errorMessage }) => {
  const [showModal, setShowModal] = useState(false);

  if (errorMessage.includes("email-already-in-use")) {
    setShowModal(true);
    console.log("already logged idmfhjsdhfjdfghn");
  }

  return (
    <>
      {showModal && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>Bereits verwendetes Passwort. Melde dich an.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
