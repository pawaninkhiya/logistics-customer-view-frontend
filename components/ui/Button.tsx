"use client";

import React, { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "danger";
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { children, className = "", variant = "primary", loading = false, disabled, ...props },
        ref
    ) => {
        const baseStyles =
            "px-6 py-3 font-medium rounded-md transition duration-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";

        const variantStyles: Record<string, string> = {
            primary: "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-md focus:ring-orange-400",
            secondary: "bg-gray-500 hover:bg-gray-600 text-white hover:shadow-md focus:ring-gray-400",
            outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
            danger: "bg-red-500 hover:bg-red-600 text-white hover:shadow-md focus:ring-red-400",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${className}`}
                disabled={loading || disabled}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin h-4 w-4 mr-2 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                )}
                {loading ? "Loading..." : children}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;
