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

export const getAllProduct = async (id) => {
  try {
    await connectMongoDB();
    return adminCol.findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { product: 1, _id: 0 }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
