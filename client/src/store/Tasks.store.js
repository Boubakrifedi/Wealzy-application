import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}api/task/`);
  return response.data
});

export const fetchProjects = createAsyncThunk('tasks/fetchProjects', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}api/project/`);
  return response.data
});


const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    directories: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    }, 
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addNewTask(state, action) {
            state.tasks = [action.payload, ...state.tasks];
          },
          removeTask(state, action) {
            const newTasksList = state.tasks.filter(
              (task) => task._id !== action.payload
            );
            state.tasks = newTasksList;
          },
          editTask(state, action) {
            const taskId = action.payload._id;
      
            const newTaskEdited = state.tasks.find((task) => task._id === taskId);
            const indexTask = state.tasks.indexOf(newTaskEdited);
            state.tasks[indexTask] = action.payload;
          },
          toggleTaskCompleted(state, action) {
            const taskId = action.payload;

            const currTask = state.tasks.find((task) => task._id === taskId);
            currTask.completed = !currTask.completed;
          },
          deleteAllData(state) {
            state.tasks = [];
            state.directories = [];
          },
          createDirectory(state, action) {
            const newDirectory = action.payload;
            const directoryAlreadyExists = state.directories.includes(newDirectory);
            if (directoryAlreadyExists) return;
            state.directories = [newDirectory, ...state.directories];
          },
          deleteDirectory(state, action) {
            const dirName = action.payload;
      
            state.directories = state.directories.filter((dir) => dir._id !== dirName);
            state.tasks = state.tasks.filter((task) => task.project !== dirName);
          },
          editDirectoryName(state, action) {
            const previousDirName = action.payload.previousDirName;
            const newDirName = action.payload.newDirName;
            const newprojectEdited = state.directories.find((project) => project._id === previousDirName);
            const indexproject = state.directories.indexOf(newprojectEdited);
            state.directories[indexproject] = newDirName;
          },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        // Loading state
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        // Error state
      })
      .addCase(fetchProjects.pending, (state) => {
        // Loading state
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.directories = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        // Error state
      });
  }
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
