// components/BookingDetails.tsx
"use client";

import { Trip } from "@/types/tripTypes";
import { FiMapPin, FiCalendar, FiTruck, FiClock } from "react-icons/fi";
import { DetailItem } from "./DetailItem";

interface BookingDetailsProps {
  trip: Trip;
}

export const BookingDetails = ({ trip }: BookingDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
      <DetailItem
        icon={<FiMapPin className="text-lg" />}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        title="Route"
        value={`${trip.from.split(",")[0]} → ${trip.to.split(",")[0]}`}
        subValue={`${trip.distance} km`}
      />
      
      <DetailItem
        icon={<FiCalendar className="text-lg" />}
        iconBg="bg-green-50"
        iconColor="text-green-600"
        title="Pickup Time"
        value={new Date(trip.eta_pickup).toLocaleDateString()}
        subValue={new Date(trip.eta_pickup).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
      
      <DetailItem
        icon={<FiTruck className="text-lg" />}
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
        title="Cargo Details"
        value={`${trip.weight} ${trip.material_unit} • ${trip.material.type}`}
      />
      
      <DetailItem
        icon={<FiClock className="text-lg" />}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
        title="Created"
        value={new Date(trip.createdAt).toLocaleDateString()}
      />
    </div>
  );
};