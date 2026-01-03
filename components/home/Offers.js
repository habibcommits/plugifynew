"use client";

import Link from 'next/link';
import { FiPercent, FiBox, FiUserPlus, FiCalendar } from 'react-icons/fi';
import styles from './Offers.module.css';

export default function Offers() {
    const offers = [
        { title: 'Flash Sale', desc: 'Get 50% off on all electronics for a limited time.', tag: 'LIVE NOW', color: 'red', bg: '#FFEbee', icon: FiPercent, iconColor: 'var(--sh-orange)', btn: 'Shop Now' },
        { title: 'Bundle Deal', desc: 'Combine products and save up to 30% more.', tag: 'POPULAR', color: 'blue', bg: '#E3F2FD', icon: FiBox, iconColor: 'var(--sh-blue)', btn: 'View Details', blueBtn: true },
        { title: 'First Order', desc: 'Special discount for your very first purchase.', tag: 'NEW USERS', color: 'green', bg: '#E8F5E9', icon: FiUserPlus, iconColor: 'green', btn: 'Claim Now' },
        { title: 'Weekend Special', desc: 'Exclusive deals available every Saturday.', tag: 'WEEKEND', color: '#F9A825', bg: '#FFF9C4', icon: FiCalendar, iconColor: '#F9A825', btn: 'Explore Deals' },
    ];

    return (
        <section>
            <div className="section-header">
                <h2>Special Offers</h2>
                <Link href="/shop" className="view-all">View All {'>'}</Link>
            </div>
            <div className={styles.offerGrid}>
                {offers.map((offer, index) => (
                    <div key={index} className={styles.offerCard}>
                        <span className={styles.offerTag} style={{ background: offer.bg, color: offer.color }}>{offer.tag}</span>
                        <offer.icon style={{ fontSize: '28px', marginBottom: '15px', display: 'block', color: offer.iconColor }} />
                        <h3>{offer.title}</h3>
                        <p>{offer.desc}</p>
                        <Link href="/shop" className={`${styles.offerBtn} ${offer.blueBtn ? styles.btnBlue : ''}`}>{offer.btn}</Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
