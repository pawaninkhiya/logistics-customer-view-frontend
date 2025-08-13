"use client";
import { FaCheckCircle, FaHome, FaTruck } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';


export default function BookingSuccessPage() {
    const router = useRouter();
    return (
        <div className="h-full flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 w-full min-h-[600px] mt-5 rounded-md">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow border  border-gray-100 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <FaCheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                    Booking Confirmed!
                </h2>
                <div className="mt-4">
                    <p className="text-sm text-gray-600">
                        Your trip has been successfully booked.
                    </p>
                    <div className="mt-6 flex items-center sm:flex-row flex-col justify-center gap-4">
                        <Button
                            onClick={() => router.push('/')}
                        >
                            <FaHome className="mr-2" />
                            Go to Home
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => router.push('/trips')}
                        >
                            <FaHome className="mr-2" />
                            View Trips
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}