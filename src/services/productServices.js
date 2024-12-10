import Product from "@/models/product";
import { connectMongoDB } from "@/lib/mongodb";

export async function getAllProducts() {
  await connectMongoDB();
  return Product.find({});
}

export async function addProduct(data) {
  await connectMongoDB();
  const newProduct = new Product(data);
  return newProduct.save();
}
