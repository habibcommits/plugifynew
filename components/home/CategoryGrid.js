"use client";

import Link from 'next/link';
import { FiMonitor, FiShoppingBag, FiHeadphones, FiHome, FiWatch } from 'react-icons/fi';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid() {
    const categories = [
        { name: 'Laptops', sub: 'High performance', icon: FiMonitor },
        { name: 'Smartphones', sub: 'Latest models', icon: FiShoppingBag, active: true },
        { name: 'Audio', sub: 'Headphones & more', icon: FiHeadphones },
        { name: 'Wearables', sub: 'Watches & bands', icon: FiWatch },
        { name: 'Accessories', sub: 'Cables & chargers', icon: FiHome },
    ];
    return (
        <section>
            <div className="section-header">
                <h2>Shop by Category</h2>
                <Link href="/shop" className="view-all">View All {'>'}</Link>
            </div>
            <div className={styles.categoryGrid}>
                {categories.map((cat, index) => (
                    <div key={index} className={`${styles.catCard} ${cat.active ? styles.active : ''}`}>
                        <div className={styles.iconBox}>
                            <cat.icon />
                        </div>
                        <h3>{cat.name}</h3>
                        <p>{cat.sub}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
