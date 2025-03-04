const express = require("express");
const router = express.Router(); // Create a new router

// Define a GET route at the root path of this route file
router.get("/", (req, res) => {
    // Sends a JSON response with a message
    res.json({ msg: "hello world" });
});

// Export the router to use in other parts of the app
module.exports = router;
