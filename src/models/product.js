import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    category: { type: String, required: true},
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Tambahkan adminId
  },
  { timestamps: true }
);

const productCol = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productCol;