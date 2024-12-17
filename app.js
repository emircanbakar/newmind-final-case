require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const config = require("./config/db");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api", paymentRoutes);
app.use("/api", billingRoutes);


config.connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something broke!" });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
