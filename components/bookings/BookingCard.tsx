// components/TripCard.tsx
"use client";

import { Trip } from "@/types/tripTypes";
import { formatStatus } from "@/utils/statusUtils";
import { BookingDetails } from "./BookingDetails";
import { TripFooter } from "./BookingFooter";


interface TripCardProps {
    trip: Trip;
}

export const TripCard = ({ trip }: TripCardProps) => {
    const { bg, text, label } = formatStatus(trip.status);

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
                                {label}
                            </span>
                        </div>
                        <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                            {trip.material.name} Shipment
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{trip.trip_cost_customer}</p>
                        <p className="text-sm text-gray-500">Total cost</p>
                    </div>
                </div>

                <BookingDetails trip={trip} />
            </div>

            <TripFooter trip={trip} />
        </div>
    );
};