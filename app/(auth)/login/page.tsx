'use client';

import { useState, useCallback, FormEvent } from "react";
import Image from "next/image";
import AuthButton from "@/components/ui/AuthButton";
import AuthInput from "@/components/ui/AuthInput";
import logo from "@assets/logo.svg";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider";
import toast from "react-hot-toast";
import PublicRoute from "@/components/PublicRoute";

type FormState = {
    mobileNumber: string;
    otp: string;
    showOtpField: boolean;
    loading: boolean;
};

const Login = () => {
    const { loginMutation, verifyOTPMutation } = useAuth();

    const [state, setState] = useState<FormState>({
        mobileNumber: "",
        otp: "",
        showOtpField: false,
        loading: false,
    });

    const handleStateUpdate = useCallback((newState: Partial<FormState>) => {
        setState((prev) => ({ ...prev, ...newState }));
    }, []);

    const validateMobileNumber = useCallback((number: string): boolean => {
        if (!number) {
            toast.error("Please enter your mobile number");
            return false;
        }
        if (!/^\d{10}$/.test(number)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return false;
        }
        return true;
    }, []);

    const validateOtp = useCallback((otp: string): boolean => {
        if (!otp) {
            toast.error("Please enter the OTP");
            return false;
        }
        if (!/^\d{6}$/.test(otp)) {
            toast.error("OTP must be 6 digits");
            return false;
        }
        return true;
    }, []);

    const handleSendOtp = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            handleStateUpdate({ loading: true });

            if (!validateMobileNumber(state.mobileNumber)) {
                handleStateUpdate({ loading: false });
                return;
            }

            try {
                await loginMutation.mutateAsync(state.mobileNumber, {
                    onSuccess: () => {
                        handleStateUpdate({ showOtpField: true });
                    },
                    onError: (err: any) => {
                        toast.error(err?.response?.data?.message || err.message || "Failed to send OTP");
                    }
                });
            } catch (_) {
                // error already handled
            } finally {
                handleStateUpdate({ loading: false });
            }
        },
        [state.mobileNumber, handleStateUpdate, validateMobileNumber, loginMutation]
    );

    const handleLoginSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            handleStateUpdate({ loading: true });

            if (!validateOtp(state.otp)) {
                handleStateUpdate({ loading: false });
                return;
            }

            try {
                await verifyOTPMutation.mutateAsync({
                    contact_no: Number(state.mobileNumber),
                    verification_code: Number(state.otp),
                }, {
                    onSuccess: (data: any) => {
                        const token = data?.token;
                        if (token) {
                            localStorage.setItem("token", token);
                            // ✅ Optionally toast success
                            // toast.success("Login successful!");
                            // TODO: Redirect user after login
                        } else {
                            toast.error("Login succeeded, but token was missing.");
                        }
                    },
                    onError: (err: any) => {
                        toast.error(err?.response?.data?.message || err.message || "Login failed. Please try again.");
                    }
                });
            } catch (_) {
                // error already handled
            } finally {
                handleStateUpdate({ loading: false });
            }
        },
        [state.otp, state.mobileNumber, handleStateUpdate, validateOtp, verifyOTPMutation]
    );

    const handleChangeNumber = useCallback(() => {
        handleStateUpdate({ showOtpField: false, otp: "" });
    }, [handleStateUpdate]);

    return (
        <PublicRoute>
            <div className="min-h-screen flex items-center justify-center md:bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white rounded-xl md:shadow-sm p-4 md:p-8 space-y-8">
                    <div className="text-center">
                        <div className="mx-auto h-16 w-16 flex items-center justify-center">
                            <Image src={logo} alt="logo" width={64} height={64} priority />
                        </div>
                        <h2 className="mt-6 text-lg sm:text-2xl font-bold text-gray-900">
                            {state.showOtpField ? "Verify OTP" : "Login Here"}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-gray-600">
                            {state.showOtpField
                                ? `We've sent a 6-digit code to +91 ${state.mobileNumber}`
                                : "Enter your mobile number to receive OTP"}
                        </p>
                    </div>

                    <form className="mt-4 space-y-6" onSubmit={state.showOtpField ? handleLoginSubmit : handleSendOtp}>
                        <div className="space-y-4">
                            {!state.showOtpField && (
                                <AuthInput
                                    id="mobileNumber"
                                    label="Mobile Number"
                                    type="tel"
                                    value={state.mobileNumber}
                                    onChange={(e) => handleStateUpdate({ mobileNumber: e.target.value })}
                                    placeholder="Enter 10-digit mobile number"
                                    showError={false}
                                    error=""
                                    maxLength={10}
                                />
                            )}

                            {state.showOtpField && (
                                <AuthInput
                                    id="otp"
                                    label="OTP"
                                    type="text"
                                    value={state.otp}
                                    onChange={(e) => handleStateUpdate({ otp: e.target.value })}
                                    placeholder="Enter 6-digit code"
                                    showError={false}
                                    error=""
                                    maxLength={6}
                                    autoFocus
                                />
                            )}

                            {state.showOtpField && (
                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={handleChangeNumber}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        disabled={state.loading}
                                    >
                                        Change Number
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        disabled={state.loading}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <AuthButton
                                loading={state.loading}
                                text={state.showOtpField ? "Verify & Login" : "Send OTP"}
                                loadingText={state.showOtpField ? "Verifying..." : "Sending..."}
                            />
                        </div>
                    </form>

                    <div className="text-center text-xs sm:text-sm">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link href="/registration" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </PublicRoute>
    );
};

export default Login;
