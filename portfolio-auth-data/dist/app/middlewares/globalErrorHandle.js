"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;
    // Handle Prisma validation errors
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        message = "Validation Error";
        message = "Validation Error";
        error = err.message;
    }
    // Handle unique constraint errors (e.g., duplicate key)
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            message = "Validation Error";
            message = "Duplicate Key Error";
            error = err.meta;
        }
        else {
            message = err.message;
        }
    }
    res.status(statusCode).json({
        success,
        message,
        error,
    });
};
exports.default = globalErrorHandler;
