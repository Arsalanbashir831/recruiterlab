import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiCaller from '@/helper/apiCaller';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                router.push('/auth');
                return;
            }
            try {
                await apiCaller('/users/token/verify/', 'POST', {token:accessToken}, true);
                setIsLoggedIn(true);
            } catch (error) {
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (!refreshToken) throw new Error('No refresh token available');
                    const refreshResponse = await apiCaller('/users/token/refresh/', 'POST', { refresh:refreshToken });
                    const { access } = refreshResponse;
                    localStorage.setItem('accessToken', access);
                    setIsLoggedIn(true);
                } catch (refreshError) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    router.push('/auth');
                }
            }
        };

        checkAuth();
    }, [router]);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
