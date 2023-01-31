import React , { useEffect } from "react";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import {  useDispatch } from 'react-redux'

import {  fetchTasks } from '../../store/Tasks.store'

const Home = () => {
  const dispatch = useDispatch()
  const tasks = useAppSelector((state) => state.tasks.tasks);

  
  useEffect(() => {
      dispatch(fetchTasks())
  }, [dispatch])


  useDescriptionTitle("Organize your tasks", "All tasks");
  return <LayoutRoutes title="All tasks" tasks={tasks}></LayoutRoutes>;
};

export default Home;
