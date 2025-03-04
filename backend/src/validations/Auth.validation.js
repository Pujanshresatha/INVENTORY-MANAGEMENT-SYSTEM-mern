// src/validations/Auth.validation.js
const { body } = require("express-validator");

class AuthValidation {
    static RegisterUser = [
        body("name")
            .notEmpty()
            .withMessage("Name cannot be empty"),
        
        body("email")
            .isEmail()
            .withMessage("Email must be a valid email address"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password should include a minimum of 6 characters")
    ];
}

module.exports = AuthValidation;
