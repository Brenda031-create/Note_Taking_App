"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Server error:', err.stack);
    // You can add more logic later (e.g. check if err is ValidationError, etc.)
    const status = 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message, ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }) });
};
exports.errorHandler = errorHandler;
