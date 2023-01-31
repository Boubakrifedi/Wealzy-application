import React from "react";
import BtnEditTask from "./BtnEditTask";
import BtnDeleteTask from "./BtnDeleteTask";
import BtnToggleCompleted from "./BtnToggleCompleted";

const ActionsTaskItem = ({
  task,
  isListInView1,
}) => {
  return (
    <>
      <div
        className={`flex flex-row justify-around border-dashed border-slate-200 dark:border-slate-700/[.3] ${
          isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
        }`}
      >
        <BtnToggleCompleted
          taskCompleted={task.completed}
          taskId={task._id}
          isListInView1={isListInView1}
        />
        <BtnDeleteTask taskId={task._id} />
        <BtnEditTask task={task} />
      </div>
    </>
  );
};

export default ActionsTaskItem;
