"use client";

import Link from 'next/link';
import styles from './CategoryRoller.module.css';

const categories = [
    { name: 'Laptops', slug: 'laptops' },
    { name: 'Mobiles', slug: 'mobiles' },
    { name: 'Smart Watches', slug: 'smart-watches' },
    { name: 'Headphones', slug: 'headphones' },
    { name: 'Gaming Console', slug: 'gaming' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Speakers', slug: 'speakers' },
    { name: 'Cameras', slug: 'cameras' },
];

const CategoryRoller = () => {
    return (
        <div className={styles.rollerContainer}>
            <h3 className={styles.label}>Browse Categories</h3>
            <div className={styles.marquee}>
                <div className={styles.track}>
                    {[...categories, ...categories].map((cat, index) => (
                        <Link
                            key={`${cat.slug}-${index}`}
                            href={`/shop?category=${cat.slug}`}
                            className={styles.categoryCard}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryRoller;
