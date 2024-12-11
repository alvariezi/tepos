import { adminRegister, existingAdmin } from "@/services/authServices";
import { hashPassword } from "@/helpers/helpers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { username, email, password } = await req.json();

    // Cek apakah username atau email sudah digunakan
    const isAdmin = await existingAdmin(username, email);
    if (isAdmin.length > 0) {
      return NextResponse.json(
        { message: "Username atau email telah digunakan" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Registrasi admin baru
    const data = { username, email, password: hashedPassword };
    await adminRegister(data);

    return NextResponse.json(
      { message: "Registrasi berhasil" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat registrasi" },
      { status: 500 }
    );
  }
};
