import React from 'react';
import Image from 'next/image';
import noImage from "@assets/no-vehicale.png";
import { FaBox } from 'react-icons/fa';

export type VehicleType = {
    _id: string;
    name: string;
    capacity: number;
    unit: string;
    wheeler: number;
    vehicle_image?: string;
};

type Props = {
    vehicle: VehicleType;
    onSelect: (id: string) => void;
};

const VehicleCard: React.FC<Props> = ({ vehicle, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(vehicle._id)}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer group w-full bg-white"
        >
            <div className="relative w-20 h-14 sm:w-24 sm:h-16 flex-shrink-0">
                <Image
                    src={vehicle.vehicle_image || noImage}
                    alt={vehicle.name}
                    fill
                    className="rounded object-cover bg-gray-100"
                    unoptimized
                    onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = noImage.src;
                    }}
                />
            </div>
            <div className="flex flex-col flex-grow min-w-0">
                <span className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                    {vehicle.name}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 sm:gap-2">
                    <FaBox className="text-gray-400 flex-shrink-0" />
                    {vehicle.capacity ?? '-'} {vehicle.unit ?? ''} • {vehicle.wheeler} Wheeler
                </span>
            </div>
        </div>
    );
};

export default VehicleCard;
