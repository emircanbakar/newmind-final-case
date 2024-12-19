require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const config = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");
const billingRoutes = require("./routes/billingRoutes");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Vite frontend'in çalıştığı port
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Gerekli başlıkları ekleyebilirsiniz
  })
);

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

app.listen(8000, () => {
  console.log(`Server running on port 8000`);
});
