import { adminRegister, existingAdmin } from "@/services/authServices";
import { hashPassword } from "@/helpers/helpers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { username, email, password } = await req.json();
    console.log("Received data:", { username, email, password });

    const isAdmin = await existingAdmin(username);
    console.log("Admin check result:", isAdmin);

    if (isAdmin.length > 0) {
      return NextResponse.json(
        { message: "username telah digunakan" },
        { status: 400 }
      );
    }

    const newPassword = hashPassword(password);
    const data = {
      username: username,
      email: email,
      password: newPassword,
    };
    await adminRegister(data);

    console.log("Registration successful");
    return NextResponse.json(
      { message: "registrasi berhasil" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse(
      { message: "error ketika registrasi" },
      { status: 500 }
    );
  }
};
