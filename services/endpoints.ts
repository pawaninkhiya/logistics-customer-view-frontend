
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// ------------------ Customers Endpoints ------------------
export const CUSTOMER_ENDPOINTS = {
    LOGIN: '/apps/login',
    VERIFY_OTP: '/apps/login',
    UPDATE: '/customer/',
    GET_BY_ID: (id: string) => `/users/${id}`,
    UPDATE_CUSTOMER: (id: string) => `/users/${id}`,
};

// ------------------ MaterialTypes Endpoints ------------------
export const MATERIAL_TYPES = {
    GET_ALL: "/material_box",
    GET_BY_ID: (id: string) => `/admins/${id}`,
};


// ------------------ VEHICLE_TYPE Endpoints ------------------
export const VEHICLE_TYPE_ENDPOINTS = {
    GET_TRIP_VEHICLE_TYPES: "/vehicle_type/",
    GET_BY_ID: (id: string) => `/vehicle_type/${id}`,
};


// ------------------ Trips Endpoints ------------------

export const TRIP_ENDPOINTS = {
    // RETRY_TRIP_BY_ID: (id: string) => `/apps/trip/retry/${id}`,
    CREATE: "/apps/trip/",
    GET_ALL: "/apps/trip/",
};
