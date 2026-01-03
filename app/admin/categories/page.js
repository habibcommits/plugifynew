"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', image: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.categories || []);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create category');
            }

            setNewCategory({ name: '', image: '' });
            setSuccess('Category created successfully!');
            fetchCategories();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Categories</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="bg-surface border border-border rounded-lg p-6 h-fit">
                    <h2 className="text-lg font-bold mb-4">Add New Category</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                className="w-full bg-[#202020] border border-border rounded p-2 text-white"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Category'}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="md:col-span-2 bg-surface border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#202020] text-gray-400">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat._id} className="border-b border-border hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{cat.name}</td>
                                    <td className="p-4 text-gray-400">{cat.slug}</td>
                                    <td className="p-4 flex gap-2">
                                        <button className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-gray-500">No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
