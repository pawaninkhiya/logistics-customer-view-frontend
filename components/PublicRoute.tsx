'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || isAuthenticated) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}