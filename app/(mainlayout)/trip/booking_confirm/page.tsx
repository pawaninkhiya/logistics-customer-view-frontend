'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BookingConfirmPage = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const raw = searchParams.get('data');
        if (raw) {
            try {
                setData(JSON.parse(decodeURIComponent(raw)));
            } catch (e) {
                console.error('Error parsing data', e);
            }
        }
    }, [searchParams]);

    if (!data) return <p>Loading booking details...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Booking Confirmed</h1>
            <p><strong>User:</strong> {data.user}</p>
            <p><strong>From:</strong> {data.from}</p>
            <p><strong>To:</strong> {data.to}</p>
            <p><strong>Weight:</strong> {data.weight}</p>
            <p><strong>Selected Vehicle:</strong> {data.selectedVehicle}</p>
        </div>
    );
};

export default BookingConfirmPage;
