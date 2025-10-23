import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error: any = err;

  // Handle Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    message = "Validation Error";
    error = err.message;
  }

  // Handle unique constraint errors (e.g., duplicate key)
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Validation Error";
      message = "Duplicate Key Error";
      error = err.meta;
    } else {
      message = err.message;
    }
  }
  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
