import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.routes";
import { BlogRouter } from "../modules/Blog/blog.router";
import { ProjectRouter } from "../modules/Project/project.router";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/blog",
    route: BlogRouter,
  },
  {
    path: "/project",
    route: ProjectRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
