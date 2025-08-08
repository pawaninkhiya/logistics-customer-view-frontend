// components/GlobalLoading.tsx
'use client';

import { useAuth } from '@/contexts/AuthProvider';

export default function GlobalLoading() {
    const { isLoading } = useAuth();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
}