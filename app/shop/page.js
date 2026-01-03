import ProductCard from '@/components/ui/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryRoller from '@/components/layout/CategoryRoller';
import Link from 'next/link';
import styles from './shop.module.css';

async function getProducts(searchParams) {
    // Build query string manually to avoid Symbol conversion issues
    const params = new URLSearchParams();

    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.page) params.set('page', searchParams.page);
    if (searchParams.limit) params.set('limit', searchParams.limit);

    const queryString = params.toString();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?${queryString}`, {
            cache: 'no-store',
        });

        if (!res.ok) return { products: [], totalPages: 0, currentPage: 1 };

        return await res.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return { products: [], totalPages: 0, currentPage: 1 };
    }
}

async function getCategories() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
            cache: 'no-store', // Categories might change
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.categories || [];
    } catch (error) {
        return [];
    }
}

export default async function Shop({ searchParams }) {
    const { products, totalPages, currentPage } = await getProducts(searchParams);
    const categories = await getCategories();
    const currentCategory = searchParams.category || 'all';

    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Shop Gadgets</h1>
                    <p className={styles.subtitle}>Explore our premium collection</p>
                </div>
            </div>

            <div className={`container ${styles.content}`}>
                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterGroup}>
                        <h3>Categories</h3>
                        <div className={styles.filterList}>
                            <Link
                                href="/shop"
                                className={`${styles.filterItem} ${currentCategory === 'all' ? styles.active : ''}`}
                            >
                                All Products
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat._id}
                                    href={`/shop?category=${cat.slug}`}
                                    className={`${styles.filterItem} ${currentCategory === cat.slug ? styles.active : ''}`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className={styles.gridContainer}>
                    {products.length > 0 ? (
                        <div className={styles.grid}>
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <p>No products found in this category.</p>
                            <Link href="/shop" className={styles.resetBtn}>View All Products</Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            {currentPage > 1 && (
                                <Link href={`/shop?page=${currentPage - 1}${currentCategory !== 'all' ? `&category=${currentCategory}` : ''}`} className={styles.pageBtn}>
                                    Previous
                                </Link>
                            )}

                            <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>

                            {currentPage < totalPages && (
                                <Link href={`/shop?page=${currentPage + 1}${currentCategory !== 'all' ? `&category=${currentCategory}` : ''}`} className={styles.pageBtn}>
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
