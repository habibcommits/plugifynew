"use client";

import { FiUsers, FiBox, FiGlobe, FiHeadphones } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import styles from './StatsBar.module.css';

export default function StatsBar() {
    const stats = [
        { label: 'Happy Customers', value: '120K', icon: FiUsers },
        { label: 'Brand Partners', value: '1,850+', icon: FaHandshake },
        { label: 'Products Sold', value: '230K', icon: FiBox },
        { label: 'Countries Served', value: '15+', icon: FiGlobe },
        { label: 'Friendly Services', value: '24/7', icon: FiHeadphones },
    ];

    return (
        <section className={styles.statsBar}>
            {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                    <stat.icon style={{ color: 'var(--sh-orange)', fontSize: '24px', marginBottom: '10px' }} />
                    <h2>{stat.value}</h2>
                    <p>{stat.label}</p>
                </div>
            ))}
        </section>
    );
}
