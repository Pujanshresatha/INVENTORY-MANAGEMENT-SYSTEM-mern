// src/app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ApiError = require("./utils/ApiError");

const ErrorHandling = require("./middlewares/ErrorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", require("./routes")); // This will forward all /api/v1 requests to routes

// Handle 404 errors for unknown routes
app.use("*", (req, res) => {
  throw new ApiError(404, "Page not found");
});

app.use(ErrorHandling);

module.exports = app;
