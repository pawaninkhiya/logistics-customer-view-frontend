"use client"
import { useState, useCallback, FormEvent } from "react";
import Image from "next/image";
import AuthButton from "@/components/ui/AuthButton";
import AuthInput from "@/components/ui/AuthInput";
import logo from "@assets/logo.svg";
import Link from "next/link";

type FormState = {
    mobileNumber: string;
    otp: string;
    showOtpField: boolean;
    loading: boolean;
    error: string;
};

const Login = () => {
    const [state, setState] = useState<FormState>({
        mobileNumber: "",
        otp: "",
        showOtpField: false,
        loading: false,
        error: "",
    });

    const handleStateUpdate = useCallback((newState: Partial<FormState>) => {
        setState((prev) => ({ ...prev, ...newState }));
    }, []);

    const validateMobileNumber = useCallback((number: string): boolean => {
        if (!number) {
            handleStateUpdate({ error: "Please enter your mobile number" });
            return false;
        }
        if (!/^\d{10}$/.test(number)) {
            handleStateUpdate({ error: "Please enter a valid 10-digit mobile number" });
            return false;
        }
        return true;
    }, [handleStateUpdate]);

    const validateOtp = useCallback((otp: string): boolean => {
        if (!otp) {
            handleStateUpdate({ error: "Please enter the OTP" });
            return false;
        }
        if (!/^\d{6}$/.test(otp)) {
            handleStateUpdate({ error: "OTP must be 6 digits" });
            return false;
        }
        return true;
    }, [handleStateUpdate]);

    const simulateApiCall = useCallback(
        () => new Promise<void>((resolve) => setTimeout(resolve, 1500)),
        []
    );

    const handleSendOtp = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            handleStateUpdate({ loading: true, error: "" });

            if (!validateMobileNumber(state.mobileNumber)) {
                handleStateUpdate({ loading: false });
                return;
            }

            try {
                await simulateApiCall();
                handleStateUpdate({ showOtpField: true, error: "" });
                console.log("OTP sent to:", state.mobileNumber);
            } catch (err) {
                handleStateUpdate({ error: "Failed to send OTP. Please try again." });
            } finally {
                handleStateUpdate({ loading: false });
            }
        },
        [state.mobileNumber, handleStateUpdate, validateMobileNumber, simulateApiCall]
    );

    const handleLoginSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            handleStateUpdate({ loading: true, error: "" });

            if (!validateOtp(state.otp)) {
                handleStateUpdate({ loading: false });
                return;
            }

            try {
                await simulateApiCall();
                console.log("Logging in with mobile:", state.mobileNumber);
                // Handle successful login (redirect, etc.)
            } catch (err) {
                handleStateUpdate({ error: "Login failed. Please try again." });
            } finally {
                handleStateUpdate({ loading: false });
            }
        },
        [state.otp, handleStateUpdate, validateOtp, simulateApiCall]
    );

    const handleChangeNumber = useCallback(() => {
        handleStateUpdate({ showOtpField: false, otp: "", error: "" });
    }, [handleStateUpdate]);

    return (
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

                {state.error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-xs sm:text-sm font-medium text-red-800">{state.error}</h3>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-4 space-y-6" onSubmit={state.showOtpField ? handleLoginSubmit : handleSendOtp}>
                    <div className="space-y-4">
                        {!state.showOtpField ? (
                            <AuthInput
                                id="mobileNumber"
                                label="Mobile Number"
                                type="tel"
                                value={state.mobileNumber}
                                onChange={(e) => handleStateUpdate({ mobileNumber: e.target.value })}
                                placeholder="Enter 10-digit mobile number"
                                showError={!!state.error && !/^\d{10}$/.test(state.mobileNumber)}
                                error="Please enter a valid mobile number"
                                maxLength={10}
                            />
                        ) : (
                            ""
                        )}

                        {state.showOtpField && (
                            <AuthInput
                                id="otp"
                                label="OTP"
                                type="text"
                                value={state.otp}
                                onChange={(e) => handleStateUpdate({ otp: e.target.value })}
                                placeholder="Enter 6-digit code"
                                showError={!!state.error && !/^\d{6}$/.test(state.otp)}
                                error="Please enter a valid OTP"
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
    );
}

export default Login