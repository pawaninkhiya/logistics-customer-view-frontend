import { api } from "@/services/apiClient";
import { CUSTOMER_ENDPOINTS } from "@/services/endpoints";
import { LoginOtpResponse, OtpVerifiedResponse, UserResponse } from "@/types/userTypes";

export const login = async (credentials: { contact_no: string }): Promise<LoginOtpResponse> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.REQUEST_OTP, credentials);
    return response.data;
};

export const verifyOTP = async (data: { contact_no: number, verification_code: number }): Promise<OtpVerifiedResponse> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.VERIFY_OTP, data);
    return response.data;
};

export const getProfile = async (): Promise<UserResponse> => {
    const response = await api.get(CUSTOMER_ENDPOINTS.GET_USER);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await api.get(CUSTOMER_ENDPOINTS.LOGOUT);
};
// // ------------------ POST: Update Customer or Driver ------------------
export const updateCustomer = async (_id: string, payload: FormData): Promise<void> => {
    await api.put(CUSTOMER_ENDPOINTS.UPDATE_CUSTOMER(_id), payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
