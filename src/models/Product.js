import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: Number },
  slug: { type: String },
  name: { type: String },
  gallery: {
    first: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    second: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    third: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
  },
  new: { type: Boolean },
  price: { type: String },
  description: { type: String },
  features: { type: String },
  image: {
    mobile: { type: String },
    tablet: { type: String },
    desktop: { type: String },
  },
  category: { type: String },
  categoryImage: {
    mobile: { type: String },
    tablet: { type: String },
    desktop: { type: String },
  },
  includes: [
    {
      quantity: { type: Number },
      item: { type: String },
    },
  ],
  others: [
    {
      slug: { type: String },
      name: { type: String },
      image: {
        mobile: { type: String },
        tablet: { type: String },
        desktop: { type: String },
      },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
