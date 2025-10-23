"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_router_1 = require("../modules/Blog/blog.router");
const project_router_1 = require("../modules/Project/project.router");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRouter,
    },
    {
        path: "/blog",
        route: blog_router_1.BlogRouter,
    },
    {
        path: "/project",
        route: project_router_1.ProjectRouter,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
