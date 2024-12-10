import Product from '@/models/product';
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

export async function getProductById(id) {
    await connectMongoDB();
    return Product.findById(id);
}

export async function updateProductById(id, data) {
    await connectMongoDB();
    return Product.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProductById(id) {
    await connectMongoDB();
    return Product.findByIdAndDelete(id);
}
