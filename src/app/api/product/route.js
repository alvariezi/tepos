import { addProduct } from "@/services/productServices";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const POST = async (req) => {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token tidak valid atau tidak ada" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded || !decoded.idAdmin) {
      return NextResponse.json(
        { error: "Token tidak valid atau tidak sesuai" },
        { status: 401 }
      );
    }
    const { name, category, price, description, image } = await req.json();
    if (!name || !category || !price || !description || !image) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }
    const data = {
      name,
      category,
      price,
      description,
      image,
    };

    const result = await addProduct(decoded.idAdmin, data);

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Gagal menambahkan produk" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Berhasil menambahkan produk",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error.message);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan produk" },
      { status: 500 }
    );
  }
};
