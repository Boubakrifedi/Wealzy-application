import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import { ReactComponent as Trash } from "../../../assets/trash.svg";
import { ReactComponent as Edit } from "../../../assets/edit.svg";
import ModalConfirm from "../../Utilities/ModalConfirm";
import ModalDirectory from "../../Utilities/ModalDirectory";
import axios from "axios";

const ItemDirectory = ({
  dir,
  classActive,
}) => {
  const dispatch = useAppDispatch();

  const [modalIsShown, setModalIsShown] = useState (false);
  const [modalDirIsShown, setModalDirIsShown] = useState(false);

  const closeModalDirectoryHandler = () => {
    setModalDirIsShown(false);
  };

  const deleteDirectoryHandler = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/project/${dir._id}`
      );
    } catch (error) {
      console.error(error);
    }
    dispatch(tasksActions.deleteDirectory(dir._id));
  };

  const confirmEditDirNameHandler = (dirName) => {
    dispatch(
      tasksActions.editDirectoryName({
        previousDirName: dir._id,
        newDirName: dirName,
      })
    );
  };

  return (
    <>
      {modalDirIsShown && (
        <ModalDirectory
          onClose={closeModalDirectoryHandler}
          onConfirm={confirmEditDirNameHandler}
          dirName={dir}
          title="Edit Project"
          btnText="Edit"
        />
      )}
      {modalIsShown && (
        <ModalConfirm
          onClose={() => setModalIsShown(false)}
          onConfirm={deleteDirectoryHandler}
          text="This project and all its tasks will be deleted."
        />
      )}
      <li
        className={`flex items-center pr-4 pl-9 py-2 itemDirectory ${ classActive  }`}
      >
        <NavLink
          to={`/projects/${dir._id}`}
          title={dir.title}
          className="hover:text-rose-600 dark:hover:text-slate-200 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[7rem]"
        >
          {dir.title}
        </NavLink>

        
          <div className="ml-auto buttonsDir">
            <button
              title="edit Project"
              onClick={() => setModalDirIsShown(true)}
            >
              <Edit className="w-5 h-5 mr-2" />
            </button>
            <button
              title="delete project"
              onClick={() => setModalIsShown(true)}
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
      </li>
    </>
  );
};

export default ItemDirectory;
