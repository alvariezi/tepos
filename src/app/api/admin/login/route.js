import { existingAdmin } from "@/services/authServices";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET;

export const POST = async (req) => {
  try {
    const { username, password } = await req.json();

    const admin = await existingAdmin(username);
    if (admin.length === 0) {
      return NextResponse.json(
        { error: "Username tidak ditemukan" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin[0].password);
    if (!isMatch) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    const token = jwt.sign(
      { username: admin[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Login berhasil", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat login" },
      { status: 500 }
    );
  }
};
