const express = require("express");
const morgan = require("morgan");  
const cors = require("cors");
const ApiError = require("./utils/ApiError"); // Ensure correct relative path

const ErrorHandling = require("./middlewares/ErrorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", require("./routes"));

// Handle 404 errors
app.use("*", (req, res) => {
    throw new ApiError(404, "Page not found");
});
app.use(ErrorHandling)
// Export the app
module.exports = app;
