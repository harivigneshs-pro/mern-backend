import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const app = express();

/* ✅ Middleware MUST come first */
app.use(cors());
app.use(express.json());

/* ✅ Routes come AFTER middleware */
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
/* ✅ MongoDB */
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => {
    console.log("❌ CONNECTION ERROR TYPE:", err.name);
    console.log("❌ ERROR MESSAGE:", err.message);
  });

/* ✅ Test route */
app.get("/", (req, res) => {
  res.send("Server is awake and Database is connected!");
});

/* ✅ Server start */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
