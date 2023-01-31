const router = require("express").Router();
const projectController = require("../controllers/project.controller");

router.get("/", projectController.getAllProjects);
router.post("/", projectController.createProject);
router.get("/:id", projectController.ProjectInfo);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
router.delete("/", projectController.deleteAllProjects);

module.exports = router;
