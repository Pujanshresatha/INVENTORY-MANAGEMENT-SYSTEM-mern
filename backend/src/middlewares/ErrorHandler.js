const ApiError = require("../utils/ApiError");

const ErrorHandling = (err, req, res, next) => {
    // Ensure a valid status code (default to 500 for unknown errors)
    const statusCode = err instanceof ApiError ? err.statusCode || 400 : 500;

    const errorResponse = {
        success: false,
        statusCode,
        message: err.message || 'Internal server error',
    };

    // Add stack trace only in development mode
    if (process.env.NODE_ENV !== 'production') {
        errorResponse.stack = err.stack;
    }

    console.error("Error Occurred: ", errorResponse); // Log the error

    res.status(statusCode).json(errorResponse);
};

module.exports = ErrorHandling;
