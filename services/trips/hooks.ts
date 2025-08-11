
import { TripPayload } from "@/types/tripTypes";
import { useMutation } from "@tanstack/react-query";
import { createTrip } from "./trips";
// -------------------- Create Trip Mutation --------------------
export const useCreateTripMutation = () => {

    return useMutation({
        mutationKey: ["createTrip"],
        mutationFn: (payload: TripPayload) => createTrip(payload),
    });
};
