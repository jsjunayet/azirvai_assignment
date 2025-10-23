"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post("/", (0, checkAuth_1.checkAuth)("OWNER"), blog_controller_1.BlogController.createBlog);
router.get("/", blog_controller_1.BlogController.getAllBlog);
router.get("/:id", blog_controller_1.BlogController.getBlogById);
router.patch("blogs/:id", (0, checkAuth_1.checkAuth)("OWNER"), blog_controller_1.BlogController.updateBlog);
router.delete("/:id", (0, checkAuth_1.checkAuth)("OWNER"), blog_controller_1.BlogController.deleteBlog);
exports.BlogRouter = router;
