const express = require("express");
const router = express.Router();

const routes = [
    {
        path: '/auth',
        route: require("./Auth.route") // Import Auth.route.js here
    }
];

// Dynamically load each route into the router
routes.forEach(cur => {
    router.use(cur.path, cur.route);
});

module.exports = router;
