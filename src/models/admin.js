import mongoose, { Schema, models } from "mongoose";
import productSchema from "./product";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const adminCol = models.Admin || mongoose.model("Admin", adminSchema);

export default adminCol;
