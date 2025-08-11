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
