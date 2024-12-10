import { getProductById, updateProductById, deleteProductById } from '@/services/productService';

export async function GET(req, { params }) {
    try {
        const product = await getProductById(params.id);
        if (!product) return new Response('Product not found', { status: 404 });

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(req, { params }) {
    try {
        const data = await req.json();
        const updatedProduct = await updateProductById(params.id, data);
        if (!updatedProduct) return new Response('Product not found', { status: 404 });

        return new Response(JSON.stringify(updatedProduct), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(req, { params }) {
    try {
        const deletedProduct = await deleteProductById(params.id);
        if (!deletedProduct) return new Response('Product not found', { status: 404 });

        return new Response(JSON.stringify(deletedProduct), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
