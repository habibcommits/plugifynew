"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import styles from './HeroSlider.module.css';

const slides = [
    {
        id: 1,
        title: "Next-Gen Laptops",
        subtitle: "Power meets portability",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        link: "/shop?category=laptops",
        color: "#6d28d9"
    },
    {
        id: 2,
        title: "Premium Audio",
        subtitle: "Immersive sound experience",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        link: "/shop?category=audio",
        color: "#00d4ff"
    },
    {
        id: 3,
        title: "Smart Accessories",
        subtitle: "Enhance your lifestyle",
        image: "https://images.unsplash.com/photo-1551817958-c96602072369?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        link: "/shop?category=accessories",
        color: "#10b981"
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.hero}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === current ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className={styles.overlay} />
                    <div className={`container ${styles.content}`}>
                        <h2 className={styles.subtitle} style={{ color: slide.color }}>{slide.subtitle}</h2>
                        <h1 className={styles.title}>{slide.title}</h1>
                        <Link href={slide.link} className={styles.cta}>
                            Shop Now <FiArrowRight />
                        </Link>
                    </div>
                </div>
            ))}

            <div className={styles.indicators}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === current ? styles.active : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
