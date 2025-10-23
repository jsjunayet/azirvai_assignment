"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.post("/", (0, checkAuth_1.checkAuth)("OWNER"), project_controller_1.ProjectController.createProject);
router.get("/", project_controller_1.ProjectController.getAllProject);
router.get("/:id", project_controller_1.ProjectController.getProjectById);
router.patch("/:id", (0, checkAuth_1.checkAuth)("OWNER"), project_controller_1.ProjectController.updateProject);
router.delete("/:id", (0, checkAuth_1.checkAuth)("OWNER"), project_controller_1.ProjectController.deleteProject);
exports.ProjectRouter = router;
