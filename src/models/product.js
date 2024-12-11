// src/models/product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true },
    image: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Menambahkan relasi admin
  },
  { timestamps: true }
);

const productCol = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productCol;
