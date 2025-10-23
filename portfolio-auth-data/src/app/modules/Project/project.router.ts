import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ProjectController } from "./project.controller";

const router = express.Router();

router.post("/", checkAuth("OWNER"), ProjectController.createProject);
router.get("/", ProjectController.getAllProject);
router.get("/:id", ProjectController.getProjectById);
router.patch("/:id", checkAuth("OWNER"), ProjectController.updateProject);
router.delete("/:id", checkAuth("OWNER"), ProjectController.deleteProject);

export const ProjectRouter = router;
