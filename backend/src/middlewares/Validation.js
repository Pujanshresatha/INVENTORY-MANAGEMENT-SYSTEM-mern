// src/middlewares/Validation.js
const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    // Get validation results from express-validator
    const errors = validationResult(req);

    // If there are validation errors, return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    // If validation passes, move to the next middleware
    next();
};
