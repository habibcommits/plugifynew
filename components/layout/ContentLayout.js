"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './ContentLayout.module.css';

export default function ContentLayout({ title, children }) {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>{title}</h1>
                </div>
            </div>
            <div className={styles.contentContainer}>
                {children}
            </div>
            <Footer />
        </div>
    );
}
