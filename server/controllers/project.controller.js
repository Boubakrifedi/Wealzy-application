const ProjectModel = require("../models/Project.model");
const task  = require("../models/Task.model");
const { ProjectErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllProjects = async (req, res) => {
  const Projects = await ProjectModel.find();
  res.status(200).json(Projects);
};

module.exports.createProject = (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  const project = new ProjectModel({
    title,
    description, 
    startDate,
    endDate,
  });
  project
    .save()
    .then((result) => {
      res.status(201).json({ message: "Project created!", project: result });
    })
    .catch((error) => {
      const errors = ProjectErrors(error);
      res.status(400).json({ message: "Error creating project", errors });
    });
};


module.exports.ProjectInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  ProjectModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  })
};

module.exports.updateProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,runValidators: true
    });
    if (!project) return res.status(404).json({ message: "project not found" });
    return res.json(project);
  } catch (err) {
    const errors = ProjectErrors(err);
    return res.status(400).json({ message: "Error updating project", errors });
  }
};

module.exports.deleteProject = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await task.deleteMany({ project: req.params.id }).exec();
    await ProjectModel.findByIdAndDelete({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted project and related tasks. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
module.exports.deleteAllProjects = async (req, res) => {
  try {
    await task.deleteMany({}).exec();
    await ProjectModel.deleteMany({}).exec();
    res.status(200).json({ message: "Successfully deleted all projects and their related tasks. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


