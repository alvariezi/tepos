import { deleteProduct, editProduct } from "@/services/productServices";

export const DELETE = async (req, context) => {
  const params = await context.params;
  const { id: idAdmin, idProduct } = params;

  try {
    if (!idAdmin || !idProduct) {
      return new Response(
        JSON.stringify({ error: "Id admin dan id produk harus disediakan" }),
        { status: 400 }
      );
    }

    const result = await deleteProduct(idAdmin, idProduct);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Terjadi kesalahan" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req, context) => {
  const params = await context.params;
  const { id: idAdmin, idProduct } = params;

  try {
    if (!idAdmin || !idProduct) {
      return new Response(
        JSON.stringify({ error: "Id admin dan id produk harus disediakan" }),
        { status: 400 }
      );
    }

    const updatedData = await req.json();

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return new Response(
        JSON.stringify({ error: "Data untuk update tidak valid" }),
        { status: 400 }
      );
    }

    const result = await editProduct(idAdmin, idProduct, updatedData);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error editing product:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Terjadi kesalahan" }),
      { status: 500 }
    );
  }
};
