import mongoose from "mongoose";
import adminCol from "@/models/admin";
import productCol from "@/models/product";
import { connectMongoDB } from "@/lib/mongodb";

export const addProduct = async (idAdmin, productData) => {
  try {
    await connectMongoDB();

    console.log("Data diterima di Service:", productData); // Tambahkan log ini

    const newProduct = await productCol.create({ ...productData, adminId: idAdmin });

    const result = await adminCol.updateOne(
      { _id: idAdmin },
      { $push: { products: newProduct._id } }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Gagal menambahkan ID produk ke admin");
    }

    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error(error.message);
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
