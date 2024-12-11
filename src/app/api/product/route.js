import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import productCol from "@/models/product";
import adminCol from "@/models/admin";  // Model Admin untuk mencari admin berdasarkan ID

// Secret key untuk JWT (biasanya di .env)
const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (req) => {
  try {
    // Mengambil token dari header Authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Token tidak ditemukan" }, { status: 401 });
    }

    // Token diawali dengan "Bearer "
    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token tidak valid" }, { status: 401 });
    }

    // Verifikasi token dan ambil informasi admin
    const decoded = jwt.verify(token, JWT_SECRET);
    const adminId = decoded._id; // Asumsi _id disertakan dalam token

    // Cari admin berdasarkan ID (untuk memastikan admin valid)
    const admin = await adminCol.findById(adminId);
    if (!admin) {
      return NextResponse.json({ message: "Admin tidak ditemukan" }, { status: 404 });
    }

    console.log("Admin ditemukan:", admin);  // Log untuk memeriksa admin

    // Pastikan admin.products sudah ada
    if (!admin.products) {
      admin.products = [];  // Inisialisasi jika undefined
    }

    // Ambil data produk dari body request
    const { name, category, price, description, image } = await req.json();

    // Membuat produk baru dan menambahkan adminId
    const newProduct = new productCol({
      name,
      category,
      price,
      description,
      image,
      adminId: admin._id,  // Menambahkan ID admin pada produk
    });

    // Simpan produk ke database
    await newProduct.save();

    // Menambahkan produk ke array produk admin
    admin.products.push(newProduct._id);

    // Simpan perubahan admin
    await admin.save();

    return NextResponse.json(
      { message: "Produk berhasil ditambahkan", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat menambahkan produk:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menambahkan produk" },
      { status: 500 }
    );
  }
};
