import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { BlogController } from "./blog.controller";

const router = express.Router();

router.post("/", checkAuth("OWNER"), BlogController.createBlog);
router.get("/", BlogController.getAllBlog);
router.get("/:id", BlogController.getBlogById);
router.patch("blogs/:id", checkAuth("OWNER"), BlogController.updateBlog);
router.delete("/:id", checkAuth("OWNER"), BlogController.deleteBlog);

export const BlogRouter = router;
