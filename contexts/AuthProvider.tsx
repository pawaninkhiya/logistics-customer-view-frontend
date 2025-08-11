'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, verifyOTP } from '@/services/customers/customers';
import { UserData } from '@/types/userTypes';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
    user: UserData | null;
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginMutation: UseMutationResult<string, Error, string, unknown>;
    verifyOTPMutation: UseMutationResult<
        UserData,
        Error,
        { contact_no: number; verification_code: number },
        unknown
    >;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                const userData = localStorage.getItem('user');

                if (token && userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Failed to parse user data', error);
                clearAuthData();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Handle route protection
    useEffect(() => {
        if (isLoading) return;

        const publicRoutes = ['/login'];
        const isPublicRoute = publicRoutes.includes(pathname);
        const isAuthenticated = !!user;

        if (isAuthenticated && isPublicRoute) {
            router.push('/');
            return;
        }

        if (!isAuthenticated && !isPublicRoute) {
            router.push('/login');
            return;
        }
    }, [isLoading, user, pathname, router]);

    const clearAuthData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const loginMutation = useMutation({
        mutationKey: ['send-otp'],
        mutationFn: async (phone: string) => await login({ contact_no: phone }),
        onError: (error) => {
            console.error('Login error:', error);
        },
    });

    const verifyOTPMutation = useMutation({
        mutationKey: ['verify-otp'],
        mutationFn: async ({
            verification_code,
            contact_no,
        }: {
            contact_no: number;
            verification_code: number;
        }) => {
            const response = await verifyOTP({ contact_no, verification_code });
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data;
        },
        onSuccess: () => {
            router.push('/');
        },
        onError: (error) => {
            console.error('OTP verification error:', error);
        },
    });

    const logout = () => {
        clearAuthData();
        router.push('/login');
    };

    const value: AuthContextType = {
        user,
        setUser,
        isAuthenticated: !!user,
        isLoading,
        loginMutation,
        verifyOTPMutation,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};