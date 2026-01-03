"use client";

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            subtitle: "Future Tech on Your Wrist",
            title: "SMART WEARABLES.",
            discount: "UP TO 80% OFF",
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1000",
            bg: "linear-gradient(135deg, #FFAB91 0%, #FFCCBC 100%)",
            imgAlt: "Smart Watch"
        },
        {
            subtitle: "Immersive Sound Experience",
            title: "WIRELESS AUDIO.",
            discount: "PREMIUM BASS",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
            bg: "linear-gradient(135deg, #A7C5EB 0%, #B4D4F7 100%)",
            imgAlt: "Headphones"
        },
        {
            subtitle: "Next Gen Gaming",
            title: "VIRTUAL REALITY.",
            discount: "EXPLORE WORLDS",
            image: "https://images.unsplash.com/photo-1622979135228-5118449552a5?auto=format&fit=crop&q=80&w=1000",
            bg: "linear-gradient(135deg, #D4B2D8 0%, #EBCBF4 100%)",
            imgAlt: "VR Headset"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const slide = slides[currentSlide];

    return (
        <div className={styles.hero} style={{ background: slide.bg }}>
            <div className={`${styles.heroContent} ${styles.fadeIn}`}>
                <p>{slide.subtitle}</p>
                <h1>{slide.title}</h1>
                <p>{slide.discount}</p>
                <div className={styles.sliderDots}>
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={currentSlide === index ? styles.dotActive : styles.dot}
                            onClick={() => setCurrentSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
            <div className={`${styles.heroImage} ${styles.slideIn}`}>
                <img
                    key={currentSlide} // Force re-render for animation
                    src={slide.image}
                    alt={slide.imgAlt}
                />
            </div>
        </div>
    );
}
