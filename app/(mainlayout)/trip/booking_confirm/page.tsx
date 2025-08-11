'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    FaMapMarkerAlt,
    FaTruck,
    FaBox,
    FaCalendarAlt,
    FaCheckCircle
} from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import { ImSpinner8 } from 'react-icons/im';
import toast from 'react-hot-toast';
import BookingMap from '@/components/trips/BookingMap';
import { useVehicleTypeByIdQuery } from '@/services/vehicale_types/hook';
import { useAuth } from '@/contexts/AuthProvider';
import { useCreateTripMutation } from '@/services/trips/hooks';
import { useRouter } from 'next/navigation';
import { TripPayload } from '@/types/tripTypes';


interface VehicleType {
    _id: string;
    name: string;
    wheeler: number;
    capacity: number;
    unit: string;
    customer_base_fare: number;
    customer_km_fare: number;
}

const BookingConfirmPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    const searchParams = useSearchParams();
    const [data, setData] = useState<TripPayload | null>(null);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [isBooking, setIsBooking] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
    const [distanceFare, setDistanceFare] = useState<number>(0);

    const { data: VehicaleTypeData } = useVehicleTypeByIdQuery(data?.vehicle_type ?? '');
    const typeData: VehicleType | undefined = VehicaleTypeData?.data;
    const { mutateAsync, isPending } = useCreateTripMutation()
    useEffect(() => {
        const raw = searchParams.get('data');
        if (raw) {
            try {
                const parsedData: TripPayload = JSON.parse(decodeURIComponent(raw));
                setData(parsedData);
            } catch (e) {
                console.error('Error parsing data', e);
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

        setIsBooking(true);

        try {
            const payload: TripPayload = {
                ...data,
                user: user._id,
                distance: parseFloat(distance),
                customer_freight: estimatedPrice
            };

            const res = await mutateAsync(payload);
            toast.success("Booking confirmed successfully!");

            // Navigate to success page with trip ID
            router.push(`/trip/booking_confirm/success?id=${res.data._id}`);


        } catch (error: any) {
            console.error("Error creating trip:", error);
            toast.error(error?.response?.data?.message || "Failed to create booking");
        } finally {
            setIsBooking(false);
        }
    };


    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="w-full mx-auto md:p-6">
            <h1 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800">
                Confirm Your Booking
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Map Section */}
                <div className="lg:col-span-1 bg-white rounded-lg overflow-hidden">
                    <div className="p-4 shadow rounded md border border-gray-200 mb-2">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            Route Overview
                        </h2>
                        <div className="p-4">
                            <div className="grid 2xl:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">From</h3>
                                    <p className="font-medium">{data.from}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">To</h3>
                                    <p className="font-medium">{data.to}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Distance</h3>
                                    <p className="font-medium">{distance || 'Calculating...'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Estimated Time</h3>
                                    <p className="font-medium">{duration || 'Calculating...'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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

                {/* Booking Summary Section */}
                <div className="rounded-lg shadow bg-gray-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold">Booking Summary</h2>
                    </div>

                    <div className="p-4 space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <FaTruck className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Vehicle Type</h3>
                                <p className="text-gray-600">{typeData?.name || data.vehicle_type}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <FaBox className="text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Material</h3>
                                <p className="text-gray-600">{data.material}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-yellow-100 p-2 rounded-full">
                                <GiWeight className="text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Weight</h3>
                                <p className="text-gray-600">
                                    {data.weight} {data.material_unit}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <FaCalendarAlt className="text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Pickup Time</h3>
                                <p className="text-gray-600">
                                    {new Date(data.eta_pickup).toLocaleString('en-IN', {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Base Fare</span>
                                <span className="font-medium">₹{typeData?.customer_base_fare ?? 0}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Distance Fare</span>
                                <span className="font-medium">₹{distanceFare}</span>
                            </div>

                            <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                <span>Total Amount</span>
                                <span>₹{estimatedPrice}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmBooking}
                            disabled={isBooking}
                            className={`w-full py-3 px-4 rounded-lg font-medium cursor-pointer text-white flex items-center justify-center gap-2 ${isBooking ? 'bg-black' : 'bg-black hover:bg-black/80'
                                }`}
                        >
                            {isBooking ? (
                                <>
                                    <ImSpinner8 className="animate-spin" />
                                    Confirming...
                                </>
                            ) : (
                                <>
                                    <MdPayment />
                                    Confirm Booking
                                </>
                            )}
                        </button>

                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <FaCheckCircle />
                            <span>Free cancellation up to 1 hour before pickup</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmPage;
