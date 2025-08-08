'use client';

import { useAuth } from '@/contexts/AuthProvider';
import Image from 'next/image';
import { SvgIcons } from '@/assets/svgIcons';
export default function GlobalLoading() {
    const { isLoading } = useAuth();

    if (!isLoading) return null;

    return (
        <div className="bg-[#FFF4E9] w-full h-screen flex flex-col items-center justify-center">
            <Image
                src={SvgIcons.Logo}
                alt="Company Logo"
                className="w-[150px]"
            />
        </div>
    );
}