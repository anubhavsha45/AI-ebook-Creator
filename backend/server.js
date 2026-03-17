require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const bookRoutes = require("./routes/bookRoutes");
const exportRoutes = require("./routes/exportRoutes");
// Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//MOUNTED ROUTES HERE
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);
//START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Connected to the port ${PORT}`);
});
