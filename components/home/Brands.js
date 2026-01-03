"use client";

import styles from './Brands.module.css';
import Link from 'next/link';

export default function Brands() {
    const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Asus', 'Logitech', 'Razer'];

    return (
        <section>
            <div className="section-header">
                <h2>Shop By Brands</h2>
                <Link href="/shop" className="view-all">View All {'>'}</Link>
            </div>
            <div className={styles.brandFlex}>
                {brands.map((brand, index) => (
                    <div key={index} className={styles.brandItem}>{brand}</div>
                ))}
            </div>
        </section>
    );
}
