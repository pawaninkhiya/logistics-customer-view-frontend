import { FaMapMarkerAlt, FaTruck, FaBox, FaCalendarAlt } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';

export const PageSkeleton = () => (
    <div className="w-full mx-auto pt-5 animate-pulse">
        <div className="h-8 w-1/4 bg-gray-200 rounded mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-1 bg-white rounded-lg overflow-hidden">
                <RouteOverviewSkeleton />
                <MapSkeleton />
            </div>

            {/* Right Column Skeleton */}
            <BookingSummarySkeleton />
        </div>
    </div>
);

export const RouteOverviewSkeleton = () => (
    <div className="p-4 shadow rounded md border border-gray-200 mb-2">
        <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-gray-300" />
            <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
        </div>
        <div className="p-4">
            <div className="grid 2xl:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i}>
                        <div className="h-3 w-1/3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-5 w-full bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const MapSkeleton = () => (
    <div className="h-96 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-300">Loading map...</div>
    </div>
);

export const BookingSummarySkeleton = () => {
    const DetailItemSkeleton = ({ icon: Icon }: { icon: any }) => (
        <div className="flex items-start gap-3">
            <div className="bg-gray-200 p-2 rounded-full text-gray-400">
                <Icon />
            </div>
            <div className="flex-1">
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="rounded-lg shadow bg-gray-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
            </div>

            <div className="p-4 space-y-4 text-sm">
                <DetailItemSkeleton icon={FaTruck} />
                <DetailItemSkeleton icon={FaBox} />
                <DetailItemSkeleton icon={GiWeight} />
                <DetailItemSkeleton icon={FaCalendarAlt} />

                {/* Price Breakdown Skeleton */}
                <div className="pt-4 border-t">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex justify-between mb-2">
                            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                            <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Button Skeleton */}
                <div className="w-full py-3 px-4 rounded-lg bg-gray-200 text-transparent">
                    Confirm Booking
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

