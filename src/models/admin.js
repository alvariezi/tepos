import mongoose, { Schema, models } from "mongoose";
import productSchema from "./product";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    product: [productSchema],
  },
  {
    timestamps: true,
  }
);

const adminCol = models.admin || mongoose.model("Admin", adminSchema);
export default adminCol;
