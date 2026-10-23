import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
  name: string;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Handle invalid MongoDB ObjectId CastError gracefully
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Resource not found. Invalid ID format.",
    });
    return;
  }

  // Handle MongoDB duplicate key error (code 11000)
  if ((err as any).code === 11000) {
    res.status(409).json({
      success: false,
      message: "Duplicate event detected. An event with these details already exists.",
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV !== "production" && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
};
