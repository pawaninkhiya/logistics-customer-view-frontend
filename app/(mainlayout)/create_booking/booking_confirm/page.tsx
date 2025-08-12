'use client';

import BookingConfirmContent from '@/components/create_booking/BookingConfirmContent';
import { Suspense } from 'react';

export default function BookingConfirmPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-screen">
                    <span className="text-lg font-medium">Loading booking details...</span>
                </div>
            }
        >
            <BookingConfirmContent />
        </Suspense>
    );
}
