import { getAllProduct } from "@/services/productServices";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const allProduct = await getAllProduct(id);
    return NextResponse.json({
      message: "Semua Data Product",
      data: allProduct,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
    });
  }
};
