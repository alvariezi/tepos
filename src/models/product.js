import mongoose, { Schema, models } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const product = models.product || mongoose.model("Product", productSchema);
export default product;
