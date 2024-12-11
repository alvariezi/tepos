import mongoose from "mongoose";
import adminCol from "@/models/admin";
import { connectMongoDB } from "@/lib/mongodb";

export const addProduct = async (idAdmin, data) => {
  try {
    const objectId = new mongoose.Types.ObjectId(idAdmin);
    await connectMongoDB();
    const result = await adminCol.updateOne(
      {
        _id: objectId,
      },
      {
        $push: {
          product: data,
        },
      }
    );

    return result;
  } catch (error) {
    console.log(error);
    throw new Error({ message: error.message });
  }
};
