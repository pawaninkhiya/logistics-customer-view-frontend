// components/TripFooter.tsx
"use client";

import { Trip } from "@/types/tripTypes";

interface TripFooterProps {
    trip: Trip;
}

export const TripFooter = ({ trip }: TripFooterProps) => {
    return (
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                {trip.driver_responses.filter((r) => r.response === "accepted").length > 0 ? (
                    <>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span>Driver assigned</span>
                    </>
                ) : (
                    <>
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>Searching for driver</span>
                    </>
                )}
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View Details
            </button>
        </div>
    );
};