"use client";

import { useCallback, useState, FormEvent } from "react";
import AuthInput from "@/components/ui/AuthInput";
import AuthButton from "@/components/ui/AuthButton";
import toast from "react-hot-toast";
import ChangeOtpActions from "./ChangeOtpActions";
import { useAuth } from "@/contexts/AuthProvider";

type FormState = {
    mobileNumber: string;
    otp: string;
    showOtpField: boolean;
};

const LoginForm = () => {
    const { loginSendOtpMutation, verifyOTPMutation } = useAuth();

    const [state, setState] = useState<FormState>({
        mobileNumber: "",
        otp: "",
        showOtpField: false,
    });

    const handleStateUpdate = useCallback((newState: Partial<FormState>) => {
        setState((prev) => ({ ...prev, ...newState }));
    }, []);

    const validateMobileNumber = (number: string) => {
        if (!number) {
            toast.error("Please enter your mobile number");
            return false;
        }
        if (!/^\d{10}$/.test(number)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return false;
        }
        return true;
    };

    const validateOtp = (otp: string) => {
        if (!otp) {
            toast.error("Please enter the OTP");
            return false;
        }
        if (!/^\d{6}$/.test(otp)) {
            toast.error("OTP must be 6 digits");
            return false;
        }
        return true;
    };

    const handleSendOtp = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateMobileNumber(state.mobileNumber)) return;

        try {
            await loginSendOtpMutation.mutateAsync({ contact_no: state.mobileNumber });
            handleStateUpdate({ showOtpField: true });
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ||
                err.message ||
                "Failed to send OTP"
            );
        }
    };

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateOtp(state.otp)) return;

        try {
            await verifyOTPMutation.mutateAsync({
                contact_no: state.mobileNumber,
                verification_code: state.otp,
            });
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ||
                err.message ||
                "Login failed. Please try again."
            );
        }
    };

    const handleChangeNumber = () => {
        handleStateUpdate({ showOtpField: false, otp: "" });
    };

    const isLoading = state.showOtpField
        ? verifyOTPMutation.isPending
        : loginSendOtpMutation.isPending;

    return (
        <form
            className="mt-4 space-y-6"
            onSubmit={state.showOtpField ? handleLoginSubmit : handleSendOtp}
        >
            <div className="space-y-4">
                {!state.showOtpField && (
                    <AuthInput
                        id="mobileNumber"
                        label="Mobile Number"
                        type="tel"
                        value={state.mobileNumber}
                        onChange={(e) =>
                            handleStateUpdate({ mobileNumber: e.target.value })
                        }
                        placeholder="Enter 10-digit mobile number"
                        showError={false}
                        error=""
                        maxLength={10}
                    />
                )}

                {state.showOtpField && (
                    <>
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
                        <ChangeOtpActions
                            onChangeNumber={handleChangeNumber}
                            onResendOtp={handleSendOtp}
                            isLoading={isLoading}
                        />
                    </>
                )}
            </div>

            <div>
                <AuthButton
                    loading={isLoading}
                    text={state.showOtpField ? "Verify & Login" : "Send OTP"}
                    loadingText={state.showOtpField ? "Verifying..." : "Sending..."}
                />
            </div>
        </form>
    );
};

export default LoginForm;
