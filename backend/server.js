require("dotenv").config();

// Import PUBLIC_DATA from the constants file
const { PUBLIC_DATA } = require("./src/constant");

const app = require("./src/app"); // Ensure the correct path
const {ConnectDB}= require("./src/config/db.config");
ConnectDB

// Start the server using the static property from PUBLIC_DATA
app.listen(PUBLIC_DATA.port, () => {
    console.log(`Server running on port ${PUBLIC_DATA.port}`);
});
