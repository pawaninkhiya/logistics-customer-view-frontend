import { forwardRef } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    togglePassword?: boolean;
    onTogglePassword?: () => void;
    className?: string;
    showError?: boolean;
    inputClass?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    (
        {
            id,
            label,
            type,
            error,
            togglePassword,
            inputClass,
            onTogglePassword,
            className = "col-span-2",
            showError,
            ...props
        },
        ref
    ) => {
        // Inline SVG icons to avoid external dependencies
        const EyeIcon = () => (
            <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
            </svg>
        );

        const EyeSlashIcon = () => (
            <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
            </svg>
        );

        return (
            <div className={`flex flex-col gap-2 ${className}`}>
                <label
                    htmlFor={id}
                    className="text-xs sm:text-sm font-medium text-gray-700"
                    aria-invalid={showError ? "true" : "false"}
                >
                    {label}
                </label>

                <div className="relative">
                    <input
                        id={id}
                        type={togglePassword ? "text" : type}
                        ref={ref}
                        {...props}
                        aria-invalid={showError ? "true" : "false"}
                        aria-describedby={showError ? `${id}-error` : undefined}
                        className={`
                         w-full px-4 py-3 text-xs placeholder:text-xs  sm:placeholder:text-sm  sm:text-sm border rounded-md
                         focus:outline-none 
                         transition-all duration-200 ease-in-out
                         ${showError ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400"} font-medium placeholder:font-medium ${inputClass || ""}`}
                    />

                    {type === "password" && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={onTogglePassword}
                            aria-label={togglePassword ? "Hide password" : "Show password"}
                        >
                            {togglePassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    )}
                </div>

                {showError && error && (
                    <p id={`${id}-error`} className="text-red-600 text-xs mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;