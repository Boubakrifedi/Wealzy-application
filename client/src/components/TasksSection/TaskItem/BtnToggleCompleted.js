import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import { ReactComponent as SvgX } from "../../../assets/x.svg";
import { ReactComponent as Check } from "../../../assets/check.svg";
import axios from "axios";

const BtnToggleCompleted = ({ taskCompleted, taskId, isListInView1 }) => {
  
  const dispatch = useAppDispatch();
  const toggleTaskCompleted = async (id) => {
    const newTask = {
  
      completed: !taskCompleted,
     
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/task/${taskId}`,newTask
      );
    } catch (error) {
      console.error(error);
    }

    dispatch(tasksActions.toggleTaskCompleted(id));

  };

  return (
    <button
      title={taskCompleted ? "mark as uncompleted" : "mark as completed"}
      className={`${
        taskCompleted
          ? "bg-emerald-200 text-emerald-800 "
          : "bg-amber-200 text-amber-800 "
      } ${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium`}
      onClick={() => toggleTaskCompleted(taskId)}
    >
      <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
        {taskCompleted ? "completed" : "uncompleted"}
      </span>
      <span className=" sm:hidden w-6 h-6 grid place-items-center">
        {taskCompleted ? (
          <Check className="w-3 h-3" />
        ) : (
          <SvgX className="w-3 h-3" />
        )}
      </span>
    </button>
  );
};

export default React.memo(BtnToggleCompleted);
