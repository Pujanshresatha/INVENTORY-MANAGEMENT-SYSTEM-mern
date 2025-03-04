const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../backend/src/config/db");
const authRoutes = require("../backend/src/routes/authRoutes");
const inventoryRoutes = require('./src/routes/inventoryRoutes');

dotenv.config();
connectDB(); // Ensure DB connects before starting the server

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup for frontend at http://localhost:5173
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({
  origin: "http://localhost:5173", // Explicitly set to match frontend origin
  credentials: true, // Allow cookies/credentials if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods, including OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
}));

app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));