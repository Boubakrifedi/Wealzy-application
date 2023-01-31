import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";
import Button from "@mui/material/Button";

const BtnAddTask = () => {
  const dispatch = useAppDispatch();

  const onOpenModal = () => {
    dispatch(modalActions.openModalCreateTask());
  };
  return (
    <Button
      variant="contained"
      onClick={onOpenModal}
      style={{ backgroundColor: "#7c3aed" }}
    >
      {" "}
      Add new task
    </Button>
  );
};

export default BtnAddTask;
