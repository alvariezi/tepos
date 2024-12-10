import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: "Koneksi MongoDB berhasil." });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghubungkan ke MongoDB.", error: error.message },
      { status: 500 }
    );
  }
};
