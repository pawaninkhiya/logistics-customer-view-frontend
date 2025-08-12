// components/DetailItem.tsx
"use client";

interface DetailItemProps {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    title: string;
    value: string;
    subValue?: string;
}

export const DetailItem = ({
    icon,
    iconBg,
    iconColor,
    title,
    value,
    subValue,
}: DetailItemProps) => {
    return (
        <div className="flex items-start gap-3">
            <div className={`p-2 ${iconBg} rounded-lg ${iconColor}`}>
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-500">{title}</h4>
                <p className="text-gray-800">{value}</p>
                {subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}
            </div>
        </div>
    );
};