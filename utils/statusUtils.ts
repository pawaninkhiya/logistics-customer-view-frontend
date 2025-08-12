export type TripStatus =
    | 'scheduled'
    | 'loading'
    | 'in_transit'
    | 'unloading'
    | 'delivered'
    | 'cancelled'
    | 'failed_delivery'
    | 'delayed'
    | 'returned'
    | 'searching';

export interface StatusConfig {
    bg: string;
    text: string;
    label: string;
}

export const statusColorMap: Record<TripStatus, StatusConfig> = {
    scheduled: { bg: "bg-blue-100", text: "text-blue-800", label: "Scheduled" },
    loading: { bg: "bg-indigo-100", text: "text-indigo-800", label: "Loading" },
    in_transit: { bg: "bg-yellow-100", text: "text-yellow-800", label: "In Transit" },
    unloading: { bg: "bg-purple-100", text: "text-purple-800", label: "Unloading" },
    delivered: { bg: "bg-green-100", text: "text-green-800", label: "Delivered" },
    cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
    failed_delivery: { bg: "bg-orange-100", text: "text-orange-800", label: "Failed Delivery" },
    delayed: { bg: "bg-amber-100", text: "text-amber-800", label: "Delayed" },
    returned: { bg: "bg-pink-100", text: "text-pink-800", label: "Returned" },
    searching: { bg: "bg-gray-100", text: "text-gray-800", label: "Searching" },
};


export const formatStatus = (status: string): StatusConfig => {
    const normalizedStatus = status.toLowerCase() as TripStatus;

    if (statusColorMap[normalizedStatus]) {
        return statusColorMap[normalizedStatus];
    }
    return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    };
};


