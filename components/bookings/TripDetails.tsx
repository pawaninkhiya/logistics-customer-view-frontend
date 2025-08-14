import { Icons } from "@/assets/assets";

interface TripDetailsProps {
    trip: any;
}

export const TripDetails = ({ trip }: TripDetailsProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-4 text-sm">
        <div className="flex items-start gap-3 col-span-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Icons.Map className="text-sm" />
            </div>
            <div>
                <p className="text-gray-800">
                    {trip.from} → {trip.to} ({trip.distance} km)
                </p>
            </div>
        </div>

        <div className="flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <Icons.Calendar className="text-sm" />
            </div>
            <div>
                <p className="text-gray-800">
                    <span>Pickup Time</span> {new Date(trip.eta_pickup).toLocaleDateString()}{new Date(trip.eta_pickup).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Icons.Truck className="text-sm" />
            </div>
            <div>
                <p className="text-gray-800">
                    {trip.weight} {trip.material_unit} • {trip.material.name}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Icons.Clock className="text-sm" />
            </div>
            <div>
                <p className="text-gray-800">
                    <span>Created</span> {new Date(trip.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    </div>
);