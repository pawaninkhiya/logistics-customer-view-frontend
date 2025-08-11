interface VehicleType {
    _id: string;
    name: string;
    wheeler: number;
    capacity: number;
    unit: string;
    customer_base_fare: number;
    customer_km_fare: number;
    customer_base_fare_margin: number;
    customer_km_fare_margin: number;
    driver_base_fare: number;
    driver_km_fare: number;
    driver_base_fare_margin: number;
    driver_km_fare_margin: number;
    vehicle_image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface VehicleTypesResponse {
    status: string;
    message: string;
    data: VehicleType[];
    totalVehicleTypes: number;
    currentPage: number;
    totalPages: number;
}