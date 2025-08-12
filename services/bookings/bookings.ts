import { TripPayload, TripResponse } from "@/types/tripTypes";
import { TRIP_ENDPOINTS } from "../endpoints";
import { api } from "../apiClient";

export const createTrip = async (payload: TripPayload) => {
    const response = await api.post(TRIP_ENDPOINTS.CREATE, payload);
    return response.data;
}

export const getAllTrips = async (params: { user?: string }): Promise<TripResponse> => {
    const response = await api.get(TRIP_ENDPOINTS.GET_ALL, { params });
    return response.data;
};
