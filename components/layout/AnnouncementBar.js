"use client";

import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './AnnouncementBar.module.css';

const AnnouncementBar = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className={styles.bar}>
            <div className="container">
                <p className={styles.text}>
                    🎉 Special Offer: Get 20% off on all accessories! Use code <strong>PLUGIFY20</strong>
                </p>
            </div>
            <button className={styles.close} onClick={() => setIsVisible(false)}>
                <FiX />
            </button>
        </div>
    );
};

export default AnnouncementBar;
