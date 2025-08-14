'use client';

import { useTripVehicleTypesQuery } from '@/services/vehicale_types/hook';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaTruck, FaInfoCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import VehicleCard, { VehicleType } from '@/components/vehicle/VehicleCard';
import VehicleSkeleton from '@/components/vehicle/VehicleSkeleton';
import VehicleError from '@/components/vehicle/VehicleError';
import  gifLoader from "@assets/truck_loader.gif"
const SelectVehicaleType = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [tripData, setTripData] = useState<any | null>(null);

    useEffect(() => {
        try {
            const dataParam = searchParams.get('data');
            if (dataParam) {
                const decodedData = decodeURIComponent(dataParam);
                const parsedData = JSON.parse(decodedData);
                setTripData(parsedData);
            }
        } catch (err) {
            console.error('Error parsing trip data:', err);
        }
    }, [searchParams]);

    const weight = tripData?.weight;
    const { data, isLoading, error } = useTripVehicleTypesQuery(weight);

    const handleSelectVehicle = (vehicleId: string) => {
        if (!tripData) return;

        const updatedData = {
            ...tripData,
            vehicle_type: vehicleId
        };

        if (!updatedData.vehicle_type) {
            toast.error("Vehicle is Required");
            return;
        }

        router.push(
            `/create_booking/booking_confirm?data=${encodeURIComponent(
                JSON.stringify(updatedData)
            )}`
        );
    };

    return (
        <div className="flex flex-col mt-4 gap-6 p-4 xl:p-6 w-full 2xl:shadow 2xl:border 2xl:border-gray-100 rounded-tl-3xl sm:rounded-md bg-gray-50">
            {/* Header */}
            <div className="flex items-center gap-3 flex-wrap">
                <FaTruck className="text-lg sm:text-xl text-blue-600" />
                <h1 className="font-semibold text-gray-800">Select Vehicle</h1>
                <FaInfoCircle className="text-gray-500 ml-auto" />
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {[...Array(8)].map((_, i) => (
                        <VehicleSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <VehicleError message="Failed to load vehicle types. Please try again." />
            )}

            {/* List */}
            {!isLoading && !error && (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {data?.data?.map((vehicle: VehicleType) => (
                        <VehicleCard
                            key={vehicle._id}
                            vehicle={vehicle}
                            onSelect={handleSelectVehicle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectVehicaleType;
