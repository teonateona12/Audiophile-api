import mongoose from "mongoose";

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
