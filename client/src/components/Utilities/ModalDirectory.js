import React, { useState } from "react";
import Modal from "./Modal";
import Button from "@mui/material/Button";
import axios from "axios";

const ModalDirectory = ({
  onClose,
  dirName,
  onConfirm,
  btnText,
  title,
  project,
}) => {
  const [newDirName, setNewDirName] = useState(dirName ? dirName.title : "");
  const [newDescription, setNewDescription] = useState(
    dirName ? dirName.description : ""
  );
  const [newStartDate, setNewStartDate] = useState(
    dirName ? dirName.startDate : ""
  );
  const [newEndDate, setNewEndDate] = useState(dirName ? dirName.endDate : "");
  const titleError = document.querySelector(".title.error");
  const titleSuccess = document.querySelector(".title.success");
  const descriptionError = document.querySelector(".description.error");
  const descriptionSuccess = document.querySelector(".description.success");
  const startDateSuccess = document.querySelector(".startDate.success");
  const startDateError = document.querySelector(".startDate.error");
  const endDateSuccess = document.querySelector(".endDate.success");
  const endDateError = document.querySelector(".endDate.error");


  const addNewProjectHandler = async (e) => {
    e.preventDefault();
    const newProject = {
      title: newDirName,
      description: newDescription,
      startDate: newStartDate,
      endDate: newEndDate,
    };
    if (title === "Create new Project") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/project`,
          newProject
        );
        onConfirm(res.data.project);
        onClose();
      } catch (error) {
        console.error(error);
        titleError.innerHTML = error.response.data.errors.title|| "";
        descriptionError.innerHTML = error.response.data.errors.description || "";
        startDateError.innerHTML = error.response.data.errors.startDate || "";
        endDateError.innerHTML = error.response.data.errors.endDate || "";
      }
    } else {
      let projectModified = false;
      if (newDirName !== dirName.title) {
        projectModified = true;
        newProject.title = newDirName;
      }
      if (newDescription !== dirName.description) {
        projectModified = true;
        newProject.description = newDescription;
      }
      if (newStartDate !== dirName.startDate) {
        projectModified = true;
        newProject.dueDate = newStartDate;
      }
      if (newEndDate !== dirName.endDate) {
        projectModified = true;
        newProject.project = newEndDate;
      }
      if (projectModified) {
        try {
          const res = await axios.put(
            `${process.env.REACT_APP_API_URL}api/project/${dirName._id}`,
            newProject
          );
          if (newDirName !== dirName.newDirName) {
            titleSuccess.innerHTML = "Change saved";
          }
          if (newDescription !== dirName.description) {
            descriptionSuccess.innerHTML = "Change saved";
          }
          if (newStartDate !== dirName.startDate) {
            startDateSuccess.innerHTML = "Change saved";
          }
          if (newEndDate !== dirName.endDate) {
            endDateSuccess.innerHTML = "Change saved ";
          }
          onConfirm(res.data);
        } catch (error) {
          titleError.innerHTML = error.response.data.errors.title || "";
          descriptionError.innerHTML = error.response.data.errors.description || "";
          startDateError.innerHTML = error.response.data.errors.startDate || "";
          endDateError.innerHTML = error.response.data.errors.endDate || "";
        }
      }
    }
  };

  return (
    <Modal onClose={onClose} title={title}>
      <form className="stylesInputsField" onSubmit={addNewProjectHandler}>
        <div className="relative">
          <label htmlFor="dir-name" className="">
            Title
          </label>
          <input
            type="text"
            id="dir-name"
            placeholder="Enter a Project name"
            value={newDirName}
            onChange={({ target }) => setNewDirName(target.value)}
            className={`inputStyles block w-full`}
          />
        </div>
        <div className="title error"></div>
        <div className="title success"></div>

        <div className="relative">
          <label htmlFor="description" className="">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="Enter a Project description"
            value={newDescription}
            onChange={({ target }) => setNewDescription(target.value)}
            className={`inputStyles block w-full`}
          />
        </div>
        <div className="description error"></div>
        <div className="description success"></div>
        <div className="relative">
          <label htmlFor="start-date" className="">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            placeholder="Enter a Project start date"
            value={newStartDate}
            onChange={({ target }) => setNewStartDate(target.value)}
            className={`inputStyles block w-full`}
          />
        </div>
        <div className="startDate error"></div>
        <div className="startDate success"></div>
        <div className="relative">
          <label htmlFor="start-date" className="">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            placeholder="Enter a Project end date"
            value={newEndDate}
            onChange={({ target }) => setNewEndDate(target.value)}
            className={`inputStyles block w-full`}
          />
        </div>
        <div className="endDate error"></div>
        <div className="endDate success"></div>
        <Button
          variant="contained"
          type="submit"
          style={{ marginTop: "10px", backgroundColor: "#7c3aed" }}
        >
          {btnText}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalDirectory;
