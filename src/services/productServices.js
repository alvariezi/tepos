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

export const deleteProduct = async (idAdmin, productId) => {
  try {
    await connectMongoDB();

    const admin = await adminCol.findById(idAdmin);
    if (!admin) {
      throw new Error("Admin tidak ditemukan");
    }

    const productIndex = admin.product.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      throw new Error("Produk tidak ditemukan");
    }

    admin.product.splice(productIndex, 1);
    await admin.save();

    return { message: "Produk berhasil dihapus", productId };
  } catch (error) {
    console.error("Error saat menghapus product:", error);
    throw new Error(error.message);
  }
};

export const editProduct = async (idAdmin, productId, updatedData) => {
  try {
    await connectMongoDB();

    const admin = await adminCol.findById(idAdmin);
    if (!admin) {
      throw new Error("Admin tidak ditemukan");
    }

    const productIndex = admin.product.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      throw new Error("Produk tidak ditemukan");
    }

    Object.assign(admin.product[productIndex], updatedData);

    await admin.save();

    return admin.product[productIndex];
  } catch (error) {
    console.error("Error saat merubah product:", error);
    throw new Error(error.message);
  }
};