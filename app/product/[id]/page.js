import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import ProductActions from './ProductActions'; // Client component for cart interactions
import styles from './product.module.css';
import { FiCheck, FiTruck, FiShield } from 'react-icons/fi';

async function getProduct(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.product;
    } catch (error) {
        return null;
    }
}

async function getRelatedProducts(category, currentId) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${category}&limit=4`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.products.filter(p => p._id !== currentId) || [];
    } catch (error) {
        return [];
    }
}

export default async function ProductDetail({ params }) {
    const product = await getProduct(params.id);

    if (!product) {
        return (
            <main className={styles.main}>
                <Navbar />
                <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
                    <h1>Product not found</h1>
                </div>
                <Footer />
            </main>
        );
    }

    const relatedProducts = await getRelatedProducts(product.category._id, product._id);

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={`container ${styles.content}`}>
                {/* Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <img src={product.images[0]} alt={product.title} />
                    </div>
                    <div className={styles.thumbnails}>
                        {product.images.map((img, index) => (
                            <div key={index} className={styles.thumbnail}>
                                <img src={img} alt={`${product.title} ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className={styles.info}>
                    <div className={styles.header}>
                        <span className={styles.category}>{product.category.name}</span>
                        <h1 className={styles.title}>{product.title}</h1>
                        <div className={styles.priceContainer}>
                            <span className={styles.price}>${product.price}</span>
                            {product.discountPrice > 0 && (
                                <span className={styles.originalPrice}>${product.discountPrice}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.description}>
                        <p>{product.description}</p>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <FiCheck className={styles.check} /> <span>In Stock</span>
                        </div>
                        <div className={styles.feature}>
                            <FiTruck className={styles.check} /> <span>Free Shipping</span>
                        </div>
                        <div className={styles.feature}>
                            <FiShield className={styles.check} /> <span>2 Year Warranty</span>
                        </div>
                    </div>

                    <ProductActions product={product} />
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className={`container ${styles.related}`}>
                    <h2 className={styles.sectionTitle}>Related Products</h2>
                    <div className={styles.grid}>
                        {relatedProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
