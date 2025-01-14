import { getAllProduct } from "@/services/productServices";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 403 });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    if (decoded.idAdmin !== id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    const products = await getAllProduct(id);
    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Products fetched", data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/product/[id]:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
