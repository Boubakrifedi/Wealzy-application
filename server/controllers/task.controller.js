const Task = require("../models/Task.model");
const ProjectModel = require("../models/Project.model");

const { TaskErrors } = require("../utils/errors.utils");

module.exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    const project = await ProjectModel.findById(task.project);
    project.tasks.push(task._id);
    await project.save();
    return res.status(201).json(task);
  } catch (err) {
    const errors = TaskErrors(err);
    return res.status(400).json(errors);
  }
};

module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (err) {
    const errors = TaskErrors(err);
    return res.status(400).json(errors);
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json({ message: "Task deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
