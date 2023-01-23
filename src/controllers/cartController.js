import CartItem from "../models/cartItem.js";

export const postCart = async (req, res) => {
  const newCart = new CartItem({
    name: req.body.name,
    price: req.body.price,
    number: req.body.number,
    image: req.body.image,
    userId: req.body.userId,
  });
  const saveCart = await newCart.save();
  res.status(200).json("Cart added");
};

export const getCart = async (req, res) => {
  const allCart = await CartItem.find();
  res.status(200).json(allCart);
};

// export const putCart = async (req, res) => {
//   const updateItem = await CartItem.findByIdAndUpdate(req.params.id, {
//     $set: req.body,
//   });
//   res.status(200).json("Cart updated");
// };
