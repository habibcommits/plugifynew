"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IKContext, IKUpload } from 'imagekitio-react';
import styles from '../admin.module.css';

const ProductForm = ({ initialData = null }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        discountPrice: initialData?.discountPrice || '',
        category: initialData?.category?._id || initialData?.category || '',
        stock: initialData?.stock || 0,
        images: initialData?.images || [],
        isFeatured: initialData?.isFeatured || false,
    });

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data.categories || []));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUploadSuccess = (res) => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, res.url]
        }));
    };

    const handleUploadError = (err) => {
        console.error('Upload Error', err);
        alert('Image upload failed');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData
                ? `/api/products/${initialData._id}`
                : `/api/products`;

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save product');

            router.push('/admin/products');
            router.refresh();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IKContext
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            authenticationEndpoint={`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/imagekit`}
        >
            <form onSubmit={handleSubmit} className="max-w-2xl bg-surface p-6 rounded-lg border border-border">
                <div className="grid gap-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-[#202020] border border-border rounded p-2 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-[#202020] border border-border rounded p-2 text-white"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-[#202020] border border-border rounded p-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Discount Price (Optional)</label>
                            <input
                                type="number"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={handleChange}
                                className="w-full bg-[#202020] border border-border rounded p-2 text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full bg-[#202020] border border-border rounded p-2 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-[#202020] border border-border rounded p-2 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Images</label>
                        <div className="flex flex-wrap gap-4 mb-4">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="w-20 h-20 relative bg-gray-800 rounded overflow-hidden">
                                    <img src={img} alt="Product" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                                        className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <IKUpload
                            onSuccess={handleUploadSuccess}
                            onError={handleUploadError}
                            className="text-white"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <label htmlFor="isFeatured" className="text-sm font-medium">Featured Product</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </IKContext>
    );
};

export default ProductForm;
