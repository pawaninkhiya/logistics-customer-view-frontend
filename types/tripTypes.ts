export interface TripPayload {
    user: string;
    distance: number;
    from: string;
    to: string;
    material: string;
    material_unit: string;
    weight: number;
    eta_pickup: string;
    assisstant?: number;
    vehicle_type: string;
    from_latitude: number;
    from_longitude: number;
    to_latitude: number;
    to_longitude: number;
    customer_freight?: number;
}
export interface TripResponse {
    status: string;
    message: string;
    data: Trip[];
    total: number;
    page: number;
    pages: number;
    limit: number;
}

export interface Trip {
    _id: string;
    user: User;
    distance: number;
    trip_cost_customer: number;
    trip_cost_driver: number;
    from: string;
    to: string;
    material: Material;
    material_unit: string;
    weight: number;
    material_width: number;
    material_height: number;
    eta_pickup: string;
    alternate_contact_no: string;
    assisstant: number;
    status: string;
    is_payment_done: boolean;
    vehicle_type: string;
    total_toll_tax_amount: number;
    total_tolls: any[]; // You might want to create a specific interface for tolls if needed
    customer_freight: number;
    driver_freight: number;
    fare_used: Fare;
    app_charges: number;
    from_latitude: number;
    from_longitude: number;
    to_latitude: number;
    to_longitude: number;
    payment: any[]; // You might want to create a specific interface for payments if needed
    potential_drivers?: string[]; // Note: There's a typo in the JSON ("potential_drivers" vs "potential_drivers")
    driver_responses: DriverResponse[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    vehicle_details?: VehicleDetails;
    assigned_at?: string;
    driver?: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    name: string;
    contact_no: string;
}

interface Material {
    _id: string;
    name: string;
    type: string;
    weight: string;
}

interface Fare {
    customer_base_fare: number;
    customer_km_fare: number;
    driver_base_fare: number;
    driver_km_fare: number;
}

interface DriverResponse {
    driver: string;
    response: string;
    responded_at: string | null;
}

interface VehicleDetails {
    _id: string;
    vehicle_type: VehicleType;
    vehicle_no: string;
}

interface VehicleType {
    _id: string;
    name: string;
    wheeler: number;
    capacity: number;
}