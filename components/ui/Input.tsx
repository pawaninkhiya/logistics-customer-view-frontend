"use client"
import React, { ForwardedRef, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

const Input = forwardRef(
    (
        { label, error, className = '', containerClassName = '', ...props }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className={`space-y-1 ${containerClassName}`}>
                {label && (
                    <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full px-4 py-3 text-xs placeholder:text-xs sm:placeholder:text-sm sm:text-sm border rounded-md
            focus:outline-none transition-all duration-200 ease-in-out
            font-medium placeholder:font-medium border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400
            ${error ? 'border-red-500 focus:ring-red-200' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;