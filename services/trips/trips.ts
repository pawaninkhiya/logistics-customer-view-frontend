import { TripPayload } from "@/types/tripTypes";
import { TRIP_ENDPOINTS } from "../endpoints";
import { api } from "../apiClient";

export const createTrip = async (payload: TripPayload) => {
    const response = await api.post(TRIP_ENDPOINTS.CREATE, payload);
    return response.data;
}
