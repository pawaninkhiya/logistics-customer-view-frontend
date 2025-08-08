import { api } from "@/services/apiClient";
import { CUSTOMER_ENDPOINTS } from "@/services/endpoints";
import { LoginResponse } from "@/types/userTypes";
// import { CustomerResponse } from "@/types/customersTypes";

export const login = async (credentials: { contact_no: string }): Promise<any> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.LOGIN, credentials);
    return response.data;
};

export const verifyOTP = async (data: { contact_no: number, verification_code: number }): Promise<LoginResponse> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.VERIFY_OTP, { fcm_token: "sjakhask", ...data });
    return response.data;
};


// -----------get profile by id----------------
export const getProfile = async (id: string): Promise<LoginResponse> => {
    const response = await api.get(CUSTOMER_ENDPOINTS.GET_BY_ID(id));
    return response.data;
};
