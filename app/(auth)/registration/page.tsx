"use client"
import { useState, useCallback, FormEvent } from "react";
import Image from "next/image";
import AuthButton from "@/components/ui/AuthButton";
import AuthInput from "@/components/ui/AuthInput";
import logo from "@assets/logo.svg";
import { useRouter } from "next/router";
import Link from "next/link";

type UserType = "customer" | "vendor" | "admin";

type FormState = {
    username: string;
    firstName: string;
    lastName: string;
    postalCode: string;
    contactNo: string;
    password: string;
    confirmPassword: string;
    type: UserType;
    termsConditions: boolean;
    loading: boolean;
    error: string;
};

const Registration = () => {
    const [state, setState] = useState<FormState>({
        username: "",
        firstName: "",
        lastName: "",
        postalCode: "",
        contactNo: "",
        password: "",
        confirmPassword: "",
        type: "customer",
        termsConditions: false,
        loading: false,
        error: "",
    });

    const handleStateUpdate = useCallback((newState: Partial<FormState>) => {
        setState((prev) => ({ ...prev, ...newState }));
    }, []);

    const validateForm = useCallback((): boolean => {
        // Basic validations
        if (!state.username.trim()) {
            handleStateUpdate({ error: "Username is required" });
            return false;
        }
        if (!state.firstName.trim()) {
            handleStateUpdate({ error: "First name is required" });
            return false;
        }
        if (!state.contactNo.trim()) {
            handleStateUpdate({ error: "Contact number is required" });
            return false;
        }
        if (!/^\d{10}$/.test(state.contactNo)) {
            handleStateUpdate({ error: "Please enter a valid 10-digit contact number" });
            return false;
        }
        if (state.password.length < 8) {
            handleStateUpdate({ error: "Password must be at least 8 characters" });
            return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(state.password)) {
            handleStateUpdate({
                error: "Password must contain uppercase, lowercase, number, and special character"
            });
            return false;
        }
        if (state.password !== state.confirmPassword) {
            handleStateUpdate({ error: "Passwords do not match" });
            return false;
        }
        if (!state.termsConditions) {
            handleStateUpdate({ error: "You must accept the terms and conditions" });
            return false;
        }
        return true;
    }, [state, handleStateUpdate]);

    const simulateApiCall = useCallback(
        () => new Promise<void>((resolve) => setTimeout(resolve, 1500)),
        []
    );

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            handleStateUpdate({ loading: true, error: "" });

            if (!validateForm()) {
                handleStateUpdate({ loading: false });
                return;
            }

            try {
                await simulateApiCall();
                const payload = {
                    username: state.username.trim(),
                    fullname: `${state.firstName.trim()} ${state.lastName.trim()}`.trim(),
                    name: state.firstName.trim(), // Assuming 'name' is first name only
                    postal_code: state.postalCode.trim(),
                    contact_no: state.contactNo.trim(),
                    password: state.password,
                    type: "customer",
                    terms_conditions: state.termsConditions,
                };

                console.log("Registration payload:", payload);
                // Here you would typically call your registration API
                // await registerUser(payload);

                // Handle successful registration (redirect, etc.)
            } catch (err) {
                handleStateUpdate({
                    error: err instanceof Error ? err.message : "Registration failed"
                });
            } finally {
                handleStateUpdate({ loading: false });
            }
        },
        [state, handleStateUpdate, validateForm, simulateApiCall]
    );

    return (
        <div className="min-h-screen flex items-center justify-center md:bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl bg-white rounded-xl md:shadow overflow-hidden p-4 sm:p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto h-20 w-auto flex justify-center">
                        <Image src={logo} alt="logo" height={80} width={80} priority />
                    </div>
                    <h1 className="mt-4 text-lg sm:text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Join our community and start your journey
                    </p>
                </div>

                {state.error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs sm:text-sm rounded-lg border border-red-100">
                        {state.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <AuthInput
                            id="firstName"
                            label="First Name"
                            type="text"
                            value={state.firstName}
                            onChange={(e) => handleStateUpdate({ firstName: e.target.value })}
                            placeholder="Enter first name"
                            showError={!!state.error && !state.firstName}
                            required
                            className="sm:col-span-1 "
                        />
                        <AuthInput
                            id="lastName"
                            label="Last Name"
                            type="text"
                            value={state.lastName}
                            onChange={(e) => handleStateUpdate({ lastName: e.target.value })}
                            placeholder="Enter last name"
                            className="sm:col-span-1 "
                        />
                        <AuthInput
                            id="username"
                            label="Username"
                            type="text"
                            value={state.username}
                            onChange={(e) => handleStateUpdate({ username: e.target.value })}
                            placeholder="Choose a username"
                            showError={!!state.error && !state.username}
                            required
                            className="sm:col-span-1 "
                        />
                        <AuthInput
                            id="contactNo"
                            label="Contact Number"
                            type="tel"
                            value={state.contactNo}
                            onChange={(e) => handleStateUpdate({ contactNo: e.target.value })}
                            placeholder="Enter 10-digit number"
                            showError={!!state.error && (!state.contactNo || !/^\d{10}$/.test(state.contactNo))}
                            maxLength={10}
                            required
                            className="sm:col-span-1 "
                        />
                        <AuthInput
                            id="postalCode"
                            label="Postal Code"
                            type="text"
                            value={state.postalCode}
                            onChange={(e) => handleStateUpdate({ postalCode: e.target.value })}
                            placeholder="Enter postal code"
                            className="sm:col-span-1 "
                        />
                        <AuthInput
                            id="password"
                            label="Password"
                            type="password"
                            value={state.password}
                            onChange={(e) => handleStateUpdate({ password: e.target.value })}
                            placeholder="Create password"
                            showError={!!state.error && state.password.length < 8}
                            required
                            className="sm:col-span-1 "
                        />
                        <AuthInput
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={state.confirmPassword}
                            onChange={(e) => handleStateUpdate({ confirmPassword: e.target.value })}
                            placeholder="Confirm password"
                            showError={!!state.error && state.password !== state.confirmPassword}
                            required
                            className="sm:col-span-1 "
                        />
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="termsConditions"
                                name="termsConditions"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                checked={state.termsConditions}
                                onChange={(e) => handleStateUpdate({ termsConditions: e.target.checked })}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="termsConditions" className="font-medium text-gray-700">
                                I agree to the{' '}
                                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                    Terms and Conditions
                                </a>
                            </label>
                            {!!state.error && !state.termsConditions && (
                                <p className="mt-1 text-red-600">You must accept the terms and conditions</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <AuthButton
                            loading={state.loading}
                            text="Create Account"
                            loadingText="Registering..."

                        />
                    </div>
                </form>

                <div className="mt-6 text-center text-xs sm:text-sm">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registration;