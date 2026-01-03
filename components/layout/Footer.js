"use client";

import styles from './Footer.module.css';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiShoppingBag, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
// Using FontAwesome icons requires library setup, sticking to simple icons or React Icons for simplicity as they are already installed.

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    <div className={styles.footerCol}>
                        <div className={styles.logo}>
                            <FiShoppingBag /> Plugify
                        </div>
                        <p className={styles.desc}>Join thousands of satisfied clients who shop with confidence at Plugify.</p>
                        <div className={styles.socialIcons}>
                            <FiFacebook />
                            <FiTwitter />
                            <FiInstagram />
                            <FiLinkedin />
                        </div>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Categories</h4>
                        <ul>
                            <li><Link href="/shop?category=laptops">Laptops</Link></li>
                            <li><Link href="/shop?category=smartphones">Smartphones</Link></li>
                            <li><Link href="/shop?category=smart-watches">Smart Watches</Link></li>
                            <li><Link href="/shop?category=audio">Audio</Link></li>
                            <li><Link href="/shop?category=accessories">Accessories</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/faqs">FAQs</Link></li>
                            <li><Link href="/shop">Shop</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Customer Support</h4>
                        <ul>
                            <li><Link href="/help">Help Centre</Link></li>
                            <li><Link href="/support/ticket">Help Ticket</Link></li>
                            <li><Link href="/returns">Returns</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Contact Us</h4>
                        <p className={styles.contactItem}><FiMail /> support@plugify.com</p>
                        <p className={styles.contactItem}><FiPhone /> +1 (555) 123-4567</p>
                        <p className={styles.contactItem}><FiMapPin /> 123 Tech Avenue, Silicon Valley, CA</p>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div>© 2026 Plugify All right reserved | Terms of Service</div>
                    <div>We Accept: Visa | Mastercard | Stripe</div>
                </div>
            </div>
        </footer>
    );
}
