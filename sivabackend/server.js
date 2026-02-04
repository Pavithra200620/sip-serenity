const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 5000;
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/sipserenity")
  .then(() => console.log("MongoDB Connected 🍃"))
  .catch(err => console.log(err));

// Routes
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Sip Serenity Backend Running ☕");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
