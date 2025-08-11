"use client";

import React, { forwardRef } from "react";
import Select from "react-select";
import { ErrorMessage, useFormikContext } from "formik";
import { customSelectStyles } from "@/utils/customSelectStyles";

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    id: string;
    label: string;
    options: Option[];
    value?: string;
    setFieldValue?: (value: string) => void;
    useFormik?: boolean;
    isLabel?: boolean;
    isDisabled?: boolean;
}

const CustomSelect = forwardRef<any, CustomSelectProps>(
    (
        {
            id,
            label,
            options,
            value,
            setFieldValue,
            useFormik = false,
            isLabel = false,
            isDisabled = false,
        },
        ref
    ) => {
        const formik = useFormikContext<any>();
        const isFormik = useFormik && formik;

        const currentValue = isFormik
            ? options.find((opt) => opt.value === formik.values[id])
            : options.find((opt) => opt.value === value);

        const handleChange = (opt: Option | null) => {
            const newValue = opt?.value || "";
            if (isFormik) {
                formik.setFieldValue(id, newValue);
            } else if (setFieldValue) {
                setFieldValue(newValue);
            }
        };

        return (
            <div className="w-full">
                {isLabel && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {label}
                    </label>
                )}
                <Select
                    ref={ref}
                    inputId={id}
                    name={id}
                    options={options}
                    value={currentValue || null}
                    onChange={handleChange}
                    isClearable
                    isDisabled={isDisabled}
                    placeholder={`Select ${label}`}
                    styles={customSelectStyles}
                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                    menuPosition="absolute"
                    menuPlacement="auto"
                />
                {isFormik && (
                    <ErrorMessage
                        name={id}
                        component="p"
                        className="text-red-500 text-sm mt-1"
                    />
                )}
            </div>
        );
    }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
