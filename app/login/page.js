"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './login.module.css';

export default function Login() {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Registration failed');
                }

                // Auto login after registration
                await login(formData.email, formData.password);
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Plugify<span className={styles.dot}>.</span>
                </Link>

                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <p>{isLogin ? 'Login to access your account' : 'Join Plugify today'}</p>
                    </div>

                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {!isLogin && (
                            <div className={styles.field}>
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    placeholder="John Doe"
                                />
                            </div>
                        )}

                        <div className={styles.field}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" disabled={loading} className={styles.submitBtn}>
                            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        <p>
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleBtn}>
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>

                <div className={styles.backLink}>
                    <Link href="/">← Back to Home</Link>
                </div>
            </div>
        </main>
    );
}
