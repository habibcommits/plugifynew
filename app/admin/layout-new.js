"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiBox, FiGrid, FiUsers, FiShoppingBag, FiLogOut, FiLayers, FiShoppingCart, FiFileText, FiBarChart2, FiSettings, FiMenu, FiSearch, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import styles from './admin-new.module.css';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [productsExpanded, setProductsExpanded] = useState(true);

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarActive : ''}`}>
                <div className={styles.brand}>
                    <div className={styles.brandLogo}>
                        <FiShoppingBag />
                    </div>
                    <div className={styles.brandText}>
                        <h3>ADMIN</h3>
                        <p>Plugify</p>
                    </div>
                </div>

                <nav className={styles.menu}>
                    <Link
                        href="/admin/dashboard"
                        className={`${styles.menuItem} ${pathname === '/admin/dashboard' ? styles.menuItemActive : ''}`}
                    >
                        <FiGrid /> Dashboard
                    </Link>

                    <Link
                        href="/shop"
                        className={styles.menuItem}
                    >
                        <FiShoppingCart /> Online Store
                    </Link>

                    <div
                        className={`${styles.menuItem} ${styles.hasSubmenu} ${pathname.includes('/products') || pathname.includes('/categories') ? styles.menuItemActive : ''}`}
                        onClick={() => setProductsExpanded(!productsExpanded)}
                    >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <FiBox style={{ marginRight: '1rem' }} /> Products
                        </span>
                        {productsExpanded ? <FiChevronDown style={{ width: '16px', marginRight: 0 }} /> : <FiChevronRight style={{ width: '16px', marginRight: 0 }} />}
                    </div>
                    {productsExpanded && (
                        <div className={styles.submenu}>
                            <Link
                                href="/admin/products"
                                className={`${styles.submenuItem} ${pathname.includes('/products') ? styles.submenuItemActive : ''}`}
                            >
                                All Products
                            </Link>
                            <Link
                                href="/admin/categories"
                                className={`${styles.submenuItem} ${pathname.includes('/categories') ? styles.submenuItemActive : ''}`}
                            >
                                Categories
                            </Link>
                        </div>
                    )}

                    <Link
                        href="/admin/orders"
                        className={`${styles.menuItem} ${pathname.includes('/orders') ? styles.menuItemActive : ''}`}
                    >
                        <FiFileText /> Orders
                    </Link>

                    <Link
                        href="/admin/users"
                        className={`${styles.menuItem} ${pathname.includes('/users') ? styles.menuItemActive : ''}`}
                    >
                        <FiUsers /> Customers
                    </Link>

                    <Link
                        href="/admin/dashboard"
                        className={styles.menuItem}
                    >
                        <FiBarChart2 /> Reports
                    </Link>

                    <Link
                        href="/admin/dashboard"
                        className={styles.menuItem}
                    >
                        <FiSettings /> Settings
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <header className={styles.topHeader}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FiMenu
                            className={styles.mobileMenuToggle}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        />
                        <div className={styles.searchBar}>
                            <FiSearch style={{ width: '18px', color: 'var(--admin-text-muted)' }} />
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className={styles.userProfile}>
                        <img
                            src="https://i.pravatar.cc/150?img=68"
                            alt="Profile"
                            className={styles.userAvatar}
                        />
                        <span className={styles.userName}>{user?.name || 'Admin User'}</span>
                        <FiChevronDown style={{ width: '16px' }} />
                    </div>
                </header>

                <div className={styles.pageContent}>
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 99,
                        display: window.innerWidth <= 1024 ? 'block' : 'none'
                    }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
