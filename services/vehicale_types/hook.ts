import { useQuery } from "@tanstack/react-query";
import { getTripVehicleTypes, getVehicleTypeById } from "./vehicaleTypes";
export const useTripVehicleTypesQuery = (weight?: number) => {
    return useQuery({
        queryKey: ["tripVehicleTypes", weight],
        queryFn: () => getTripVehicleTypes({ weight }),
        enabled: weight !== undefined,
        staleTime: 0,
    });
};

/* ------------------ GET BY ID: Vehicle Type ------------------ */
export const useVehicleTypeByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ["vehicleType", id],
        queryFn: () => getVehicleTypeById(id),
        enabled: !!id,
        staleTime: 0,   
    });
};

