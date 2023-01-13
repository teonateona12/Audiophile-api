import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const allProduct = await Product.find();
  res.status(200).json(allProduct);
};
export default getProducts;
