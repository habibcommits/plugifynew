"use client";

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import styles from './product.module.css';

const ProductActions = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    const handleAddToCart = () => {
        setAdding(true);
        addToCart(product, quantity);
        setTimeout(() => setAdding(false), 1000);
    };

    return (
        <div className={styles.actions}>
            <div className={styles.quantity}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button
                onClick={handleAddToCart}
                className={styles.addBtn}
                disabled={adding}
            >
                {adding ? 'Added!' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductActions;
