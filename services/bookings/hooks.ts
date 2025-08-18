
import { TripPayload } from "@/types/tripTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTrip, getAllTrips } from "./bookings";
// -------------------- Create Trip Mutation --------------------
export const useCreateTripMutation = () => {

    return useMutation({
        mutationKey: ["createTrip"],
        mutationFn: (payload: TripPayload) => createTrip(payload),
    });
};

// -------------------- Get All Query --------------------
export const useGetAllTripsQuery = (params: { user?: string}) => {
    return useQuery({
        queryKey: ["Trips", params],
        queryFn: () => getAllTrips(params),
        enabled: Boolean(params.user),
    });
};