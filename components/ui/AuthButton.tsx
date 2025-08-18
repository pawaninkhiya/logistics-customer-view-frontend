import React, { forwardRef } from "react";
import { Icons } from "@assets/assets";
interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    text?: string;
    loadingText?: string;
    className?: string;
    icon?: React.ReactNode;
}

const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(({ className = "", loading = false, text = "Login", loadingText = "Signing in...", children, icon, ...props }, ref) => {
    return (
        <button
            ref={ref}
            type="submit"
            className={`
             w-full px-4 py-3 col-span-2 bg-black text-white text-sm font-mediumhover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50 rounded-md disabled:opacity-80 flex items-center justify-center gap-2 transition-all duration-200 ease-in-out active:scale-[0.98] active:opacity-90 font-medium ${className}`}
            disabled={loading || props.disabled}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <>
                    <Icons.Loader className="animate-spin" />
                    <span>{loadingText}</span>
                </>
            ) : (
                <>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    {children || text}
                </>
            )}

        </button>
    );
}
);

AuthButton.displayName = "AuthButton";

export default AuthButton;