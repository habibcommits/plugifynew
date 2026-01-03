"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiSearch, FiBell, FiMessageSquare, FiUser } from 'react-icons/fi';
import styles from './AdminHeader.module.css';

export default function AdminHeader({ user }) {
    const pathname = usePathname();
    const getBreadcrumb = () => {
        const parts = pathname.split('/').filter(p => p !== '');
        return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' > ');
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.breadcrumbs}>
                    {getBreadcrumb()}
                </div>
                <div className={styles.projectStatus}>
                    <span className={styles.statusDot}></span>
                    Active
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.searchBar}>
                    <FiSearch />
                    <input type="text" placeholder="Search..." />
                </div>

                <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                        <FiMessageSquare />
                    </button>
                    <button className={styles.actionBtn}>
                        <FiBell />
                        <span className={styles.badge}>3</span>
                    </button>
                </div>

                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <FiUser />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user?.name || 'Admin'}</span>
                        <span className={styles.userRole}>{user?.role || 'Super Admin'}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
