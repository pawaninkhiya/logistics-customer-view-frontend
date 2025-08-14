"use client";

import React from "react";

export const BookingSkeletonLoader = () => {
    return (
        <div className="w-full mx-auto pt-5 animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>

            {/* Grid Skeleton - mimics the actual layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-md overflow-hidden shadow">
                        {/* Card Content Skeleton */}
                        <div className="p-5">
                            <div className="flex justify-between mb-4">
                                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                            </div>

                            {/* Details Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="flex items-center gap-3 col-span-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Skeleton */}
                        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};