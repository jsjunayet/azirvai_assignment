"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = require("./app/routes");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandle_1 = __importDefault(require("./app/middlewares/globalErrorHandle"));
// Load environment variables
dotenv_1.default.config();
// Configure CORS dynamically
const allowedOrigins = ((_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")) || [
    "http://localhost:3000",
];
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://portfolio-project-kappa-cyan.vercel.app",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routes_1.router);
// Default route for testing
app.get("/", (_req, res) => {
    res.send("API is running");
});
// Handle 404 errors before the global error handler
app.use((req, res, next) => {
    next({
        status: http_status_1.default.NOT_FOUND,
        message: "API Not Found!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});
// Global error handler
app.use(globalErrorHandle_1.default);
exports.default = app;
