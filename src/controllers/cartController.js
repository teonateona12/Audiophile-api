import CartItem from "../models/cartItem.js";

export const postCart = async (req, res) => {
  const cartitem = await CartItem.findOne({
    userId: req.body.userId,
    name: req.body.name,
  });
  if (!cartitem) {
    const newCart = new CartItem({
      name: req.body.name,
      price: req.body.price,
      number: req.body.number,
      image: req.body.image,
      userId: req.body.userId,
    });
    const saveCart = await newCart.save();
    return res.status(201).json("Cart added");
  } else {
    await cartitem.update({ number: cartitem.number + req.body.number });
    return res.status(200).json("Cart updated");
  }
};

export const getCart = async (req, res) => {
  const allCart = await CartItem.find();
  res.status(200).json(allCart);
};

export const deleteCart = async (req, res) => {
  await CartItem.deleteMany({ userId: req.params.id });
  res.status(200).json("Cart deleted");
};

// export const putCart = async (req, res) => {
//   const updateItem = await CartItem.findByIdAndUpdate(req.params.id, {
//     $set: req.body,
//   });
//   res.status(200).json("Cart updated");
// };
