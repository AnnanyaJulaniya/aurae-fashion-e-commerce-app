const express = require("express");
const cors = require("cors");

require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AURAÉ Fashion API is healthy and running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/products", productRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`  AURAÉ Fashion Store Backend API         `);
  console.log(`  Running on: http://localhost:${PORT}      `);
  console.log(`  Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`==========================================`);
});
