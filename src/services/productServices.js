import { NextResponse } from "next/server";
import adminCol from "@/models/admin";
import productCol from "@/models/product";
import { connectMongoDB } from "@/lib/mongodb";

export const addProduct = async (idAdmin, productData) => {
  try {
    await connectMongoDB();

    const newProduct = await productCol.create({
      ...productData,
      adminId: idAdmin,
    });

    const result = await adminCol.updateOne(
      { _id: idAdmin },
      { $push: { products: newProduct._id } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Gagal menambahkan ID produk ke admin" },
        { status: 500 }
      );
    }

    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: error.message || "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
};

export const getAllProduct = async (idAdmin) => {
  try {
    await connectMongoDB();
    const products = await productCol.find({ adminId: idAdmin });
    return products;
  } catch (error) {
    console.error("Error saat menghapus produk:", error);
    return NextResponse.json(
      { message: error.message || "Gagal menghapus produk" },
      { status: 500 }
    );
  }
};

export const deleteProduct = async (idAdmin, productId) => {
  try {
    await connectMongoDB();

    if (!idAdmin || !productId) {
      return NextResponse.json(
        { message: "ID admin atau produk tidak valid" },
        { status: 400 }
      );
    }

    const products = await productCol.findOneAndDelete({
      _id: productId,
      adminId: idAdmin,
    });
    if (!products) {
      return NextResponse.json(
        {
          message: "Produk tidak ditemukan atau Anda tidak memiliki akses",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Produk berhasil dihapus",
        data: { deletedProduct: products },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat menghapus produk:", error);
    return NextResponse.json(
      { message: error.message || "Gagal menghapus produk" },
      { status: 500 }
    );
  }
};

export const updateProduct = async (idAdmin, productId, updatedData) => {
  try {
    await connectMongoDB();

    if (!idAdmin || !productId) {
      return NextResponse.json(
        { message: "ID admin atau produk tidak valid" },
        { status: 400 }
      );
    }

    const products = await productCol.findOneAndUpdate(
      { _id: productId, adminId: idAdmin },
      updatedData,
      { new: true }
    );

    if (!products) {
      return NextResponse.json(
        {
          message: "Produk tidak ditemukan atau Anda tidak memiliki akses",
        },
        { status: 404 }
      );
    }

    return products;
  } catch (error) {
    console.error("Error saat memperbarui produk:", error);
    return NextResponse.json(
      { message: error.message || "Gagal memperbarui produk" },
      { status: 500 }
    );
  }
};
