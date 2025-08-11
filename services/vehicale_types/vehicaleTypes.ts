import { api } from "../apiClient";
import { VEHICLE_TYPE_ENDPOINTS } from "../endpoints";


// ------------------ GET: Trip Vehicle Types ------------------
export const getTripVehicleTypes = async ({ weight }: { weight?: number }): Promise<VehicleTypesResponse> => {
    const response = await api.get(VEHICLE_TYPE_ENDPOINTS.GET_TRIP_VEHICLE_TYPES, {
        params: { weight },
    });
    return response.data;
};

// ------------------ GET BY ID: Vehicle Type ------------------
export const getVehicleTypeById = async (id: string): Promise<any> => {
    const response = await api.get(VEHICLE_TYPE_ENDPOINTS.GET_BY_ID(id));
    return response.data;
};
