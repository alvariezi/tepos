import { getAllProduct } from "@/services/productServices";
import jwt from "jsonwebtoken";

export const GET = async (req, { params }) => {
  try {
    // Resolving params (peraturan Next.js)
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Validasi API Key
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return new Response(JSON.stringify({ message: "Invalid API key" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validasi Authorization Header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "No token provided" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verifikasi JWT
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Cek jika token tidak sesuai dengan ID Admin
    if (decoded.idAdmin !== id) {
      return new Response(JSON.stringify({ message: "Unauthorized access" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Ambil produk dari database
    const products = await getAllProduct(id);
    if (!products || products.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Respons sukses
    return new Response(
      JSON.stringify({ message: "Products fetched", data: products }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in GET /api/product/[id]:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};