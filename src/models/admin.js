import mongoose, { Schema, models } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const adminCol = models.admin || mongoose.model("Admin", adminSchema);
export default adminCol;
