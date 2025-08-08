'use client';

import { useAuth } from "@/contexts/AuthProvider";


export default function MixedRoute({ children }: { children: React.ReactNode }) {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}