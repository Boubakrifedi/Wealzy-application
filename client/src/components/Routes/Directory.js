import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const Directory = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const directories = useAppSelector((state) => state.tasks.directories);
  const params = useParams();
  const navigate = useNavigate();

  const [tasksInCurrentDirectory, setTasksInCurrentDirectory] = useState([]);
  const [directory, setDirectory] = useState("");
  useDescriptionTitle(`Tasks in "${directory}"`, directory ? directory : "");

  useEffect(() => {
    const project = directories.filter((proj) => proj._id === params.dir);
    if (project.length > 0) {
      setDirectory(project[0].title);
    }

    const tasksFiltered = tasks.filter((task) => task.project === params.dir);
    setTasksInCurrentDirectory(tasksFiltered);
  }, [directories, navigate, params.dir, tasks]);

  return (
    <LayoutRoutes
      title={`${directory}'s tasks`}
      tasks={tasksInCurrentDirectory}
    />
  );
};

export default Directory;
