import compression from "compression";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { router } from "./app/routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandle";

// Load environment variables
dotenv.config();
// Configure CORS dynamically
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [
  "http://localhost:3000",
];

const app: Application = express();

app.use(cors());
app.use(compression());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://portfolio-project-kappa-cyan.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

// Default route for testing
app.get("/", (_req, res) => {
  res.send("API is running");
});

// Handle 404 errors before the global error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    status: httpStatus.NOT_FOUND,
    message: "API Not Found!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});
// Global error handler
app.use(globalErrorHandler);
export default app;
