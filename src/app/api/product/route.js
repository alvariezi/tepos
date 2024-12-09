import { getAllProducts, addProduct } from "@/services/productServices";

export async function GET() {
  try {
    const products = await getAllProducts();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch products" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Validasi data
    if (!data.name || !data.category || !data.price || !data.image) {
      return new Response(
        JSON.stringify({
          error: "All fields are required: name, category, price, image",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newProduct = await addProduct(data);
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to add product" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
