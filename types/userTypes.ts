
export interface Customer {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    name: string;
    postal_code: string;
    contact_no: string;
    profile: string;
    gmail_auth: boolean;
    apple_auth: boolean;
    facebook_auth: boolean;
    type: string,
    status: string
    vehicle_detail: any[];
    fcm_token: string;
    terms_conditions: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    verification_code: string | null;
    verification_code_expires_at: string;
}
export interface OtpVerifiedResponse {
    status: string;
    message: string;
    data: Customer;
    user_type: 'customer' | 'admin' | string;
    // access_token: string;
    // refresh_token: string;
}


export interface LoginOtpResponse {
    status: string
    message: string;
    data: {
        username: string;
        contact_no: string;
        user_type: 'customer' | 'admin' | string;
    };
    verification_code: number;
}

export interface UserResponse {
    status: string
    message: string;
    data: Customer
}
