import React from "react";
import Modal from "./Modal";
import Button from "@mui/material/Button";

const ModalConfirm = ({ onConfirm, onClose, text }) => {
  const confirmAndCloseModal = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal onClose={onClose} title="Are you sure?">
      <p className="text-slate-500">{text}</p>
      <div className="mt-7 ml-auto">
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={confirmAndCloseModal} style={{marginLeft:"20px"}}>
          {" "}
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
