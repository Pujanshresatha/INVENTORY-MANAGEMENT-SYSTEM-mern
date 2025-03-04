const express = require("express");
const router = express.Router();

const routes = [
    {
        path: '/auth', // Path is /api/v1/auth for the auth routes
        route: require("./authRoutes") // Import Auth.route.js here
    }
];

// Dynamically load each route into the router
routes.forEach(cur => {
    router.use(cur.path, cur.route); // Mount routes dynamically
});

module.exports = router;
