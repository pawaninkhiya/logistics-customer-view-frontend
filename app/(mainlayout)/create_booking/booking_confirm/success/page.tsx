import { FaCheckCircle, FaHome, FaTruck } from 'react-icons/fa';
import Link from 'next/link';


export default function BookingSuccessPage() {
    return (
        <div className="h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full min-h-[600px] mt-5 rounded-md">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
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
                        <Link
                            href="/"
                            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            <FaHome className="mr-2" />
                            Go to Home
                        </Link>
                        <Link
                            href="/bookings"
                            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FaTruck className="mr-2" />
                            View Trips
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}