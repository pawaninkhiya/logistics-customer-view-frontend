import { formatStatus } from "@/utils/statusUtils";
import { TripDetails } from "./TripDetails";
import { TripFooter } from "./TripFooter";

interface TripCardProps {
    trip: any; // Replace 'any' with your actual trip type
}

export const TripCard = ({ trip }: TripCardProps) => {
    const { bg, text, label } = formatStatus(trip.status);
    const hasAcceptedDriver = trip.driver_responses.filter(
        (r: any) => r.response === "accepted"
    ).length > 0;

    return (
        <div className="border border-gray-200 h-full rounded-md overflow-hidden shadow transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
                                {label}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                            ₹{trip.trip_cost_customer}
                        </p>
                    </div>
                </div>

                <TripDetails trip={trip} />
            </div>

            <TripFooter hasAcceptedDriver={hasAcceptedDriver} />
        </div>
    );
};