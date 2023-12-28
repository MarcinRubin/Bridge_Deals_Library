import React from "react";

const DeleteDirectoryModal = ({ toggle, handleDelete, children }) => {
  return (
    <div className="modal-wrapper">
        <div className="modal-inside">
      {children}
      <div>
        <button onClick={handleDelete}>Accept</button>
        <button onClick={toggle}>Close Modal</button>
      </div>
      </div>
    </div>
  );
};

export default DeleteDirectoryModal;
