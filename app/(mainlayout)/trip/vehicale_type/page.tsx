'use client';

import PrivateRoute from '@/components/PrivateRoute';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SelectVehicaleType = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [tripData, setTripData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(tripData);
    useEffect(() => {
        try {
            const dataParam = searchParams.get('data');
            if (dataParam) {
                const decodedData = decodeURIComponent(dataParam);
                const parsedData = JSON.parse(decodedData);
                setTripData(parsedData);
            }
            setIsLoading(false);
        } catch (err) {
            setError('Failed to load trip details');
            setIsLoading(false);
            console.error('Error parsing trip data:', err);
        }
    }, [searchParams]);

    const handleSelectVehicle = (vehicleType: string) => {
        if (!tripData) return;

        const updatedData = {
            ...tripData,
            selectedVehicle: vehicleType,
        };

        router.push(
            `/trip/booking_confirm?data=${encodeURIComponent(
                JSON.stringify(updatedData)
            )}`
        );
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <PrivateRoute>
            <div className="flex flex-col gap-4 p-6">
                <h1 className="text-xl font-bold">Select Vehicle Type</h1>

                <button
                    onClick={() => handleSelectVehicle('Truck')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Truck
                </button>

                <button
                    onClick={() => handleSelectVehicle('Mini Van')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Mini Van
                </button>

                <button
                    onClick={() => handleSelectVehicle('Tempo')}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                    Tempo
                </button>
            </div>
        </PrivateRoute>
    );
};

export default SelectVehicaleType;

// import React from 'react'

// const SelectVehicale = () => {
//     return (
//         <div className="flex flex-col lg:flex-row gap-6 w-full">
//             {/* Left Column */}
//             <div className="flex-1 bg-white rounded-xl ">

//             </div>

//             {/* Right Column */}
//             <div className="w-full lg:w-1/3 bg-gray-50 rounded-xl shadow p-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                     Invoice Summary
//                 </h3>
//             </div>
//         </div>
//     )
// }

// export default SelectVehicale