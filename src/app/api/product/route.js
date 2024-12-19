import { addProduct } from "@/services/productServices";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log("Request Body:", data); // Tambahkan log ini

    const { name, category, price, description, image } = data;

    if (!name || !category || !price || !image) {
      return new Response(
        JSON.stringify({
          error: "Field name, category, price, dan image wajib diisi",
        }),
        { status: 400 }
      );
    }

    // Lanjutkan ke service
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Token tidak valid" }), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded || !decoded.idAdmin) {
      return new Response(
        JSON.stringify({ error: "Autentikasi tidak sesuai" }),
        { status: 403 }
      );
    }

    const idAdmin = decoded.idAdmin;

    const newProduct = await addProduct(idAdmin, {
      name,
      category,
      price,
      description,
      image,
    });

    return NextResponse.json(
      {
        message: "Berhasil Menambahkan Product",
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error("Error adding product:", error.message);
    return NextResponse.json(
      {
        message: "Gagal Menambahkan Product",
      },
      {
        status: 500,
      }
    )
  }
};