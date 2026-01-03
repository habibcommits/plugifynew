import ProductForm from '../ProductForm';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';

async function getProduct(id) {
    await dbConnect();
    const product = await Product.findById(id).populate('category');
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
}

export default async function EditProduct({ params }) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <ProductForm initialData={product} />
        </div>
    );
}
