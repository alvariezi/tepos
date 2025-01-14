import { deleteProduct, updateProduct } from "@/services/productServices";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const resolvedParams = await params;
  const { id: idAdmin, idProduct } = resolvedParams;

  try {
    if (!idAdmin || !idProduct) {
      return NextResponse.json(
        { message: "ID admin atau produk harus disediakan" },
        { status: 400 }
      );
    }

    const data = await deleteProduct(idAdmin, idProduct);
    return NextResponse.json(
      { message: "Produk berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat menghapus produk:", error.message);
    return NextResponse.json(
      { message: error.message || "Terjadi kesalahan saat menghapus produk" },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const resolvedParams = await params;
    const { id: idAdmin, idProduct } = resolvedParams;
    const updatedData = await req.json();

    if (!idAdmin || !idProduct) {
      return NextResponse.json(
        { message: "ID admin atau produk tidak valid" },
        { status: 400 }
      );
    }

    const updatedProduct = await updateProduct(idAdmin, idProduct, updatedData);

    return NextResponse.json(
      {
        message: "Produk berhasil diperbarui",
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat memperbarui produk:", error);
    return NextResponse.json(
      { message: error.message || "Gagal memperbarui produk" },
      { status: 500 }
    );
  }
};
