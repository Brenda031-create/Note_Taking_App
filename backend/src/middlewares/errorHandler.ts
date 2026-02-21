// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Server error:', err.stack);

  // You can add more logic later (e.g. check if err is ValidationError, etc.)
  const status = 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message, ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }) });
};