
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const CUSTOMER_ENDPOINTS = {
    LOGIN: '/apps/login',
    VERIFY_OTP: '/apps/login', 
    UPDATE: '/customer/', 
    GET_BY_ID: (id: string) => `/users/${id}`,
};


export const MATERIAL_TYPES = {
    GET_ALL: "/material_box",
};