import React, { useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";
import Button from "@mui/material/Button";
import axios from "axios";

const ModalCreateTask = ({ onClose, task, nameForm, onConfirm }) => {
  const titleError = document.querySelector(".title.error");
  const titleSuccess = document.querySelector(".title.success");
  const descriptionError = document.querySelector(".description.error");
  const descriptionSuccess = document.querySelector(".description.success");
  const dueDateSuccess = document.querySelector(".dueDate.success");
  const dueDateError = document.querySelector(".dueDate.error");
  const projectSuccess = document.querySelector(".project.success");

  const directories = useAppSelector((state) => state.tasks.directories);

  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate = year + "-" + month + "-" + day;
  const maxDate = year + 1 + "-" + month + "-" + day;

  const [description, setDescription] = useState(() => {
    if (task) {
      return task.description;
    }
    return "";
  });
  const [title, setTitle] = useState(() => {
    if (task) {
      return task.title;
    }
    return "";
  });
  const [date, setDate] = useState(() => {
    if (task) {
      return task.dueDate;
    }
    return todayDate;
  });
  const isTitleValid = useRef(false);
  const isDescriptionValid = useRef(false);
  const isDateValid = useRef(false);

  const [isCompleted, setIsCompleted] = useState(() => {
    if (task) {
      return task.completed;
    }
    return false;
  });

  const [selectedDirectory, setSelectedDirectory] = useState(() => {
    return directories[0]._id;
  });

  const addNewTaskHandler = async (event) => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDescriptionValid.current = description.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (
      isTitleValid.current &&
      isDateValid.current &&
      isDescriptionValid.current
    ) {
      const newTask = {
        title: title,
        project: selectedDirectory,
        description: description,
        dueDate: date,
        completed: isCompleted,
      };
      try {
        let res;
        if (nameForm === "Add a task") {
          console.log(newTask)
          res = await axios.post(
            `${process.env.REACT_APP_API_URL}api/task/`,
            newTask
          );
          onConfirm(res.data);
          onClose();
        } else {
          let taskModified = false;
          if (title !== task.title) {
            taskModified = true;
            newTask.title = title;
          }
          if (description !== task.description) {
            taskModified = true;
            newTask.description = description;
          }
          if (date !== task.date) {
            taskModified = true;
            newTask.dueDate = date;
          }
          if (selectedDirectory !== task.project) {
            taskModified = true;
            newTask.project = selectedDirectory;
          }
        
          if (taskModified) {
            res = await axios.put(
              `${process.env.REACT_APP_API_URL}api/task/${task._id}`,
              newTask
            );
        
            if (title !== task.title) {
              titleSuccess.innerHTML = "Change saved";
            }
            if (description !== task.description) {
              descriptionSuccess.innerHTML = "Change saved";
            }
            if (date !== task.date) {
              dueDateSuccess.innerHTML = "Change saved";
            }
            if (selectedDirectory !== task.project) {
              projectSuccess.innerHTML = "Change saved ";
            }
          }
          onConfirm(res.data);
        } 
      } catch (error) {
        if (nameForm === "Add a task") {
            titleError.innerHTML = error.response.data.title || '';
            descriptionError.innerHTML = error.response.data.description || '';
            dueDateError.innerHTML = error.response.data.dueDate || '';
        } else {
          titleError.innerHTML = error.response.data.title || '';
          descriptionError.innerHTML = error.response.data.description || '';
          dueDateError.innerHTML = error.response.data.dueDate || '';
        }
      }
    }
  };

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form
        className="flex flex-col stylesInputsField"
        onSubmit={addNewTaskHandler}
      >
        <label>
          Title
          <input
            type="text"
            placeholder="e.g, study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <div className="title error"></div>
        <div className="title success"></div>
        <label>
          Description
          <textarea
            type="text"
            placeholder="e.g, study for the test"
            className="w-full"
            required
            value={description}
            onChange={({ target }) => 
            setDescription(target.value)
          }
          ></textarea>
        </label>
        <div className="description error"></div>
        <div className="description success"></div>
        <label>
          Due Date
          <input
            type="date"
            className="w-full"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <div className="dueDate error"></div>
        <div className="dueDate success"></div>
        <label>
          Select a Project
          <select
            className="block w-full"
            value={selectedDirectory}
            onChange={({ target }) => {
              setSelectedDirectory(target.value)
              console.log(selectedDirectory)
            }}
          >
            {directories.map((dir, index) => (
              <option
                key={index}
                value={dir._id}
                className="bg-slate-100 dark:bg-slate-800 w-[50%]"
              >
                {dir.title}
              </option>
            ))}
          </select>
        </label>
        <div className="project error"></div>
        <div className="project success"></div>
        <Button
          variant="contained"
          type="submit"
          style={{ marginTop: "10px", backgroundColor: "#7c3aed" }}
        >
          {nameForm}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
