import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart) return res.json({ items: [] });
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [{ product: productId, qty }] });
  } else {
    const existItem = cart.items.find((x) => x.product.toString() === productId);
    if (existItem) {
      existItem.qty += qty;
    } else {
      cart.items.push({ product: productId, qty });
    }
    await cart.save();
  }
  const updatedCart = await cart.populate("items.product");
  res.json(updatedCart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((x) => x.product.toString() !== productId);
  await cart.save();
  const updatedCart = await cart.populate("items.product");
  res.json(updatedCart);
};
