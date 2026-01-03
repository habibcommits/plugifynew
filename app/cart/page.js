"use client";

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import styles from './cart.module.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const handleCheckout = () => {
        if (!user) {
            alert('Please login to checkout');
            return;
        }
        // Mock checkout
        alert('Order placed successfully! (Mock)');
        clearCart();
    };

    return (
        <main className={styles.main}>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Your Cart</h1>

                {cart.length > 0 ? (
                    <div className={styles.content}>
                        <div className={styles.cartItems}>
                            {cart.map((item) => (
                                <div key={item._id} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        <img src={item.images[0]} alt={item.title} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <Link href={`/product/${item._id}`} className={styles.itemName}>
                                            {item.title}
                                        </Link>
                                        <p className={styles.itemPrice}>${item.price}</p>
                                        <div className={styles.quantityControls}>
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                                                <FiMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                                <FiPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.itemTotal}>
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className={styles.removeBtn}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                            <div className={styles.summaryCard}>
                                <h2>Order Summary</h2>
                                <div className={styles.summaryRow}>
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className={`${styles.summaryRow} ${styles.total}`}>
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <button onClick={handleCheckout} className={styles.checkoutBtn}>
                                    {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any products yet.</p>
                        <Link href="/shop" className={styles.continueBtn}>
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default CartPage;
