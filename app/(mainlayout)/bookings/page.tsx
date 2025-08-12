"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { useGetAllTripsQuery } from "@/services/bookings/hooks";
import React from "react";
import { FiTruck, FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import { formatStatus } from "@/utils/statusUtils"; 

const Bookings = () => {
    const { user } = useAuth();
    const { data, isLoading } = useGetAllTripsQuery({ user: user?._id ?? "" });

    if (isLoading)
        return (
            <div className="p-6 flex justify-center">
                <div className="animate-pulse text-lg">Loading your trips...</div>
            </div>
        );

    return (
        <div className="w-full mx-auto md:p-6">
            <header className="mb-8">
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                    Your Bookings
                </h1>
                <p className="text-gray-500">
                    Manage and track your cargo shipments
                </p>
            </header>

            {data?.data?.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiTruck className="text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">
                        No shipments found
                    </h3>
                    <p className="text-gray-500 mt-1">
                        You haven't created any shipments yet
                    </p>
                </div>
            ) : (
                <div className="space-y-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {data?.data?.map((trip) => {
                        const { bg, text, label } = formatStatus(trip.status);

                        return (
                            <div
                                key={trip._id}
                                className="border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
                                                >
                                                    {label}
                                                </span>
                                            </div>

                                            <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                                                {trip.material.name} Shipment
                                            </h2>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">
                                                ₹{trip.trip_cost_customer}
                                            </p>
                                            <p className="text-sm text-gray-500">Total cost</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                <FiMapPin className="text-lg" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">
                                                    Route
                                                </h4>
                                                <p className="text-gray-800">
                                                    {trip.from.split(",")[0]} → {trip.to.split(",")[0]}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {trip.distance} km
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                                <FiCalendar className="text-lg" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">
                                                    Pickup Time
                                                </h4>
                                                <p className="text-gray-800">
                                                    {new Date(trip.eta_pickup).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(trip.eta_pickup).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                                <FiTruck className="text-lg" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">
                                                    Cargo Details
                                                </h4>
                                                <p className="text-gray-800">
                                                    {trip.weight} {trip.material_unit} •{" "}
                                                    {trip.material.type}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                                <FiClock className="text-lg" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">
                                                    Created
                                                </h4>
                                                <p className="text-gray-800">
                                                    {new Date(trip.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        {trip.driver_responses.filter(
                                            (r) => r.response === "accepted"
                                        ).length > 0 ? (
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
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Bookings;
