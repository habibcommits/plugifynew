"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    return (
        <div className={styles.card}>
            {product.discount > 0 && (
                <span className={styles.badge}>-{product.discount}%</span>
            )}

            <Link href={`/product/${product._id}`} className={styles.imageLink}>
                <img
                    src={product.images[0]?.url}
                    alt={product.title}
                    className={styles.image}
                />
            </Link>

            <div className={styles.content}>
                <Link href={`/product/${product._id}`}>
                    <h3 className={styles.title}>{product.title}</h3>
                </Link>

                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                        <FiStar
                            key={i}
                            className={i < (product.rating || 4) ? styles.starFilled : styles.starEmpty}
                        />
                    ))}
                    <span className={styles.reviewCount}>({product.numReviews || 12} Reviews)</span>
                </div>

                <div className={styles.priceRow}>
                    <span className={styles.price}>${product.price} USD</span>
                </div>

                <div className={styles.actions}>
                    <button className={styles.addToCartBtn}>
                        <FiShoppingCart /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
