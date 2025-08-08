export interface LoginResponse {
  status: string;
  message: string;
  data: UserData;
  user_type: 'customer' | 'admin' | string;
  access_token: string;
  refresh_token: string;
}

export interface UserData {
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
  verification_code: number;
  type: 'customer' | 'admin' | string;
  status: 'active' | 'inactive' | string;
  vehicle_detail: any[]; // You can replace `any` with a more specific type if available
  availability: any;     // Replace with a proper type if known (e.g., boolean | null)
  fcm_token: string;
  total_credits: number;
  terms_conditions: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
