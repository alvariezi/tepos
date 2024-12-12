import { getAllProduct } from "@/services/productServices";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    const allProduct = await getAllProduct(id);
    return NextResponse.json({
      message: "Semua Data Product",
      data: allProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
