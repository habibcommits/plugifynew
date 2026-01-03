"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiDownload, FiUpload, FiPlus, FiFilter, FiSearch, FiMoreHorizontal, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from '../admin-new.module.css';

async function getProducts() {
    try {
        const res = await fetch(`/api/products?all=true`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.products || [];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export default function AdminProductsPage() {
    return <ProductsContent />;
}

function ProductsContent() {
    const [activeTab, setActiveTab] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch products on mount
    useState(() => {
        async function loadProducts() {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        }
        loadProducts();
    }, []);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(products.map(p => p._id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pid => pid !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    const handleStatusToggle = async (productId, currentStatus) => {
        // TODO: Implement API call to update product status
        console.log('Toggle status for:', productId, currentStatus);
    };

    // Pagination
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Products</h2>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline" style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '6px',
                        border: '1px solid var(--admin-primary)',
                        background: 'transparent',
                        color: 'var(--admin-primary)',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem'
                    }}>
                        <FiDownload style={{ width: '16px' }} /> Export
                    </button>
                    <button className="btn btn-outline" style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '6px',
                        border: '1px solid var(--admin-primary)',
                        background: 'transparent',
                        color: 'var(--admin-primary)',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem'
                    }}>
                        <FiUpload style={{ width: '16px' }} /> Import
                    </button>
                    <Link href="/admin/products/new">
                        <button style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '6px',
                            border: '1px solid var(--admin-primary)',
                            background: 'var(--admin-primary)',
                            color: 'white',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <FiPlus style={{ width: '18px' }} /> Add Product
                        </button>
                    </Link>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.tabs}>
                    <div
                        className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Products
                    </div>
                    <div
                        className={`${styles.tab} ${activeTab === 'active' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('active')}
                    >
                        Active
                    </div>
                    <div
                        className={`${styles.tab} ${activeTab === 'inactive' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('inactive')}
                    >
                        Inactive
                    </div>
                    <div
                        className={`${styles.tab} ${activeTab === 'outofstock' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('outofstock')}
                    >
                        Out of stock
                    </div>
                </div>

                <div className={styles.tableControls}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', marginRight: '1rem' }}>{products.length} Products</span>
                        <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', marginRight: '0.5rem' }}>Show</span>
                        <select style={{ padding: '0.4rem', border: '1px solid var(--admin-border)', borderRadius: '4px', color: 'var(--admin-text-dark)' }}>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <span className={styles.showingText}>Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, products.length)} of {products.length}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--admin-primary)',
                            background: 'transparent',
                            color: 'var(--admin-primary)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <FiFilter style={{ width: '16px' }} /> Filter
                        </button>
                        <div className={styles.searchProducts}>
                            <FiSearch style={{ width: '16px', color: 'var(--admin-text-muted)' }} />
                            <input type="text" placeholder="Search Products" />
                        </div>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedProducts.length === products.length && products.length > 0}
                                    />
                                </th>
                                <th>Product Name</th>
                                <th>Image</th>
                                <th>Sale Price</th>
                                <th>Status</th>
                                <th>Inventory</th>
                                <th>SKU</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td>
                                </tr>
                            ) : paginatedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No products found</td>
                                </tr>
                            ) : (
                                paginatedProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product._id)}
                                                onChange={() => handleSelectProduct(product._id)}
                                            />
                                        </td>
                                        <td>
                                            <div className={styles.productCell}>{product.name}</div>
                                        </td>
                                        <td>
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/36x36.png?text=Img'}
                                                className={styles.productThumb}
                                                alt={product.name}
                                            />
                                        </td>
                                        <td>${product.price?.toFixed(2)}</td>
                                        <td>
                                            <div
                                                className={`${styles.statusToggle} ${product.inStock ? styles.statusActive : ''}`}
                                                onClick={() => handleStatusToggle(product._id, product.inStock)}
                                            >
                                                <div className={styles.toggleSwitch}></div>
                                                <span>{product.inStock ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </td>
                                        <td>{product.stock || 0} in stock</td>
                                        <td>{product.sku || 'N/A'}</td>
                                        <td>
                                            <Link href={`/admin/products/${product._id}`}>
                                                <button style={{ border: 'none', background: 'transparent', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                                                    <FiMoreHorizontal />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <div
                            className={styles.pageNav}
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                        >
                            <FiChevronLeft style={{ width: '16px' }} /> Prev
                        </div>
                        {[...Array(Math.min(5, totalPages))].map((_, i) => (
                            <div
                                key={i}
                                className={`${styles.pageItem} ${currentPage === i + 1 ? styles.pageItemActive : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </div>
                        ))}
                        {totalPages > 5 && (
                            <>
                                <div className={styles.pageItem}>...</div>
                                <div
                                    className={styles.pageItem}
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </div>
                            </>
                        )}
                        <div
                            className={styles.pageNav}
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                        >
                            Next <FiChevronRight style={{ width: '16px' }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
