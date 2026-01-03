"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            // In a real app, you might hit a /api/auth/me endpoint here
            // For now, we'll check localStorage or just rely on the API responses setting user data
            // This is a simplified implementation
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on user role
            if (data.user.role === 'admin' || data.user.role === 'super-admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }

            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('user');
        // Also hit logout API to clear cookie
        // await fetch('/api/auth/logout'); 
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
