"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { useGetAllTripsQuery } from "@/services/bookings/hooks";
import React from "react";
import { PageHeader } from "@/components/bookings/PageHeader";
import { EmptyState } from "@/components/bookings/EmptyState ";
import { TripCard } from "@/components/bookings/TripCard";
import { BookingSkeletonLoader } from "@/components/bookings/BookingSkeletonLoader";

const Bookings = () => {
    const { user } = useAuth();
    const { data, isLoading } = useGetAllTripsQuery({ user: user?._id ?? "" });

    if (isLoading) return <BookingSkeletonLoader  />;

    return (
        <div className="w-full mx-auto pt-5">
            <PageHeader />
            {data?.data?.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {data?.data?.map((trip) => (
                        <TripCard key={trip._id} trip={trip} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;