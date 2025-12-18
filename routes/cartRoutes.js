import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js"; // checks JWT token

const router = express.Router();

router.get("/", protect, getCart);          // Get current user's cart
router.post("/", protect, addToCart);       // Add/update item
router.delete("/:productId", protect, removeFromCart); // Remove item

export default router;
