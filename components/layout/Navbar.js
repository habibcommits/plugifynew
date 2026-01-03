"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className="container">
                {/* Top Bar */}
                <div className={styles.topBar}>
                    <div className={styles.topLinks}>
                        <span>Category</span> | <span>Shop</span> | <span>About</span> | <span>Blog</span> | <span>Contact</span>
                    </div>
                    <div className={styles.topSettings}>
                        <span>English v</span> | <span>USD v</span> |
                        <span className={styles.socialIcons}>
                            <FaTwitter /> <FaFacebook />
                        </span>
                    </div>
                </div>

                {/* Main Nav */}
                <nav className={styles.mainNav}>
                    <Link href="/" className={styles.logo}>
                        <FiShoppingCart className={styles.logoIcon} /> Plugify
                    </Link>

                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="Search for Products, Brand and More..." />
                        <button><FiSearch /></button>
                    </div>

                    <div className={styles.navIcons}>
                        <div className={styles.authLinks}>
                            <FiUser />
                            {user ? (
                                <span onClick={logout} style={{ cursor: 'pointer' }}>Logout</span>
                            ) : (
                                <Link href="/login">Sign Up/Sign In</Link>
                            )}
                        </div>
                        <Link href="/cart" className={styles.cartLink}>
                            <FiShoppingCart />
                            <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
                        </Link>
                        {user?.role === 'admin' && (
                            <Link href="/admin/dashboard" className={styles.adminBadge}>Admin</Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
