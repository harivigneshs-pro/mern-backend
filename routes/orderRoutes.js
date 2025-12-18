import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new order
router.post("/", protect, createOrder);

// Get all orders of logged-in user
router.get("/", protect, getOrders);

export default router;
