'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useVehicleTypeByIdQuery } from '@/services/vehicale_types/hook';
import { useAuth } from '@/contexts/AuthProvider';
import { useCreateTripMutation } from '@/services/bookings/hooks';
import { TripPayload } from '@/types/tripTypes';
import RouteOverview from '@/components/create_booking/booking_confirm/RouteOverview';
import BookingMap from '@/components/create_booking/booking_confirm/BookingMap';
import BookingSummary from '@/components/create_booking/booking_confirm/BookingSummary';
import { PageSkeleton } from '@/components/create_booking/booking_confirm/Skeletons';
import { useMaterialByIdQuery } from '@/services/materials/hooks';

interface VehicleType {
    _id: string;
    name: string;
    wheeler: number;
    capacity: number;
    unit: string;
    customer_base_fare: number;
    customer_km_fare: number;
}

export default function BookingConfirmPage() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [data, setData] = useState<TripPayload | null>(null);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
    const [distanceFare, setDistanceFare] = useState<number>(0);

    const { data: VehicaleTypeData } = useVehicleTypeByIdQuery(data?.vehicle_type ?? '');
    const { data: materialData } = useMaterialByIdQuery(data?.material ?? '');
    const typeData: VehicleType | undefined = VehicaleTypeData?.data;
    const { mutateAsync, isPending: isBooking } = useCreateTripMutation();

    useEffect(() => {
        const raw = searchParams.get('data');
        if (raw) {
            try {
                const parsedData: TripPayload = JSON.parse(decodeURIComponent(raw));
                setData(parsedData);
            } catch (e) {
                console.error('Error parsing data', e);
                toast.error('Failed to load booking data');
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (data?.distance && typeData) {
            const kmFare = data.distance * typeData.customer_km_fare;
            setDistanceFare(Math.round(kmFare));
            const total = typeData.customer_base_fare + kmFare;
            setEstimatedPrice(Math.round(total));
        }
    }, [data?.distance, typeData]);

    const handleConfirmBooking = async () => {
        if (!data || !user?._id) return;
        try {
            const payload: TripPayload = {
                ...data,
                user: user._id,
                distance: parseFloat(distance),
                customer_freight: estimatedPrice,
            };
            const res = await mutateAsync(payload);
            toast.success('Booking confirmed successfully!');
            router.push(`/create_booking/booking_confirm/success?id=${res.data._id}`);
        } catch (error: any) {
            console.error('Error creating trip:', error);
            toast.error(error?.response?.data?.message || 'Failed to create booking');
        }
    };



    if (!data) {
        return <PageSkeleton />;
    }

    return (
        <div className="w-full mx-auto pt-5">
            <h1 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800">
                Confirm Your Booking
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-1 bg-white rounded-lg overflow-hidden">
                    <RouteOverview
                        from={data.from}
                        to={data.to}
                        distance={distance}
                        duration={duration}
                    />
                    <BookingMap
                        from_latitude={data.from_latitude}
                        from_longitude={data.from_longitude}
                        to_latitude={data.to_latitude}
                        to_longitude={data.to_longitude}
                        onRouteCalculated={(dist, dur) => {
                            setDistance(dist);
                            setDuration(dur);
                            if (typeData) {
                                const km = parseFloat(dist);
                                const kmFare = km * typeData.customer_km_fare;
                                setDistanceFare(Math.round(kmFare));
                                const total = typeData.customer_base_fare + kmFare;
                                setEstimatedPrice(Math.round(total));
                            }
                        }}
                    />
                </div>
                <BookingSummary
                    vehicleType={typeData?.name || data.vehicle_type}
                    material={materialData?.data?.name ?? ""}
                    weight={data.weight}
                    materialUnit={data.material_unit}
                    etaPickup={data.eta_pickup}
                    baseFare={typeData?.customer_base_fare ?? 0}
                    distanceFare={distanceFare}
                    estimatedPrice={estimatedPrice}
                    isBooking={isBooking}
                    onConfirmBooking={handleConfirmBooking}
                />
            </div>
        </div>
    );
}